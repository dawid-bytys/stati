import { Loading } from '@/components/Loading';
import { TrackTile } from '@/components/TopMain/TrackTile';
import { fetchTopItems } from '@/domain/spotify';
import { useAuthContext } from '@/hooks/useAuthContext';
import { FilteredArtist, FilteredTrack } from '@/types';
import { TopArtists } from '@/types/artists';
import { TopTracks } from '@/types/tracks';
import { filterArtists, filterTracks, mapPeriodToSpotifyPeriod } from '@/utils';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

interface TopTracksScreenProps {
  route: any;
}

export function TopTracksScreen({ route }: TopTracksScreenProps) {
  const [data, setData] = useState<FilteredTrack[] | null>(null);
  const { tokens } = useAuthContext();
  const {
    params: { period },
  } = route;

  useEffect(() => {
    async function loadData(accessToken: string) {
      try {
        const topTracks = await fetchTopItems<TopTracks>(accessToken, 'tracks', period, 10);
        const filteredTracks = filterTracks(topTracks);

        setData(filteredTracks);
      } catch (err) {
        console.log(err);
      }
    }

    if (tokens) {
      setData(null);
      loadData(tokens.accessToken.token);
    }
  }, [period]);

  if (!data) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        rowGap: 20,
      }}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      {data.map((item, i) => (
        <TrackTile
          {...item}
          delay={i * 100}
          rank={i + 1}
          key={i}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
