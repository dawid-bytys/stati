import type { FilteredRecentlyPlayed, FilteredArtist, FilteredTrack } from '@/types';
import { fetchRecentlyPlayed, fetchTopItems } from '@/domain/spotify';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Loading } from '@/components/Loading/Loading';
import { useEffect, useState } from 'react';
import { GreetingSection } from '@/components/GreetingSection/GreetingSection';
import { LatestActivitySection } from '@/components/LatestActivitySection/LatestActivitySection';
import { TopSection } from '@/components/TopSection/TopSection';
import { useAuthStore } from '@/store/auth';
import { ScrollView } from 'react-native';
import { styles } from './HomeScreen.styles';

interface TopData {
  recentlyPlayed: FilteredRecentlyPlayed[];
  topArtists: FilteredArtist[];
  topTracks: FilteredTrack[];
}

export function HomeScreen() {
  const { logout } = useAuthContext();
  const { accessToken } = useAuthStore();
  const [data, setData] = useState<TopData | null>(null);

  useEffect(() => {
    async function loadTopContent() {
      try {
        const topArtists = await fetchTopItems<FilteredArtist[]>(
          accessToken.value,
          'artists',
          'short_term',
        );
        const topTracks = await fetchTopItems<FilteredTrack[]>(
          accessToken.value,
          'tracks',
          'short_term',
        );
        const recentlyPlayed = await fetchRecentlyPlayed(accessToken.value);

        setData({
          recentlyPlayed,
          topArtists,
          topTracks,
        });
      } catch (err) {
        if (err instanceof Error && err.message === 'Unauthorized') {
          logout(true);
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
      style={styles.container}
      showsVerticalScrollIndicator={false}
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
