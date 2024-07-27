import { _useStore } from '@/store/store';
import axios, { AxiosError } from 'axios';
import { SpotifyService } from '../services/spotify';

export const spotifyClient = axios.create();

spotifyClient.interceptors.request.use((req) => {
  const accessToken = _useStore.getState().accessToken?.value;
  req.headers.Authorization = `Bearer ${accessToken}`;
  return req;
});

spotifyClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err instanceof AxiosError && err.response?.status === 403) {
      const { access_token, refresh_token, expires_in } = await SpotifyService.refreshToken();

      _useStore.getState().setAuth({
        accessToken: { value: access_token, expiresAt: Math.floor(Date.now() / 1000) + expires_in },
        refreshToken: refresh_token,
      });

      const originalRequestConfig = err.config!;
      originalRequestConfig.headers.Authorization = `Bearer ${access_token}`;

      return spotifyClient.request(originalRequestConfig);
    }

    return Promise.reject(err);
  },
);
