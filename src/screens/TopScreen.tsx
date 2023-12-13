import { Navigation } from '@/components/TopMain/Navigation';
import { TopMain } from '@/components/TopMain/TopMain';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

interface TopScreenParams {
  currentContent: string;
  currentPeriod: string;
}

export function TopScreen() {
  const [params, setParams] = useState<TopScreenParams>({
    currentPeriod: 'last week',
    currentContent: 'artists',
  });

  function handlePeriodChange(period: string) {
    setParams({ ...params, currentPeriod: period });
  }

  function handleContentChange(content: string) {
    setParams({ ...params, currentContent: content });
  }

  return (
    <View style={styles.container}>
      <Navigation
        tabs={['last week', '3 months', 'all time']}
        currentTab={params.currentPeriod}
        onClick={handlePeriodChange}
        type="period"
      />
      <TopMain {...params} />
      <Navigation
        tabs={['artists', 'tracks', 'albums']}
        currentTab={params.currentContent}
        onClick={handleContentChange}
        type="content"
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
