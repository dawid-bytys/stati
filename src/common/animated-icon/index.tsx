import LottieView from 'lottie-react-native';
import type { AnimatedIconProps } from './types';

export function AnimatedIcon({ width, height, duration, source }: AnimatedIconProps) {
  return (
    <LottieView
      source={source}
      autoPlay
      loop
      style={{
        width,
        height,
      }}
      duration={duration}
    />
  );
}
