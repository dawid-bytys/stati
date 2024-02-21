import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Router } from '@/navigation/Router';
import { StrictMode } from 'react';
import { AuthContextProvider } from './providers/AuthContextProvider';
import { ErrorContextProvider } from './providers/ErrorContextProvider';

export function App() {
  return (
    <StrictMode>
      <SafeAreaProvider>
        <ErrorContextProvider>
          <AuthContextProvider>
            <Router />
          </AuthContextProvider>
        </ErrorContextProvider>
      </SafeAreaProvider>
    </StrictMode>
  );
}
