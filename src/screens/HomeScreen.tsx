import type { FilteredRecentlyPlayed, FilteredArtist, FilteredTrack } from '@/types';

import { getRecentlyPlayed, getTopArtists, getTopTracks } from '@/domain/spotify';
import { filterRecentlyPlayed, filterArtists, filterTracks } from '@/utils';
import { HomeMain } from '@/components/HomeMain/HomeMain';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Loading } from '@/components/Loading';
import { useEffect, useState } from 'react';

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
        const topArtists = await getTopArtists(accessToken);
        const topTracks = await getTopTracks(accessToken);
        const recentlyPlayed = await getRecentlyPlayed(accessToken);

        const filteredArtists = filterArtists(topArtists);
        const filteredTracks = filterTracks(topTracks);
        const FilteredRecentlyPlayed = filterRecentlyPlayed(recentlyPlayed);

        setData({
          recentlyPlayed: FilteredRecentlyPlayed,
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
      loadTopContent(tokens.accessToken);
    }
  }, [tokens]);

  if (!data) {
    return <Loading />;
  }

  return <HomeMain data={data} />;
}
