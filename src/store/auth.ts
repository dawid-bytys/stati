import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthStore {
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
  setValue: <T>(key: string, value: T) => void;
}

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

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setValue: (key, value) => set((state) => ({ ...state, [key]: value })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage<AuthStore>(() => AsyncStorage),
    },
  ),
);
