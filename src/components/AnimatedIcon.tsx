import LottieView from 'lottie-react-native';

interface AnimatedIconProps {
  width: number;
  height: number;
  duration: number;
  source: any;
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
