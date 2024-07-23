import type { AuthSlice } from './auth';
import type { LoadingSlice } from './loading';
import type { NotificationSlice } from './notification';
import type { TopItemsParamsSlice } from './top-items';
import type { UserSlice } from './user';
import type { StateCreator } from 'zustand';

interface Modal {
  component: JSX.Element;
}

export type ModalSlice = {
  modal: Modal | null;
  openModal: (modal: Modal) => void;
  closeModal: () => void;
};

export const createModalSlice: StateCreator<
  AuthSlice & UserSlice & NotificationSlice & ModalSlice & LoadingSlice & TopItemsParamsSlice,
  [],
  [],
  ModalSlice
> = (set) => ({
  modal: null,
  openModal: (modal) => set({ modal }),
  closeModal: () => {
    set(() => ({
      modal: null,
    }));
  },
});
