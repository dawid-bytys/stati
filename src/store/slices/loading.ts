import type { AuthSlice } from './auth';
import type { ModalSlice } from './modal';
import type { NotificationSlice } from './notification';
import type { TopItemsParamsSlice } from './top-items';
import type { UserSlice } from './user';
import type { StateCreator } from 'zustand';

export type LoadingSlice = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

export const createLoadingSlice: StateCreator<
  AuthSlice & UserSlice & NotificationSlice & LoadingSlice & ModalSlice & TopItemsParamsSlice,
  [],
  [],
  LoadingSlice
> = (set) => ({
  isLoading: true,
  setLoading: (isLoading) => set(() => ({ isLoading })),
});
