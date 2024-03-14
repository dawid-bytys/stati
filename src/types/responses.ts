export type { RecentlyPlayedResponse } from './responses/recentlyPlayedResponse';
export type { TopArtistsResponse } from './responses/topArtistsResponse';
export type { TopTracksResponse } from './responses/topTracksResponse';
export type { FriendsActivityResponse } from './responses/friendsActivityResponse';

export interface WebAccessTokenResponse {
  clientId: string;
  accessToken: string;
  isAnonymous: boolean;
  accessTokenExpirationTimestampMs: number;
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}
