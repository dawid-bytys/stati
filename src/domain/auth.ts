import { isAccessTokenExpired, isWebAccessTokenExpired } from '@/utils';
import { refreshTokens, fetchWebAccessToken } from './spotify';
import type { AccessToken, WebAccessToken, AuthState } from '@/types/types';

export async function getAuthState(
  accessToken: AccessToken,
  refreshToken: string,
  webAccessToken: WebAccessToken,
  spDcCookie: string,
) {
  const authState: AuthState = {
    isAuthenticated: !!accessToken.value,
    accessToken,
    refreshToken,
    webAccessToken,
    spDcCookie,
    notification: '',
  };

  const areTokensAvailable = accessToken.value && refreshToken;

  if (areTokensAvailable) {
    if (isAccessTokenExpired(accessToken.createdAt)) {
      const { access_token, refresh_token } = await refreshTokens(refreshToken);
      authState.accessToken = {
        value: access_token,
        createdAt: Date.now(),
      };
      authState.refreshToken = refresh_token;
      authState.isAuthenticated = true;
    }

    if (webAccessToken.value && spDcCookie && isWebAccessTokenExpired(webAccessToken.expiresAt)) {
      const response = await fetchWebAccessToken(spDcCookie);

      if (response.isAnonymous) {
        authState.spDcCookie = '';
        authState.webAccessToken = { value: '', expiresAt: 0 };
        authState.notification = 'sp_dc cookie has expired, get a new one';
      } else {
        authState.webAccessToken = {
          value: response.accessToken,
          expiresAt: response.accessTokenExpirationTimestampMs,
        };
      }
    }
  }

  return authState;
}
