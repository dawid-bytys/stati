import type { AuthSlice } from './auth';
import type { LoadingSlice } from './loading';
import type { ModalSlice } from './modal';
import type { NotificationSlice } from './notification';
import type { UserSlice } from './user';
import type { StateCreator } from 'zustand';

interface TopItemsParams {
  type: string;
  period: string;
}

export type TopItemsParamsSlice = {
  topItemsParams: TopItemsParams;
  setTopItemsParams: (params: Partial<TopItemsParams>) => void;
};

export const createTopItemsParamsSlice: StateCreator<
  AuthSlice & UserSlice & NotificationSlice & LoadingSlice & ModalSlice & TopItemsParamsSlice,
  [],
  [],
  TopItemsParamsSlice
> = (set) => ({
  topItemsParams: {
    type: 'artists',
    period: '4 weeks',
  },
  setTopItemsParams: (params) => {
    set((state) => ({
      topItemsParams: {
        ...state.topItemsParams,
        ...params,
      },
    }));
  },
});
