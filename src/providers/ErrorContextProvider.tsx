import { ErrorContext } from '@/context/ErrorContext';
import { PropsWithChildren, useEffect, useState } from 'react';

export function ErrorContextProvider({ children }: PropsWithChildren) {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
}
