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
  const { tokens, logout } = useAuthContext();
  const [data, setData] = useState<TopData | null>(null);

  useEffect(() => {
    async function loadTopContent(accessToken: string) {
      try {
        const topArtists = await fetchTopItems<TopArtists>(accessToken, 'artists', 'short_term');
        const topTracks = await fetchTopItems<TopTracks>(accessToken, 'tracks', 'short_term');
        const recentlyPlayed = await fetchRecentlyPlayed(accessToken);

        const filteredArtists = filterArtists(topArtists);
        const filteredTracks = filterTracks(topTracks);
        const filteredRecentlyPlayed = filterRecentlyPlayed(recentlyPlayed);

        setData({
          recentlyPlayed: filteredRecentlyPlayed,
          topArtists: filteredArtists,
          topTracks: filteredTracks,
        });
      } catch (err) {
        if (err instanceof Error && err.message === 'Unauthorized') {
          logout();
        }
      }
    }

    if (tokens) {
      loadTopContent(tokens.accessToken.token);
    }
  }, []);

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
