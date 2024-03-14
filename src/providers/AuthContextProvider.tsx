import { useEffect, useState, useCallback } from 'react';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import pkceChallenge from 'react-native-pkce-challenge';
import { URL } from 'react-native-url-polyfill';
import { AuthContext } from '@/context/AuthContext';
import {
  generateSpotifyAuthURL,
  fetchTokens,
  refreshTokens,
  fetchWebAccessToken,
} from '@/domain/spotify';
import { useAuthHydration } from '@/hooks/useAuthHydration';
import { useNotificationContext } from '@/hooks/useNotificationContext';
import { useAuthStore } from '@/store/auth';
import { isTokenExpired, isWebAccessTokenExpired } from '@/utils';
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
      setIsAuthenticating(true);

      try {
        if (accessToken.value && refreshToken && !isTokenExpired(accessToken.createdAt)) {
          setIsAuthenticated(true);
        } else if (accessToken.value && refreshToken && isTokenExpired(accessToken.createdAt)) {
          const { access_token, refresh_token } = await refreshTokens(refreshToken);
          setValue('accessToken', {
            value: access_token,
            createdAt: Date.now(),
          });
          setValue('refreshToken', refresh_token);
          setIsAuthenticated(true);
        }

        if (
          webAccessToken.value &&
          spDcCookie &&
          isWebAccessTokenExpired(webAccessToken.expiresAt)
        ) {
          const response = await fetchWebAccessToken(spDcCookie);

          if (response.isAnonymous) {
            setValue('spDcCookie', '');
            setValue('webAccessToken', { value: '', expiresAt: 0 });
            setNotification('sp_dc cookie has expired, get a new one.', true);
            return;
          }

          setValue('webAccessToken', {
            value: response.accessToken,
            expiresAt: response.accessTokenExpirationTimestampMs,
          });
        }
      } catch (_err) {
        logout(true);
      } finally {
        setIsAuthenticating(false);
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
        'spoti://callback',
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
        setNotification('You have logged in successfully.', false);
      }
    } catch (_err) {
      setNotification('Something went wrong, try reloading the app.', true);
    } finally {
      setIsAuthenticating(false);
    }
  }, [setValue, setNotification]);

  const logout = useCallback(
    (isError: boolean) => {
      setValue('accessToken', { value: '', createdAt: 0 });
      setValue('webAccessToken', { value: '', expiresAt: 0 });
      setValue('refreshToken', '');
      setValue('spDcCookie', '');
      setIsAuthenticated(false);

      if (isError) {
        setNotification('Something went wrong, try to log in again.', true);
      } else {
        setNotification('You have logged out successfully.', false);
      }
    },
    [setValue, setNotification],
  );

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
