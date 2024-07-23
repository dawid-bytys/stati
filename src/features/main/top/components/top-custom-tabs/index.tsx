import { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { styles } from './styles';
import type { TopCustomTabsProps } from './types';

export function TopCustomTabs({ tabs, currentTab, onTabPress, style }: TopCustomTabsProps) {
  const transitionValue = useSharedValue(0);

  const animatedBackgroundStyles = useAnimatedStyle(() => {
    return {
      width: `${100 / tabs.length}%`,
      left: `${(transitionValue.value * 100) / tabs.length}%`,
    };
  });

  useEffect(() => {
    transitionValue.value = withTiming(tabs.indexOf(currentTab), { duration: 200 });
  }, [currentTab, tabs, transitionValue]);

  return (
    <View style={[styles.wrapper, style]}>
      <Animated.View style={[styles.animatedBackground, animatedBackgroundStyles]} />
      {tabs.map((tab) => (
        <TouchableOpacity key={tab} style={styles.tabBtn} onPress={() => onTabPress(tab)}>
          <Animated.Text style={[styles.tabBtnText, { opacity: tab === currentTab ? 1 : 0.4 }]}>{tab}</Animated.Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
