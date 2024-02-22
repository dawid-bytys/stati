import type { Tokens, WebAccessToken } from '@/types';
import type { RedirectResult } from 'react-native-inappbrowser-reborn';
import {
  generateSpotifyAuthURL,
  fetchTokens,
  refreshTokens,
  fetchWebAccessToken,
} from '@/domain/spotify';
import { type PropsWithChildren, useEffect, useState } from 'react';
import pkceChallenge from 'react-native-pkce-challenge';
import {
  isTokenExpired,
  isWebAccessTokenExpired,
  parseAccessToken,
  parseWebAccessToken,
} from '@/utils';
import { AuthContext } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from 'react-native-url-polyfill';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { useErrorContext } from '@/hooks/useErrorContext';

const accessTokenInitialState = {
  value: '',
  expiresIn: 0,
  creationTimestamp: 0,
};

const webAccessTokenInitialState = {
  value: '',
  expirationTimestamp: 0,
};

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState(accessTokenInitialState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [spDcCookie, setSpDcCookie] = useState('');
  const [webAccessToken, setWebAccessToken] = useState(webAccessTokenInitialState);
  const { setErrorMessage } = useErrorContext();

  useEffect(() => {
    async function loadStore() {
      const [storedAccessToken, storedSpDcCookie, storedWebAccessToken, storedRefreshToken] =
        await Promise.all([
          AsyncStorage.getItem('accessToken'),
          AsyncStorage.getItem('spDcCookie'),
          AsyncStorage.getItem('webAccessToken'),
          AsyncStorage.getItem('refreshToken'),
        ]);

      if (storedAccessToken && storedRefreshToken) {
        const parsedAccessToken = parseAccessToken(storedAccessToken);

        if (!isTokenExpired(parsedAccessToken.expiresIn, parsedAccessToken.creationTimestamp)) {
          setAccessToken(parsedAccessToken);
          setIsAuthenticated(true);
        } else {
          const { access_token, refresh_token, expires_in } = await refreshTokens(
            storedRefreshToken,
          );

          const newAccessToken = {
            value: access_token,
            expiresIn: expires_in,
            creationTimestamp: Date.now(),
          };

          await Promise.all([
            AsyncStorage.setItem('accessToken', JSON.stringify(newAccessToken)),
            AsyncStorage.setItem('refreshToken', refresh_token),
          ]);
          setAccessToken(newAccessToken);
        }

        if (storedSpDcCookie && storedWebAccessToken) {
          const parsedWebAccessToken = parseWebAccessToken(storedWebAccessToken);

          if (!isWebAccessTokenExpired(parsedWebAccessToken.expirationTimestamp)) {
            setWebAccessToken(parsedWebAccessToken);
          } else {
            const { accessToken, isAnonymous, accessTokenExpirationTimestampMs } =
              await fetchWebAccessToken(storedSpDcCookie);

            if (!isAnonymous) {
              await AsyncStorage.setItem('webAccessToken', accessToken);
              setSpDcCookie(storedSpDcCookie);
              setWebAccessToken({
                value: accessToken,
                expirationTimestamp: accessTokenExpirationTimestampMs,
              });
            }
          }
        }

        setIsAuthenticated(true);
      }

      setIsAuthenticating(false);
    }

    loadStore();
  }, []);

  async function obtainAccessToken() {
    try {
      setIsAuthenticating(true);
      const { codeChallenge, codeVerifier } = pkceChallenge();
      const spotifyAuthUrl = await generateSpotifyAuthURL(codeChallenge);
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

        const { access_token, refresh_token, expires_in } = await fetchTokens(code, codeVerifier);

        const newAccessToken = {
          value: access_token,
          expiresIn: expires_in,
          creationTimestamp: Date.now(),
        };

        await Promise.all([
          AsyncStorage.setItem('accessToken', JSON.stringify(newAccessToken)),
          AsyncStorage.setItem('refreshToken', refresh_token),
        ]);
        setAccessToken(newAccessToken);
        setIsAuthenticated(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    } finally {
      setIsAuthenticating(false);
    }
  }

  async function logout() {
    await Promise.all([
      AsyncStorage.removeItem('accessToken'),
      AsyncStorage.removeItem('refreshToken'),
      AsyncStorage.removeItem('spDcCookie'),
      AsyncStorage.removeItem('webAccessToken'),
    ]);
    setAccessToken(accessTokenInitialState);
    setIsAuthenticated(false);
    setSpDcCookie('');
    setWebAccessToken(webAccessTokenInitialState);
  }

  return (
    <AuthContext.Provider
      value={{
        obtainAccessToken,
        setWebAccessToken,
        isAuthenticating,
        isAuthenticated,
        webAccessToken: webAccessToken.value,
        setSpDcCookie,
        spDcCookie,
        accessToken: accessToken.value,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
