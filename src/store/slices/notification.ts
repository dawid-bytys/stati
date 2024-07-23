import type { AuthSlice } from './auth';
import type { LoadingSlice } from './loading';
import type { ModalSlice } from './modal';
import type { TopItemsParamsSlice } from './top-items';
import type { UserSlice } from './user';
import type { StateCreator } from 'zustand';

interface Notification {
  type: 'success' | 'error' | 'warning';
  message: string;
}

export type NotificationSlice = {
  notification: Notification | null;
  setNotification: (notification: Notification | null) => void;
};

export const createNotificationSlice: StateCreator<
  AuthSlice & UserSlice & NotificationSlice & LoadingSlice & ModalSlice & TopItemsParamsSlice,
  [],
  [],
  NotificationSlice
> = (set) => ({
  notification: null,
  setNotification: (notification) => {
    set(() => ({ notification }));

    setTimeout(() => {
      set(() => ({ notification: null }));
    }, 3000);
  },
});
