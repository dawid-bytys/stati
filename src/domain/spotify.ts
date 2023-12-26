import type { RecentlyPlayed } from '@/types/activity';

import type { FriendsActivity } from '@/types';

interface FetchWrapperOptions {
  headers?: Record<string, string>;
  method: 'POST' | 'GET';
  url: string;
}

export async function fetchWrapper<T>({ headers, method, url }: FetchWrapperOptions): Promise<T> {
  const response = await fetch(url, {
    headers,
    method,
    credentials: 'include',
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (response.status === 403) {
    throw new Error('Forbidden');
  }

  if (response.status === 429) {
    throw new Error('Too many requests');
  }

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  if (response.status === 502) {
    throw new Error('Bad gateway');
  }

  return response.json();
}

export async function generateSpotifyAuthURL(codeChallenge: string) {
  const url = new URL('https://accounts.spotify.com/authorize');

  url.searchParams.append('client_id', '8d59d667427a435a8fdb10eb53f77501');
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('redirect_uri', 'stati://callback');
  url.searchParams.append('code_challenge_method', 'S256');
  url.searchParams.append('code_challenge', codeChallenge);
  url.searchParams.append('scope', 'user-read-recently-played user-top-read');

  return url.toString();
}

export async function fetchTokens(code: string, codeVerifier: string) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    body: new URLSearchParams({
      client_id: '8d59d667427a435a8fdb10eb53f77501',
      grant_type: 'authorization_code',
      redirect_uri: 'stati://callback',
      code_verifier: codeVerifier,
      code,
    }).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });

  return response.json();
}

export async function fetchTopItems<T>(
  accessToken: string,
  type: 'tracks' | 'artists',
  period: 'medium_term' | 'short_term' | 'long_term' = 'short_term',
  count = 4,
) {
  const data = await fetchWrapper<T>({
    url: `https://api.spotify.com/v1/me/top/${type}?limit=${count}&time_range=${period}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
  });

  return data;
}

export async function fetchRecentlyPlayed(accessToken: string, count = 5) {
  const data = await fetchWrapper<RecentlyPlayed>({
    url: `https://api.spotify.com/v1/me/player/recently-played?limit=${count}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
  });

  return data;
}

export async function fetchWebAccessToken(spDcCookie: string) {
  const data = await fetchWrapper<{ isAnonymous: boolean; accessToken: string }>({
    headers: {
      Cookie: `sp_dc=${spDcCookie}`,
    },
    url: 'https://open.spotify.com/get_access_token?reason=transport&productType=web_player',
    method: 'GET',
  });

  return data;
}

export async function fetchFriendsActivity(webAccessToken: string) {
  const data = await fetchWrapper<FriendsActivity>({
    url: 'https://spclient.wg.spotify.com/presence-view/v1/buddylist',
    headers: {
      Authorization: `Bearer ${webAccessToken}`,
    },
    method: 'GET',
  });

  return data;
}
