import { Config } from 'react-native-config';
import { fetchWithErrorHandling } from '@/utils';
import type {
  AccessTokenResponse,
  WebAccessTokenResponse,
  RecentlyPlayedResponse,
  FriendsActivityResponse,
} from '@/types/responses';

export function generateSpotifyAuthURL(codeChallenge: string) {
  const url = new URL('https://accounts.spotify.com/authorize');

  url.searchParams.append('client_id', Config.SPOTIFY_CLIENT_ID);
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('redirect_uri', Config.SPOTIFY_AUTH_CALLBACK_URL);
  url.searchParams.append('code_challenge_method', 'S256');
  url.searchParams.append('code_challenge', codeChallenge);
  url.searchParams.append('scope', 'user-read-recently-played user-top-read');

  return url.toString();
}

export async function fetchTokens(code: string, codeVerifier: string) {
  const data = await fetchWithErrorHandling<AccessTokenResponse>(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      body: new URLSearchParams({
        client_id: Config.SPOTIFY_CLIENT_ID,
        grant_type: 'authorization_code',
        redirect_uri: Config.SPOTIFY_AUTH_CALLBACK_URL,
        code_verifier: codeVerifier,
        code,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return data;
}

export async function refreshTokens(refreshToken: string): Promise<AccessTokenResponse> {
  const data = await fetchWithErrorHandling<AccessTokenResponse>(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      body: new URLSearchParams({
        client_id: Config.SPOTIFY_CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return data;
}

export async function fetchTopItems<T>(
  accessToken: string,
  type: 'tracks' | 'artists',
  period: 'medium_term' | 'short_term' | 'long_term' = 'short_term',
  offset = 0,
  limit = 4,
) {
  const data = await fetchWithErrorHandling<T>(
    `https://api.spotify.com/v1/me/top/${type}?limit=${limit}&time_range=${period}&offset=${offset}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data;
}

export async function fetchRecentlyPlayed(accessToken: string, count = 5) {
  const data = await fetchWithErrorHandling<RecentlyPlayedResponse>(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${count}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data;
}

export async function fetchWebAccessToken(spDcCookie: string) {
  const data = await fetchWithErrorHandling<WebAccessTokenResponse>(
    'https://open.spotify.com/get_access_token',
    {
      method: 'GET',
      credentials: 'omit',
      headers: {
        Cookie: `sp_dc=${spDcCookie}`,
      },
    },
  );

  return data;
}

export async function fetchFriendsActivity(webAccessToken: string) {
  const data = await fetchWithErrorHandling<FriendsActivityResponse>(
    'https://spclient.wg.spotify.com/presence-view/v1/buddylist',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${webAccessToken}`,
      },
    },
  );

  return data;
}
