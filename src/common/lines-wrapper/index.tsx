import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getIcon } from '../icons';
import { styles } from './styles';
import type { LinesWrapperProps } from './types';
import type { PropsWithChildren } from 'react';

export function LinesWrapper({ children, absolute = false }: PropsWithChildren<LinesWrapperProps>) {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={[absolute ? styles.absoluteWrapper : styles.flexWrapper, { paddingTop: absolute ? 0 : insets.top }]}
      entering={FadeIn}
      exiting={FadeOut}>
      <View style={styles.linesUp}>{getIcon('linesUp')}</View>
      <View style={styles.linesDown}>{getIcon('linesDown')}</View>
      {children}
    </Animated.View>
  );
}
