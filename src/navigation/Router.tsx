import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useAuthContext } from '@/hooks/useAuthContext';
import { AuthStack } from './AuthStack';
import { Tabs } from './Tabs';

export function Router() {
  const { isAuthenticated, isAuthenticating } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticating) {
      SplashScreen.hide();
    }
  }, [isAuthenticating]);

  return isAuthenticated ? <Tabs /> : <AuthStack />;
}
