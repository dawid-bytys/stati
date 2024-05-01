export type AuthStackParamList = {
  Welcome: undefined
  Register: {
    email: string
    access_token: string
    refresh_token: string
  }
  Login: {
    email: string
    access_token: string
    refresh_token: string
  }
}

export type TabNavigatorParamList = {
  "Friends' activity": undefined
  Home: undefined
  Top: {
    content: 'artists' | 'tracks'
  }
}

export interface WebAccessTokenResponse {
  accessToken: string
  isAnonymous: boolean
  accessTokenExpirationTimestampMs: number
}

export interface AccessToken {
  value: string
  createdAt: number
}

export interface WebAccessToken {
  value: string
  expiresAt: number
}

export interface AuthState {
  isAuthenticated: boolean
  accessToken: AccessToken
  refreshToken: string
  spdcCookie: string
  webAccessToken: WebAccessToken
  notification: string
  gqlAccessToken: string
  gqlRefreshToken: string
}

export interface FilteredFriendActivity {
  friendUri: string
  context: {
    type: string
    name: string
  }
  artist: string
  image: string
  track: string
  name: string
  time: string
  timestampMs: number
}

export interface FilteredTrack {
  id: string
  artist: string
  track: string
  image: string
}

export interface FilteredArtist {
  id: string
  artist: string
  image: string
}

export interface FilteredRecentlyPlayed {
  artist: string
  track: string
  image: string
  time: string
}
