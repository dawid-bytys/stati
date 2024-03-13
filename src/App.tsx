import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Router } from '@/navigation/Router';
import { AuthContextProvider } from '@/providers/AuthContextProvider';
import { NotificationContextProvider } from '@/providers/NotificationContextProvider';

export function App() {
  return (
    <SafeAreaProvider>
      <NotificationContextProvider>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </NotificationContextProvider>
    </SafeAreaProvider>
  );
}
