import { useEffect, useState, useCallback } from 'react';
import { Config } from 'react-native-config';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import pkceChallenge from 'react-native-pkce-challenge';
import { URL } from 'react-native-url-polyfill';
import { AuthContext } from '@/context/AuthContext';
import { getAuthState } from '@/domain/auth';
import { generateSpotifyAuthURL, fetchTokens } from '@/domain/spotify';
import { CustomError } from '@/errors';
import { useAuthHydration } from '@/hooks/useAuthHydration';
import { useNotificationContext } from '@/hooks/useNotificationContext';
import { useAuthStore } from '@/store/auth';
import type { PropsWithChildren } from 'react';
import type { RedirectResult } from 'react-native-inappbrowser-reborn';

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setNotification } = useNotificationContext();
  const { accessToken, refreshToken, spDcCookie, webAccessToken, setValue } = useAuthStore();
  const hasHydrated = useAuthHydration();

  useEffect(() => {
    async function authenticate() {
      try {
        const authState = await getAuthState(accessToken, refreshToken, webAccessToken, spDcCookie);

        setValue('accessToken', authState.accessToken);
        setValue('refreshToken', authState.refreshToken);
        setValue('spDcCookie', authState.spDcCookie);
        setValue('webAccessToken', authState.webAccessToken);
        setIsAuthenticated(authState.isAuthenticated);
        setIsAuthenticating(false);

        if (authState.notification) {
          setNotification(authState.notification, 'warning');
        }
      } catch (err) {
        if (err instanceof CustomError) {
          setNotification(err.message, 'error');
        } else {
          setNotification('Something went wrong, try reloading the app.', 'error');
        }
      }
    }

    if (hasHydrated) {
      authenticate();
    }
  }, [hasHydrated]);

  const getTokens = useCallback(async () => {
    setIsAuthenticating(true);

    try {
      const { codeChallenge, codeVerifier } = pkceChallenge();
      const spotifyAuthUrl = generateSpotifyAuthURL(codeChallenge);

      const isBrowserAvailable = await InAppBrowser.isAvailable();
      if (!isBrowserAvailable) {
        throw new Error('InAppBrowser is not available');
      }

      const { type, url } = (await InAppBrowser.openAuth(
        spotifyAuthUrl,
        Config.SPOTIFY_AUTH_CALLBACK_URL,
      )) as RedirectResult;

      if (type === 'success') {
        const code = new URL(url).searchParams.get('code');

        if (!code) {
          throw new Error('No code in callback URL');
        }

        const { access_token, refresh_token } = await fetchTokens(code, codeVerifier);

        setValue('accessToken', {
          value: access_token,
          createdAt: Date.now(),
        });
        setValue('refreshToken', refresh_token);
        setIsAuthenticated(true);
        setNotification('You have logged in successfully.', 'success');
      }
    } catch (err) {
      if (err instanceof CustomError) {
        setNotification(err.message, 'error');
      } else {
        setNotification('Something went wrong, try reloading the app.', 'error');
      }
    } finally {
      setIsAuthenticating(false);
    }
  }, [setValue, setNotification]);

  const logout = useCallback(() => {
    setValue('accessToken', { value: '', createdAt: 0 });
    setValue('webAccessToken', { value: '', expiresAt: 0 });
    setValue('refreshToken', '');
    setValue('spDcCookie', '');
    setIsAuthenticated(false);
    setNotification('You have logged out successfully.', 'success');
  }, [setValue, setNotification]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthenticating,
        getTokens,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
