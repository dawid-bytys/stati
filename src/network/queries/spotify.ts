import { FIFTEEN_SECONDS, THREE_HOURS } from '@/common/constants';
import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import { SpotifyService } from '../services/spotify';
import type { TopItemsParams } from '../params';
import type { TopArtistsResponse, TopTracksResponse } from '../responses';

export function useMainQueries() {
  return useQueries({
    queries: [
      {
        queryKey: ['artists'],
        queryFn: () => SpotifyService.fetchTopItems<TopArtistsResponse>({ type: 'artists' }),
        staleTime: THREE_HOURS,
      },
      {
        queryKey: ['tracks'],
        queryFn: () => SpotifyService.fetchTopItems<TopTracksResponse>({ type: 'tracks' }),
        staleTime: THREE_HOURS,
      },
      {
        queryKey: ['recentlyPlayed'],
        queryFn: () => SpotifyService.fetchRecentlyPlayed(),
        refetchInterval: FIFTEEN_SECONDS,
      },
    ],
  });
}

export function useTopItemsInfiniteQuery<T extends TopArtistsResponse | TopTracksResponse>(params: TopItemsParams) {
  return useInfiniteQuery({
    queryKey: [params.type, params.period],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => SpotifyService.fetchTopItems<T>({ ...params, limit: 10, offset: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.items.length < 10) {
        return undefined;
      }

      return lastPage.offset + 10;
    },
    staleTime: THREE_HOURS,
  });
}

export function useRecentlyPlayedQuery() {
  return useQuery({
    queryKey: ['recentlyPlayed'],
    queryFn: () => SpotifyService.fetchRecentlyPlayed(),
    refetchInterval: FIFTEEN_SECONDS,
  });
}

export function useWebAccessTokenQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['webAccessToken'],
    queryFn: () => SpotifyService.fetchWebAccessToken(),
    retry: false,
    enabled,
  });
}

export function useFriendsActivityQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['friendsActivity'],
    queryFn: () => SpotifyService.fetchFriendsActivity(),
    refetchInterval: FIFTEEN_SECONDS,
    enabled,
  });
}
