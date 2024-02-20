import type { FilteredRecentlyPlayed, FilteredArtist, FilteredTrack } from '@/types';
import { ScrollView, StyleSheet } from 'react-native';
import { GreetingSection } from './GreetingSection';
import { LatestActivitySection } from './LatestActivitySection';
import { TopSection } from './TopSection';

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
      <GreetingSection />
      <TopSection
        title="Top artists"
        data={topArtists}
      />
      <TopSection
        title="Top tracks"
        data={topTracks}
      />
      <LatestActivitySection recentlyPlayed={recentlyPlayed} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
  },
});
