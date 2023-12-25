import Animated, { FadeOut } from 'react-native-reanimated';
import { StyleSheet, Text } from 'react-native';
import { AnimatedIcon } from './AnimatedIcon';

export function Loading() {
  return (
    <Animated.View
      exiting={FadeOut.duration(300)}
      style={styles.container}
    >
      <AnimatedIcon
        width={64}
        height={64}
        duration={800}
        source={require('@/assets/lottie/logo-animation.json')}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
});
