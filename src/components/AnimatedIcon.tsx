import LottieView from 'lottie-react-native';
import type { AnimationObject } from 'lottie-react-native';

interface AnimatedIconProps {
  width: number;
  height: number;
  duration: number;
  source: AnimationObject;
}

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
