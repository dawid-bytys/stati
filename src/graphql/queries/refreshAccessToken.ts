import { gql } from '@apollo/client'

export const REFRESH_ACCESS_TOKEN_QUERY = gql`
  query RefreshAccessToken($refreshToken: String!) {
    refreshAccessToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`
