import { Loading } from '@/components/Loading';
import { ArtistTile } from '@/components/TopMain/ArtistTile';
import { TrackTile } from '@/components/TopMain/TrackTile';
import { fetchTopItems } from '@/domain/spotify';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useErrorContext } from '@/hooks/useErrorContext';
import { FilteredArtist, FilteredTrack } from '@/types';
import { dataIsTracks } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ListRenderItemInfo,
} from 'react-native';

interface TopContentScreenProps {
  route: {
    params: {
      content: 'artists' | 'tracks';
      period: 'short_term' | 'medium_term' | 'long_term';
    };
  };
}

export function TopContentScreen({ route }: TopContentScreenProps) {
  const { content, period } = route.params;
  const [data, setData] = useState<(FilteredArtist | FilteredTrack)[] | null>(null);
  const { accessToken } = useAuthContext();
  const { setErrorMessage } = useErrorContext();
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const renderTrackTile = useCallback(
    ({ item, index }: ListRenderItemInfo<FilteredTrack>) => {
      return (
        <TrackTile
          {...item}
          key={item.id}
          rank={index + 1}
          delay={(index - offset) * 100}
        />
      );
    },
    [offset],
  );

  const renderArtistTile = useCallback(
    ({ item, index }: ListRenderItemInfo<FilteredArtist>) => {
      return (
        <ArtistTile
          {...item}
          key={item.id}
          rank={index + 1}
          delay={(index - offset) * 100}
        />
      );
    },
    [offset],
  );

  const handleLoadMore = useCallback(() => {
    if (data && data.length < 50 && !isLoading) {
      loadData(offset);
    }
  }, [offset, isLoading]);

  const handleRefresh = useCallback(() => {
    setOffset(0);
    setData(null);
  }, []);

  const loadData = useCallback(async (offset = 0) => {
    setIsLoading(true);

    try {
      const topContent = await fetchTopItems<FilteredArtist[] | FilteredTrack[]>(
        accessToken,
        content,
        period,
        offset,
        10,
      );

      setData((prevData) => {
        if (prevData) {
          return [...prevData, ...topContent];
        }

        return topContent;
      });

      setOffset((prevOffset) => prevOffset + 10);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

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
            onRefresh={handleRefresh}
          />
        }
        onEndReached={handleLoadMore}
        ListFooterComponent={() => renderListFooter(isLoading)}
        data={data}
        keyExtractor={(item, index) => item.track + index}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          rowGap: 20,
        }}
        renderItem={renderTrackTile}
      />
    );
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={data === null}
          onRefresh={handleRefresh}
        />
      }
      onEndReached={handleLoadMore}
      ListFooterComponent={() => renderListFooter(isLoading)}
      data={data}
      keyExtractor={(item, index) => item.artist + index}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        rowGap: 20,
      }}
      renderItem={renderArtistTile}
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
