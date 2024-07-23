import { ArrowRightIcon, HamburgerIcon } from '@/common/svgs';
import { useMainQueries } from '@/network/queries/spotify';
import { useStore } from '@/store/store';
import { useDrawerProgress, useDrawerStatus } from '@react-navigation/drawer';
import { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RecentlyPlayedSection } from '../components/recently-played-section';
import { TopSection } from '../components/top-section';
import { styles } from './styles';
import { greetingMessages, mapArtistsData, mapTracksData, mapRecentlyPlayedData } from './utils';
import type { HomeScreenNavigationProps } from './types';

export function HomeScreen({ navigation }: HomeScreenNavigationProps) {
  const store = useStore();
  const [greeting, message] = greetingMessages();
  const isDrawerClosed = useDrawerStatus() === 'closed';
  const progress = useDrawerProgress();
  const insets = useSafeAreaInsets();

  const animatedWrapperStyles = useAnimatedStyle(() => {
    const borderWidth = interpolate(progress.value, [0, 1], [0, 2], Extrapolation.CLAMP);
    const borderRadius = interpolate(progress.value, [0, 1], [0, 40], Extrapolation.CLAMP);
    const paddingTop = interpolate(progress.value, [0, 1], [insets.top, 0], Extrapolation.CLAMP);
    const scale = interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP);

    return {
      borderWidth,
      borderRadius,
      paddingTop,
      transform: [{ scale }],
    };
  });

  const results = useMainQueries();

  useEffect(() => {
    if (results.every((result) => result.isSuccess)) {
      store.setLoading(false);
    }

    if (results.some((result) => result.isError)) {
      store.setNotification({
        type: 'error',
        message: 'Failed to load data, try restarting the app.',
      });
    }
  }, [results, store]);

  if (!results[0].data || !results[1].data || !results[2].data) {
    return null;
  }

  return (
    <Animated.View style={[styles.animatedWrapper, { paddingTop: insets.top }, animatedWrapperStyles]}>
      <ScrollView contentContainerStyle={styles.scrollWrapper} showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.greetingsWrapperUpper}>
            <Text style={styles.greeting}>{greeting}</Text>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              {isDrawerClosed ? <HamburgerIcon /> : <ArrowRightIcon />}
            </TouchableOpacity>
          </View>
          <Text style={styles.message}>{message}</Text>
        </View>
        <TopSection type="artists" title="Top artists" data={mapArtistsData(results[0].data)} />
        <TopSection type="tracks" title="Top tracks" data={mapTracksData(results[1].data)} />
        <RecentlyPlayedSection data={mapRecentlyPlayedData(results[2].data)} />
      </ScrollView>
    </Animated.View>
  );
}
