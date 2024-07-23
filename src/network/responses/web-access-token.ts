export interface WebAccessTokenResponse {
  clientId: string;
  accessToken: string;
  isAnonymous: boolean;
  accessTokenExpirationTimestampMs: number;
}
