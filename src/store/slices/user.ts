import type { AuthSlice } from './auth';
import type { LoadingSlice } from './loading';
import type { ModalSlice } from './modal';
import type { NotificationSlice } from './notification';
import type { TopItemsParamsSlice } from './top-items';
import type { StateCreator } from 'zustand';

interface User {
  displayName: string | null;
  image: string | null;
}

export type UserSlice = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const createUserSlice: StateCreator<
  AuthSlice & UserSlice & NotificationSlice & LoadingSlice & ModalSlice & TopItemsParamsSlice,
  [],
  [],
  UserSlice
> = (set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: null })),
});
