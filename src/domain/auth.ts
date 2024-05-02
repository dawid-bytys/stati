import { REFRESH_ACCESS_TOKEN_QUERY } from '@/graphql/queries/refreshAccessToken'
import { isAccessTokenExpired, isJwtExpired, isWebAccessTokenExpired } from '@/utils'
import { refreshTokens, fetchWebAccessToken } from './spotify'
import { client } from '../apollo'
import type { RefreshAccessTokenQuery } from '@/graphql-types/graphql'
import type { AccessToken, WebAccessToken, AuthState } from '@/types/types'

export async function getAuthState(
  accessToken: AccessToken,
  refreshToken: string,
  webAccessToken: WebAccessToken,
  spdcCookie: string,
  gqlAccessToken: string,
  gqlRefreshToken: string,
) {
  const authState: AuthState = {
    isAuthenticated: !!accessToken.value,
    accessToken,
    refreshToken,
    webAccessToken,
    spdcCookie,
    gqlAccessToken,
    gqlRefreshToken,
    notification: '',
  }

  const areTokensAvailable = accessToken.value && refreshToken && gqlAccessToken && gqlRefreshToken

  if (areTokensAvailable) {
    if (isAccessTokenExpired(accessToken.createdAt)) {
      const { access_token, refresh_token } = await refreshTokens(refreshToken)
      authState.accessToken = {
        value: access_token,
        createdAt: Date.now(),
      }
      authState.refreshToken = refresh_token
    }

    if (isJwtExpired(gqlAccessToken)) {
      const { data } = await client.query<RefreshAccessTokenQuery>({
        query: REFRESH_ACCESS_TOKEN_QUERY,
        variables: { refreshToken: gqlRefreshToken },
      })

      authState.gqlAccessToken = data.refreshAccessToken.accessToken
      authState.isAuthenticated = true
    }

    if (webAccessToken.value && spdcCookie && isWebAccessTokenExpired(webAccessToken.expiresAt)) {
      const response = await fetchWebAccessToken(spdcCookie)

      if (response.isAnonymous) {
        authState.spdcCookie = ''
        authState.webAccessToken = { value: '', expiresAt: 0 }
        authState.notification = 'sp_dc cookie has expired, get a new one'
      } else {
        authState.webAccessToken = {
          value: response.accessToken,
          expiresAt: response.accessTokenExpirationTimestampMs,
        }
      }
    }
  }

  return authState
}
