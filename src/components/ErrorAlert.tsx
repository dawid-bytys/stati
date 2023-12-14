import Animated, { FadeInUp, FadeOutUp, SlideInDown, SlideInUp } from 'react-native-reanimated';
import { StyleSheet, View, Text } from 'react-native';

interface AlertProps {
  message: string;
}

export function ErrorAlert({ message }: AlertProps) {
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={styles.container}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#FF0000',
    width: '100%',
    height: 100,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    zIndex: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 25,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});
