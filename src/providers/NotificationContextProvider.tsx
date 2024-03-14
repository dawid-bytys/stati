import { useCallback, useEffect, useState } from 'react';
import { Notification } from '@/components/Notification/Notification';
import { NotificationContext } from '@/context/NotificationContext';
import type { PropsWithChildren } from 'react';

export function NotificationContextProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
        setIsError(false);
      }, 3000);
    }
  }, [message, setMessage, setIsError]);

  const setNotification = useCallback(
    (message: string, isError: boolean) => {
      setMessage(message);
      setIsError(isError);
    },
    [setMessage, setIsError],
  );

  return (
    <NotificationContext.Provider value={{ message, isError, setNotification }}>
      {message && (
        <Notification
          message={message}
          isError={isError}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
}
