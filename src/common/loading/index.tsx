import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedIcon } from '../animated-icon';
import { styles } from './styles';
import type { LoadingProps } from './types';

export function Loading({ absolute = false, withPaddingTop = true }: LoadingProps) {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={[
        absolute ? styles.absoluteWrapper : styles.flexWrapper,
        { paddingTop: absolute || !withPaddingTop ? 0 : insets.top },
      ]}
      entering={FadeIn}
      exiting={FadeOut}>
      <AnimatedIcon source={require('@/assets/lottie/loading.json')} width={64} height={64} duration={800} />
    </Animated.View>
  );
}
