import { Loading } from '@/common/loading';
import { NotFound } from '@/common/not-found';
import { useTopItemsInfiniteQuery } from '@/network/queries/spotify';
import { useStore } from '@/store/store';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { TopRow } from '../components/top-row';
import { styles } from './styles';
import type { TopItemsProps } from './types';
import type { ArtistItem } from '@/network/responses/artists';
import type { TrackItem } from '@/network/responses/tracks';
import type { ListRenderItemInfo } from 'react-native';

export function TopItems({ type, period }: TopItemsProps) {
  const store = useStore();
  const listRef = useRef<FlatList<TrackItem | ArtistItem> | null>(null);

  const { data, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useTopItemsInfiniteQuery({
    type,
    period,
  });

  const flattenedData = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return data.pages.map((page) => page.items).flat();
  }, [data]);

  const renderItem = useCallback(({ item, index }: ListRenderItemInfo<TrackItem | ArtistItem>) => {
    if ('track_number' in item) {
      return (
        <TopRow track={item.name} artist={item.artists[0].name} image={item.album.images[0].url} rank={index + 1} />
      );
    }

    return <TopRow track={item.name} image={item.images[0].url} rank={index + 1} />;
  }, []);

  useEffect(() => {
    listRef.current?.scrollToIndex({ index: 0 });
  }, [type, period]);

  useEffect(() => {
    if (error) {
      store.setNotification({
        type: 'error',
        message: 'Failed to load data, try restarting the app.',
      });
    }
  }, [error, store]);

  if (!flattenedData) {
    return <Loading withPaddingTop={false} />;
  }

  if (flattenedData.length === 0) {
    return <NotFound iconWidth={200} iconHeight={200} />;
  }

  return (
    <FlatList
      ref={listRef}
      data={flattenedData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      onEndReachedThreshold={0.3}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="small" color="#fff" /> : null}
    />
  );
}
