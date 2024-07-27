import { _useStore } from '@/store/store';
import axios, { AxiosError } from 'axios';
import { SpotifyService } from '../services/spotify';

export const privateSpotifyClient = axios.create();

privateSpotifyClient.interceptors.request.use((req) => {
  const webAccessToken = _useStore.getState().webAccessToken?.value;
  req.headers.Authorization = `Bearer ${webAccessToken}`;
  return req;
});

privateSpotifyClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err instanceof AxiosError && err.response?.status === 401) {
      const { accessToken, accessTokenExpirationTimestampMs } = await SpotifyService.fetchWebAccessToken();

      _useStore
        .getState()
        .setWebAccessToken({ value: accessToken, expiresAt: Math.floor(accessTokenExpirationTimestampMs / 1000) });

      const originalRequestConfig = err.config!;
      originalRequestConfig.headers.Authorization = `Bearer ${accessToken}`;

      return privateSpotifyClient.request(originalRequestConfig);
    }

    return Promise.reject(err);
  },
);
