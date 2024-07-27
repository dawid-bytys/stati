import { _useStore } from '@/store/store';
import axios from 'axios';
import { SpotifyService } from '../services/spotify';

export const privateSpotifyClient = axios.create();

privateSpotifyClient.interceptors.request.use(async (req) => {
  const currentWebAccessToken = _useStore.getState().webAccessToken;

  if (!currentWebAccessToken) {
    throw new Error('No web access token found');
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (currentTimestamp < currentWebAccessToken.expiresAt) {
    req.headers.Authorization = `Bearer ${currentWebAccessToken.value}`;
    return req;
  }

  const { accessToken, accessTokenExpirationTimestampMs } = await SpotifyService.fetchWebAccessToken();

  _useStore.getState().setWebAccessToken({
    value: accessToken,
    expiresAt: Math.floor(accessTokenExpirationTimestampMs / 1000),
  });

  req.headers.Authorization = `Bearer ${accessToken}`;
  return req;
});
