import { Text } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { getNotificationColor } from '@/utils';
import { styles } from './Notification.styles';
import type { NotificationType } from '@/context/NotificationContext';

interface NotificationProps {
  message: string;
  type: NotificationType;
}

export function Notification({ message, type }: NotificationProps) {
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={{
        ...styles.container,
        backgroundColor: getNotificationColor(type),
      }}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}
