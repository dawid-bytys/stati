export type AuthStackParamList = {
  Welcome: undefined;
};

export type TabNavigatorParamList = {
  "Friends' activity": undefined;
  Home: undefined;
  Top: {
    content: 'artists' | 'tracks';
  };
};

export interface WebAccessTokenResponse {
  accessToken: string;
  isAnonymous: boolean;
  accessTokenExpirationTimestampMs: number;
}

export interface AccessToken {
  value: string;
  createdAt: number;
}

export interface WebAccessToken {
  value: string;
  expiresAt: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: AccessToken;
  refreshToken: string;
  spDcCookie: string;
  webAccessToken: WebAccessToken;
  notification: string;
}

export interface FilteredFriendActivity {
  context: {
    type: string;
    name: string;
  };
  artist: string;
  image: string;
  track: string;
  name: string;
  time: string;
}

export interface FilteredTrack {
  id: string;
  artist: string;
  track: string;
  image: string;
}

export interface FilteredArtist {
  id: string;
  artist: string;
  image: string;
}

export interface FilteredRecentlyPlayed {
  artist: string;
  track: string;
  image: string;
  time: string;
}
