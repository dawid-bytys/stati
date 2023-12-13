import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Router } from '@/navigation/Router';

import { AuthContextProvider } from './providers/AuthContextProvider';

export function App() {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}
