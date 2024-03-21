import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { GreetingSection } from '@/components/GreetingSection/GreetingSection';
import { LatestActivitySection } from '@/components/LatestActivitySection/LatestActivitySection';
import { Loading } from '@/components/Loading/Loading';
import { TopSection } from '@/components/TopSection/TopSection';
import { fetchRecentlyPlayed, fetchTopItems } from '@/domain/spotify';
import { CustomError } from '@/errors';
import { useNotificationContext } from '@/hooks/useNotificationContext';
import { useAuthStore } from '@/store/auth';
import { filterRecentlyPlayed, filterArtists, filterTracks } from '@/utils';
import { styles } from './HomeScreen.styles';
import type { TopArtistsResponse, TopTracksResponse } from '@/types/responses';
import type { FilteredRecentlyPlayed, FilteredArtist, FilteredTrack } from '@/types/types';

interface TopData {
  recentlyPlayed: FilteredRecentlyPlayed[];
  topArtists: FilteredArtist[];
  topTracks: FilteredTrack[];
}

export function HomeScreen() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { setNotification } = useNotificationContext();
  const [data, setData] = useState<TopData | null>(null);

  useEffect(() => {
    async function handleTopContent() {
      try {
        const topArtists = await fetchTopItems<TopArtistsResponse>(
          accessToken.value,
          'artists',
          'short_term',
        );
        const topTracks = await fetchTopItems<TopTracksResponse>(
          accessToken.value,
          'tracks',
          'short_term',
        );
        const recentlyPlayed = await fetchRecentlyPlayed(accessToken.value);

        setData({
          topArtists: filterArtists(topArtists),
          topTracks: filterTracks(topTracks),
          recentlyPlayed: filterRecentlyPlayed(recentlyPlayed),
        });
      } catch (err) {
        if (err instanceof CustomError) {
          setNotification(err.message, 'error');
        } else {
          setNotification('Something went wrong, try reloading the app.', 'error');
        }
      }
    }

    if (!data) {
      handleTopContent();
    }
  }, [data, accessToken, setNotification]);

  if (!data) {
    return <Loading />;
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={data === null}
          onRefresh={() => setData(null)}
        />
      }
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
