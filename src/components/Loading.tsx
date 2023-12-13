import Animated, { FadeOut } from 'react-native-reanimated';
import { StyleSheet, Text } from 'react-native';
import LoadingIcon from '@/assets/svg/loading.svg';

export function Loading() {
  return (
    <Animated.View
      exiting={FadeOut.duration(300)}
      style={styles.container}
    >
      <Text style={styles.text}>Loading...</Text>
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
