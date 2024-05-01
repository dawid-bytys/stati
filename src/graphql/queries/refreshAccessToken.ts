import { gql } from '@apollo/client'

export const REFRESH_ACCESS_TOKEN_QUERY = gql`
  query RefreshAccessToken($refreshToken) {
    refreshAccessToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`
