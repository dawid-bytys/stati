import LottieView from 'lottie-react-native';

interface AnimatedLogoProps {
  width: number;
  height: number;
}

export function AnimatedLogo({ width, height }: AnimatedLogoProps) {
  return (
    <LottieView
      source={require('@/assets/animations/logo-animation.json')}
      autoPlay
      loop
      style={{
        width,
        height,
      }}
      duration={800}
    />
  );
}
