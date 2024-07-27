import { ONE_HOUR } from '@/common/constants';
import { SpotifyService } from '@/network/services/spotify';
import { _useStore } from '@/store/store';
import { useMutation } from '@tanstack/react-query';
import type { FetchTokensParams } from '../params';

export const useAuthMutation = () => {
  return useMutation({
    mutationFn: ({ code, codeVerifier }: FetchTokensParams) => SpotifyService.fetchTokens({ code, codeVerifier }),
    onMutate: () => {
      _useStore.getState().setLoading(true);
    },
    onSuccess: ({ access_token, refresh_token, expires_in }) => {
      const currentTimestamp = Math.floor(Date.now() / 1000);

      _useStore.getState().setAuth({
        accessToken: {
          value: access_token,
          expiresAt: currentTimestamp + expires_in,
        },
        refreshToken: refresh_token,
      });
      _useStore.getState().setAuthenticated(true);
      _useStore.getState().setNotification({
        type: 'success',
        message: 'Logged in successfully! 🎉',
      });
    },
    onError: () => {
      _useStore.getState().logout();
      _useStore.getState().setNotification({
        type: 'error',
        message: 'Failed to login, please try again.',
      });
    },
    onSettled: () => {
      _useStore.getState().setLoading(false);
    },
  });
};

export const useRefreshTokenMutation = () => {
  return useMutation({
    mutationFn: () => SpotifyService.refreshToken(),
    gcTime: ONE_HOUR,
    onSuccess: ({ access_token, refresh_token, expires_in }) => {
      const currentTimestamp = Math.floor(Date.now() / 1000);

      _useStore.getState().setAuth({
        accessToken: {
          value: access_token,
          expiresAt: currentTimestamp + expires_in,
        },
        refreshToken: refresh_token,
      });
      _useStore.getState().setAuthenticated(true);
    },
    onError: () => {
      _useStore.getState().logout();
      _useStore.getState().setNotification({
        type: 'error',
        message: 'Something went wrong, please login again.',
      });
      _useStore.getState().setAuthenticating(false);
      _useStore.getState().setLoading(false);
    },
  });
};
