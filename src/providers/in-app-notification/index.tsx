import { useStore } from '@/store/store';
import { Pressable, Text } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { styles } from './styles';
import { getNotificationColor } from './utils';
import type { PropsWithChildren } from 'react';

export function InAppNotificationProvider({ children }: PropsWithChildren) {
  const store = useStore();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <>
      {store.notification && (
        <AnimatedPressable
          onPress={() => store.setNotification(null)}
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={{
            ...styles.wrapper,
            backgroundColor: getNotificationColor(store.notification.type),
          }}>
          <Text style={styles.message}>{store.notification.message}</Text>
        </AnimatedPressable>
      )}
      {children}
    </>
  );
}
