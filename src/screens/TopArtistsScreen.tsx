import { Loading } from '@/components/Loading';
import { ArtistTile } from '@/components/TopMain/ArtistTile';
import { fetchTopItems } from '@/domain/spotify';
import { useAuthContext } from '@/hooks/useAuthContext';
import { FilteredArtist } from '@/types';
import { TopArtists } from '@/types/artists';
import { filterArtists, mapPeriodToSpotifyPeriod } from '@/utils';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

interface TopArtistsScreenProps {
  route: any;
}

export function TopArtistsScreen({ route }: TopArtistsScreenProps) {
  const [data, setData] = useState<FilteredArtist[] | null>(null);
  const { tokens } = useAuthContext();
  const {
    params: { period },
  } = route;

  useEffect(() => {
    async function loadData(accessToken: string) {
      try {
        const topArtists = await fetchTopItems<TopArtists>(accessToken, 'artists', period, 10);
        const filteredArtists = filterArtists(topArtists);

        setData(filteredArtists);
      } catch (err) {
        console.log(err);
      }
    }

    if (tokens) {
      setData(null);
      loadData(tokens.accessToken);
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
      {data.map(({ artist, image }, i) => (
        <ArtistTile
          delay={i * 100}
          plays={i + 1}
          artist={artist}
          image={image}
          rank={i + 1}
          key={i}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
