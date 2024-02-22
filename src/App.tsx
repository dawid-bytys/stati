import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Router } from '@/navigation/Router';
import { AuthContextProvider } from './providers/AuthContextProvider';
import { ErrorContextProvider } from './providers/ErrorContextProvider';

export function App() {
  return (
    <SafeAreaProvider>
      <ErrorContextProvider>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </ErrorContextProvider>
    </SafeAreaProvider>
  );
}
