import { _useStore } from '@/store/store';
import axios from 'axios';
import { SpotifyService } from '../services/spotify';

export const spotifyClient = axios.create();

spotifyClient.interceptors.request.use(async (req) => {
  const currentAccessToken = _useStore.getState().accessToken;

  if (!currentAccessToken) {
    throw new Error('No access token found');
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (currentAccessToken.expiresAt - currentTimestamp > 60) {
    req.headers.Authorization = `Bearer ${currentAccessToken.value}`;
    return req;
  }

  const { access_token, refresh_token, expires_in } = await SpotifyService.refreshToken();

  _useStore.getState().setAuth({
    accessToken: {
      value: access_token,
      expiresAt: currentTimestamp + expires_in,
    },
    refreshToken: refresh_token,
  });

  req.headers.Authorization = `Bearer ${access_token}`;
  return req;
});
