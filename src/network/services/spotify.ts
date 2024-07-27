import { type AccessTokenResponse, type WebAccessTokenResponse } from '@/network/responses';
import { _useStore } from '@/store/store';
import axios from 'axios';
import queryString from 'query-string';
import { Config } from 'react-native-config';
import { privateSpotifyClient } from '../axios-clients/private-spotify';
import { spotifyClient } from '../axios-clients/spotify';
import type { FetchTokensParams, TopItemsParams } from '../params';
import type { RecentlyPlayedResponse } from '../responses/recently-played';
import type { FriendsActivityResponse } from '@/network/responses';

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

  fetchTokens: async ({ code, codeVerifier }: FetchTokensParams) => {
    const response = await axios<AccessTokenResponse>('https://accounts.spotify.com/api/token', {
      method: 'POST',
      data: queryString.stringify({
        client_id: Config.SPOTIFY_CLIENT_ID,
        redirect_uri: Config.SPOTIFY_AUTH_CALLBACK_URL,
        grant_type: 'authorization_code',
        code_verifier: codeVerifier,
        code,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  },

  refreshToken: async () => {
    const refreshToken = _useStore.getState().refreshToken;

    const response = await axios<AccessTokenResponse>('https://accounts.spotify.com/api/token', {
      method: 'POST',
      data: queryString.stringify({
        client_id: Config.SPOTIFY_CLIENT_ID,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  },

  fetchTopItems: async <T>({ type, period = 'short_term', limit = 4, offset = 0 }: TopItemsParams) => {
    const response = await spotifyClient.get<T>(
      `https://api.spotify.com/v1/me/top/${type}?limit=${limit}&time_range=${period}&offset=${offset}`,
    );

    return response.data;
  },

  fetchRecentlyPlayed: async () => {
    const response = await spotifyClient.get<RecentlyPlayedResponse>(
      'https://api.spotify.com/v1/me/player/recently-played?limit=5',
    );

    return response.data;
  },

  fetchWebAccessToken: async (): Promise<WebAccessTokenResponse> => {
    const spdcCookie = _useStore.getState().spdcCookie;

    // using fetch here because axios' 'withCredentials' option doesn't work well with Spotify's cookies
    const response = await fetch('https://open.spotify.com/get_access_token', {
      method: 'GET',
      credentials: 'omit',
      headers: {
        Cookie: `sp_dc=${spdcCookie}`,
      },
    });

    return response.json();
  },

  fetchFriendsActivity: async () => {
    const response = await privateSpotifyClient.get<FriendsActivityResponse>(
      'https://spclient.wg.spotify.com/presence-view/v1/buddylist',
    );

    return response.data;
  },
};
