import { createTrackedSelector } from 'react-tracked';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createAuthSlice } from './slices/auth';
import { createLoadingSlice, type LoadingSlice } from './slices/loading';
import { createModalSlice } from './slices/modal';
import { createNotificationSlice } from './slices/notification';
import { createTopItemsParamsSlice } from './slices/top-items';
import { createUserSlice } from './slices/user';
import { storage } from './storage';
import type { AuthSlice } from './slices/auth';
import type { ModalSlice } from './slices/modal';
import type { NotificationSlice } from './slices/notification';
import type { TopItemsParamsSlice } from './slices/top-items';
import type { UserSlice } from './slices/user';

export const _useStore = create<
  AuthSlice & UserSlice & NotificationSlice & LoadingSlice & ModalSlice & TopItemsParamsSlice
>()(
  persist(
    (...args) => ({
      ...createAuthSlice(...args),
      ...createUserSlice(...args),
      ...createNotificationSlice(...args),
      ...createLoadingSlice(...args),
      ...createModalSlice(...args),
      ...createTopItemsParamsSlice(...args),
    }),
    {
      name: 'storage',
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        webAccessToken: state.webAccessToken,
        spdcCookie: state.spdcCookie,
        user: state.user,
      }),
    },
  ),
);

export const useStore = createTrackedSelector(_useStore);
