import { createContext } from 'react';

interface NotificationContext {
  message: string;
  isError: boolean;
  setNotification: (message: string, isError: boolean) => void;
}

export const NotificationContext = createContext<NotificationContext | undefined>(undefined);
