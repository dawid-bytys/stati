import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { StateCreator } from 'zustand'

interface AuthSlice {
  accessToken: {
    value: string
    createdAt: number
  }
  webAccessToken: {
    value: string
    expiresAt: number
  }
  refreshToken: string
  spdcCookie: string
  gqlAccessToken: string
  gqlRefreshToken: string
  setAuthValue: <T>(key: keyof AuthSlice, value: T) => void
}

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  accessToken: {
    value: '',
    createdAt: 0,
  },
  webAccessToken: {
    value: '',
    expiresAt: 0,
  },
  refreshToken: '',
  spdcCookie: '',
  gqlAccessToken: '',
  gqlRefreshToken: '',
  setAuthValue: (key, value) =>
    set({
      [key]: value,
    }),
})

export const useBoundStore = create<AuthSlice>()(
  persist(
    (...args) => ({
      ...createAuthSlice(...args),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage<AuthSlice>(() => AsyncStorage),
    },
  ),
)
