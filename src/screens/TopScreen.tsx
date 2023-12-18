import { Navigation } from '@/components/TopMain/Navigation';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { TopStack } from '@/navigation/TopStack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TopStackParamList } from '@/types';
import { mapContentToScreen, mapPeriodToSpotifyPeriod } from '@/utils';

interface TopScreenParams {
  currentContent: string;
  currentPeriod: string;
}

export function TopScreen() {
  const [params, setParams] = useState<TopScreenParams>({
    currentPeriod: '4 weeks',
    currentContent: 'artists',
  });
  const navigation = useNavigation<NavigationProp<TopStackParamList>>();

  function handlePeriodChange(period: string) {
    setParams({ ...params, currentPeriod: period });

    const screenName = mapContentToScreen(params.currentContent);

    navigation.navigate(screenName, {
      period: mapPeriodToSpotifyPeriod(period),
    });
  }

  function handleContentChange(content: string) {
    setParams({ ...params, currentContent: content });

    const screenName = mapContentToScreen(content);

    navigation.navigate(screenName, {
      period: mapPeriodToSpotifyPeriod(params.currentPeriod),
    });
  }

  return (
    <View style={styles.container}>
      <Navigation
        tabs={['4 weeks', '6 months', 'all time']}
        currentTab={params.currentPeriod}
        onClick={handlePeriodChange}
        type="period"
      />
      <TopStack />
      <Navigation
        tabs={['artists', 'tracks', 'albums']}
        currentTab={params.currentContent}
        onClick={handleContentChange}
        type="content"
        currentPeriod={params.currentPeriod}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingHorizontal: 25,
    flex: 1,
  },
});
