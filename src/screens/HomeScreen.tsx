import type { FilteredRecentlyPlayed, FilteredArtist, FilteredTrack } from '@/types';
import type { TopArtists } from '@/types/artists';
import type { TopTracks } from '@/types/tracks';
import { fetchRecentlyPlayed, fetchTopItems } from '@/domain/spotify';
import { filterRecentlyPlayed, filterArtists, filterTracks } from '@/utils';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Loading } from '@/components/Loading';
import { useEffect, useState } from 'react';
import { GreetingSection } from '@/components/HomeMain/GreetingSection';
import { LatestActivitySection } from '@/components/HomeMain/LatestActivitySection';
import { TopSection } from '@/components/HomeMain/TopSection';
import { ScrollView, StyleSheet } from 'react-native';

interface TopData {
  recentlyPlayed: FilteredRecentlyPlayed[];
  topArtists: FilteredArtist[];
  topTracks: FilteredTrack[];
}

export function HomeScreen() {
  const { accessToken, logout } = useAuthContext();
  const [data, setData] = useState<TopData | null>(null);

  useEffect(() => {
    async function loadTopContent() {
      try {
        const topArtists = await fetchTopItems<FilteredArtist[]>(
          accessToken,
          'artists',
          'short_term',
        );
        const topTracks = await fetchTopItems<FilteredTrack[]>(accessToken, 'tracks', 'short_term');
        const recentlyPlayed = await fetchRecentlyPlayed(accessToken);

        setData({
          recentlyPlayed,
          topArtists,
          topTracks,
        });
      } catch (err) {
        if (err instanceof Error && err.message === 'Unauthorized') {
          logout();
        }
      }
    }

    if (!data) {
      loadTopContent();
    }
  }, [data, accessToken, logout]);

  if (!data) {
    return <Loading />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <GreetingSection />
      <TopSection
        title="Top artists"
        artists={data.topArtists}
      />
      <TopSection
        title="Top tracks"
        tracks={data.topTracks}
      />
      <LatestActivitySection data={data.recentlyPlayed} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
  },
});
