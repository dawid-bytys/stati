import type { Tokens } from '@/types';
import type { RedirectResult } from 'react-native-inappbrowser-reborn';

import { generateSpotifyAuthURL, getTokens } from '@/domain/spotify';
import { type PropsWithChildren, useEffect, useState } from 'react';
import pkceChallenge from 'react-native-pkce-challenge';
import { isTokenExpired, parseTokens } from '@/utils';
import { AuthContext } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from 'react-native-url-polyfill';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [spDcCookie, setSpDcCookie] = useState<string | null>(null);
  const [webAccessToken, setWebAccessToken] = useState<string | null>(null);

  useEffect(() => {
    async function loadStore() {
      const [storedTokens, storedSpDcCookie, webAccessToken] = await Promise.all([
        AsyncStorage.getItem('tokens'),
        AsyncStorage.getItem('spDcCookie'),
        AsyncStorage.getItem('webAccessToken'),
      ]);

      if (storedTokens) {
        const parsedTokens = parseTokens(storedTokens);

        if (!isTokenExpired(parsedTokens.expiresIn, parsedTokens.creationDate)) {
          setTokens(parsedTokens);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      }

      if (storedSpDcCookie) {
        setSpDcCookie(storedSpDcCookie);
      }

      if (webAccessToken) {
        setWebAccessToken(webAccessToken);
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

        const { access_token, refresh_token, expires_in } = await getTokens(code, codeVerifier);
        await AsyncStorage.setItem(
          'tokens',
          JSON.stringify({
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: expires_in,
            creationDate: Date.now(),
          }),
        );
        setTokens({
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresIn: expires_in,
          creationDate: Date.now(),
        });
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsAuthenticating(false);
    }
  }

  async function logout() {
    await Promise.all([
      AsyncStorage.removeItem('tokens'),
      AsyncStorage.removeItem('spDcCookie'),
      AsyncStorage.removeItem('webAccessToken'),
    ]);
    setTokens(null);
    setIsAuthenticated(false);
    setSpDcCookie(null);
    setWebAccessToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        obtainAccessToken,
        setWebAccessToken,
        isAuthenticating,
        isAuthenticated,
        webAccessToken,
        setSpDcCookie,
        spDcCookie,
        tokens,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
