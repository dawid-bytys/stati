import { useStore } from '@/store/store';
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import Animated, { FadeIn } from 'react-native-reanimated';
import { AuthStack } from './stacks/auth';
import { MainTabs } from './tabs/main';

export function Navigation() {
  const store = useStore();

  useEffect(() => {
    if (!store.isAuthenticating) {
      BootSplash.hide({ fade: true });
    }
  }, [store.isAuthenticating]);

  if (!store.isAuthenticated) {
    return (
      <Animated.View entering={FadeIn} style={{ flex: 1 }}>
        <AuthStack />
      </Animated.View>
    );
  }

  return <MainTabs />;
}
