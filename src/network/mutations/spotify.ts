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
    onSuccess: (data) => {
      _useStore.getState().setAuth({ accessToken: data.access_token, refreshToken: data.refresh_token });
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
    onSuccess: (data) => {
      _useStore.getState().setAuth({ accessToken: data.access_token, refreshToken: data.refresh_token });
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
