import Animated, { FadeInLeft } from 'react-native-reanimated';
import { StyleSheet, Text } from 'react-native';
import { getGreetingMessages } from '@/utils';

export function GreetingMessage() {
  const [greeting, message] = getGreetingMessages();

  return (
    <Animated.View entering={FadeInLeft}>
      <Text style={styles.greeting}>{greeting}</Text>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  message: {
    fontFamily: 'Poppins-SemiBold',
    color: '#666363',
    fontSize: 16,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 30,
  },
});
