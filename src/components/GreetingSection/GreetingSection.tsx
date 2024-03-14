import { Text } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';

import { getGreetingMessages } from '@/utils';

import { styles } from './GreetingSection.styles';

export function GreetingSection() {
  const [greeting, message] = getGreetingMessages();

  return (
    <Animated.View entering={FadeInLeft}>
      <Text style={styles.greeting}>{greeting}</Text>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}
