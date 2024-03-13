import Animated, { FadeInUp, FadeOutUp, SlideInDown, SlideInUp } from 'react-native-reanimated';
import { Text } from 'react-native';
import { styles } from './Notification.styles';

interface NotificationProps {
  message: string;
  isError: boolean;
}

export function Notification({ message, isError }: NotificationProps) {
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={{
        ...styles.container,
        backgroundColor: isError ? '#FF4D4D' : '#1FDF64',
      }}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}
