import { queryClient } from '@/network/react-query-client';
import type { LoadingSlice } from './loading';
import type { ModalSlice } from './modal';
import type { NotificationSlice } from './notification';
import type { TopItemsParamsSlice } from './top-items';
import type { UserSlice } from './user';
import type { StateCreator } from 'zustand';

const initialState = {
  isAuthenticating: true,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  webAccessToken: null,
  spdcCookie: null,
};

interface AccessToken {
  value: string;
  expiresAt: number;
}

interface Auth {
  accessToken: AccessToken;
  refreshToken: string;
}

export type AuthSlice = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  accessToken: AccessToken | null;
  refreshToken: string | null;
  webAccessToken: AccessToken | null;
  spdcCookie: string | null;
  setAuth: (auth: Auth) => void;
  setWebAccessToken: (webAccessToken: AccessToken) => void;
  setSpdcCookie: (spdcCookie: string | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setAuthenticating: (isAuthenticating: boolean) => void;
  clearWebAuth: () => void;
  logout: () => void;
};

export const createAuthSlice: StateCreator<
  AuthSlice & UserSlice & NotificationSlice & LoadingSlice & ModalSlice & TopItemsParamsSlice,
  [],
  [],
  AuthSlice
> = (set) => ({
  ...initialState,
  setAuth: (auth) => set({ ...auth }),
  setWebAccessToken: (webAccessToken) => set({ webAccessToken }),
  setSpdcCookie: (spdcCookie) => set({ spdcCookie }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setAuthenticating: (isAuthenticating) => set({ isAuthenticating }),
  clearWebAuth: () => set({ webAccessToken: null, spdcCookie: null }),
  logout: () => {
    set({ ...initialState, isAuthenticating: false });
    queryClient.clear();
  },
});
