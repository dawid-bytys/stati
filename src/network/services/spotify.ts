import { type AccessTokenResponse, type WebAccessTokenResponse } from '@/network/responses';
import { _useStore } from '@/store/store';
import { Config } from 'react-native-config';
import { fetchWithErrorHandling } from './utils';
import type { FetchTokensParams, TopItemsParams } from '../params';
import type { RecentlyPlayedResponse } from '../responses/recently-played';
import type { FriendsActivityResponse, ProfileResponse } from '@/network/responses';

export const SpotifyService = {
  generateAuthUrl: (codeChallenge: string) => {
    const url = new URL('https://accounts.spotify.com/authorize');

    url.searchParams.append('client_id', Config.SPOTIFY_CLIENT_ID);
    url.searchParams.append('redirect_uri', Config.SPOTIFY_AUTH_CALLBACK_URL);
    url.searchParams.append('code_challenge', codeChallenge);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('code_challenge_method', 'S256');
    url.searchParams.append('scope', 'user-read-recently-played user-top-read user-read-private, user-read-email');

    return url.toString();
  },

  fetchTokens: ({ code, codeVerifier }: FetchTokensParams) => {
    return fetchWithErrorHandling<AccessTokenResponse>('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: Config.SPOTIFY_CLIENT_ID,
        redirect_uri: Config.SPOTIFY_AUTH_CALLBACK_URL,
        grant_type: 'authorization_code',
        code_verifier: codeVerifier,
        code,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },

  refreshToken: () => {
    const refreshToken = _useStore.getState().refreshToken;

    return fetchWithErrorHandling<AccessTokenResponse>('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: Config.SPOTIFY_CLIENT_ID,
        refresh_token: refreshToken as string,
        grant_type: 'refresh_token',
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },

  fetchTopItems: <T>({ type, period = 'short_term', limit = 4, offset = 0 }: TopItemsParams) => {
    const accessToken = _useStore.getState().accessToken;

    return fetchWithErrorHandling<T>(
      `https://api.spotify.com/v1/me/top/${type}?limit=${limit}&time_range=${period}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },

  fetchRecentlyPlayed: () => {
    const accessToken = _useStore.getState().accessToken;

    return fetchWithErrorHandling<RecentlyPlayedResponse>(
      'https://api.spotify.com/v1/me/player/recently-played?limit=5',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },

  fetchProfile: () => {
    const accessToken = _useStore.getState().accessToken;

    return fetchWithErrorHandling<ProfileResponse>('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  fetchWebAccessToken: () => {
    const spdcCookie = _useStore.getState().spdcCookie;

    return fetchWithErrorHandling<WebAccessTokenResponse>('https://open.spotify.com/get_access_token', {
      method: 'GET',
      credentials: 'omit',
      headers: {
        Cookie: `sp_dc=${spdcCookie}`,
      },
    });
  },

  fetchFriendsActivity: () => {
    const webAccessToken = _useStore.getState().webAccessToken;

    return fetchWithErrorHandling<FriendsActivityResponse>(
      'https://spclient.wg.spotify.com/presence-view/v1/buddylist',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${webAccessToken}`,
        },
      },
    );
  },
};
