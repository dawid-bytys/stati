import { Loading } from '@/components/Loading';
import { ArtistTile } from '@/components/TopMain/ArtistTile';
import { TrackTile } from '@/components/TopMain/TrackTile';
import { fetchTopItems } from '@/domain/spotify';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useErrorContext } from '@/hooks/useErrorContext';
import { FilteredArtist, FilteredTrack, TopTracks } from '@/types';
import { TopArtists } from '@/types/artists';
import { dataIsTracks, filterArtists, filterTracks } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';

interface TopContentScreenProps {
  route: {
    params: {
      content: 'artists' | 'tracks';
      period: 'short_term' | 'medium_term' | 'long_term';
    };
  };
}

export function TopContentScreen<T extends FilteredArtist | FilteredTrack>({
  route,
}: TopContentScreenProps) {
  const { content, period } = route.params;
  const [data, setData] = useState<T[] | null>(null);
  const { accessToken } = useAuthContext();
  const { setErrorMessage } = useErrorContext();
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(
    async (offset = 0) => {
      setIsLoading(true);
      try {
        const topContent = await fetchTopItems<T>(accessToken, content, period, offset, 10);

        if (content === 'artists') {
          const filteredArtists = filterArtists(topContent as unknown as TopArtists);
          setData((prevData) =>
            prevData ? [...prevData, ...(filteredArtists as T[])] : (filteredArtists as T[]),
          );
        } else {
          const filteredTracks = filterTracks(topContent as unknown as TopTracks);
          setData((prevData) =>
            prevData ? [...prevData, ...(filteredTracks as T[])] : (filteredTracks as T[]),
          );
        }

        setOffset(offset + 10);
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken, content, period],
  );

  useEffect(() => {
    if (!data) {
      loadData();
    }
  }, [data]);

  if (!data) {
    return <Loading />;
  }

  if (dataIsTracks(data)) {
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={data === null}
            onRefresh={() => {
              setData(null);
            }}
          />
        }
        onEndReached={() => {
          if (data.length < 50) {
            loadData(offset);
          }
        }}
        ListFooterComponent={() => renderListFooter(isLoading)}
        data={data}
        keyExtractor={(item, index) => item.track + index}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          rowGap: 20,
        }}
        renderItem={({ item, index }) => (
          <TrackTile
            {...item}
            delay={index * 100}
            rank={index + 1}
          />
        )}
      />
    );
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={data === null}
          onRefresh={() => {
            setData(null);
          }}
        />
      }
      onEndReached={() => {
        if (data.length < 50) {
          loadData(offset);
        }
      }}
      ListFooterComponent={() => renderListFooter(isLoading)}
      data={data}
      keyExtractor={(item, index) => item.artist + index}
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

function renderListFooter(isLoading: boolean) {
  if (isLoading) {
    return (
      <ActivityIndicator
        size="small"
        style={{ marginVertical: 20 }}
      />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
