import type { FilteredRecentlyPlayed, FilteredArtist, FilteredTrack } from '@/types';
import { ScrollView, StyleSheet } from 'react-native';
import { GreetingMessage } from './GreetingMessage';
import { LatestActivity } from './LatestActivity';
import { TopContainer } from './TopContainer';

interface HomeMainProps {
  data: {
    recentlyPlayed: FilteredRecentlyPlayed[];
    topArtists: FilteredArtist[];
    topTracks: FilteredTrack[];
  };
}

export function HomeMain({ data: { recentlyPlayed, topArtists, topTracks } }: HomeMainProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <GreetingMessage />
      <TopContainer
        title="Top artists"
        data={topArtists}
      />
      <TopContainer
        title="Top tracks"
        data={topTracks}
      />
      <LatestActivity recentlyPlayed={recentlyPlayed} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
  },
});
