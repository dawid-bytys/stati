import { Loading } from '@/components/Loading';
import { ArtistTile } from '@/components/TopMain/ArtistTile';
import { fetchTopItems } from '@/domain/spotify';
import { useAuthContext } from '@/hooks/useAuthContext';
import { FilteredArtist } from '@/types';
import { TopArtists } from '@/types/artists';
import { filterArtists, mapPeriodToSpotifyPeriod } from '@/utils';
import { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';

interface TopArtistsScreenProps {
  route: {
    params: {
      period: 'short_term' | 'medium_term' | 'long_term';
    };
  };
}

export function TopArtistsScreen({ route }: TopArtistsScreenProps) {
  const [data, setData] = useState<FilteredArtist[] | null>(null);
  const { tokens } = useAuthContext();
  const { period } = route.params;

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
      loadData(tokens.accessToken.token);
    }
  }, [period]);

  if (!data) {
    return <Loading />;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.artist}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        rowGap: 20,
      }}
      renderItem={({ item, index }) => (
        <ArtistTile
          {...item}
          delay={index * 100}
          rank={index + 1}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
