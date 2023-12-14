import { createContext } from 'react';

interface ErrorContext {
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

export const ErrorContext = createContext<ErrorContext | undefined>(undefined);
