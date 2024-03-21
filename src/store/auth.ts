import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AuthState = {
  accessToken: {
    value: string;
    createdAt: number;
  };
  webAccessToken: {
    value: string;
    expiresAt: number;
  };
  refreshToken: string;
  spDcCookie: string;
};

type Actions = {
  setValue: <T>(key: keyof AuthState, value: T) => void;
};

const initialState = {
  accessToken: {
    value: '',
    createdAt: 0,
  },
  webAccessToken: {
    value: '',
    expiresAt: 0,
  },
  refreshToken: '',
  spDcCookie: '',
};

export const useAuthStore = create<AuthState & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setValue: (key, value) =>
        set({
          [key]: value,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage<AuthState & Actions>(() => AsyncStorage),
    },
  ),
);
