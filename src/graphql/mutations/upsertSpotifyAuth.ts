import { gql } from '@apollo/client'

export const UPSERT_SPOTIFY_AUTH_MUTATION = gql`
  mutation UpsertSpotifyAuth(
    $spdcCookie: String!
    $accessToken: String!
    $accessTokenExpirationTimestampMs: Float!
  ) {
    upsertSpotifyAuth(
      spdcCookie: $spdcCookie
      accessToken: $accessToken
      accessTokenExpirationTimestampMs: $accessTokenExpirationTimestampMs
    )
  }
`
