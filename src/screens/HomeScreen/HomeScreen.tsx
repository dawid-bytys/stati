import { useEffect, useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import { GreetingSection } from '@/components/GreetingSection/GreetingSection'
import { LatestActivitySection } from '@/components/LatestActivitySection/LatestActivitySection'
import { TopSection } from '@/components/TopSection/TopSection'
import { fetchRecentlyPlayed, fetchTopItems } from '@/domain/spotify'
import { CustomError } from '@/errors'
import { useLoadingContext } from '@/hooks/useLoadingContext'
import { useNotificationContext } from '@/hooks/useNotificationContext'
import { useBoundStore } from '@/store/boundStore'
import { filterRecentlyPlayed, filterArtists, filterTracks } from '@/utils'
import { styles } from './HomeScreen.styles'
import type { TopArtistsResponse, TopTracksResponse } from '@/types/responses'
import type { FilteredRecentlyPlayed, FilteredArtist, FilteredTrack } from '@/types/types'

interface TopData {
  recentlyPlayed: FilteredRecentlyPlayed[]
  topArtists: FilteredArtist[]
  topTracks: FilteredTrack[]
}

export function HomeScreen() {
  const accessToken = useBoundStore((state) => state.accessToken.value)
  const { setNotification } = useNotificationContext()
  const { setIsLoading } = useLoadingContext()
  const [data, setData] = useState<TopData | null>(null)

  useEffect(() => {
    async function handleTopContent() {
      try {
        const topArtists = await fetchTopItems<TopArtistsResponse>(
          accessToken,
          'artists',
          'short_term',
        )
        const topTracks = await fetchTopItems<TopTracksResponse>(
          accessToken,
          'tracks',
          'short_term',
        )
        const recentlyPlayed = await fetchRecentlyPlayed(accessToken)

        setData({
          topArtists: filterArtists(topArtists),
          topTracks: filterTracks(topTracks),
          recentlyPlayed: filterRecentlyPlayed(recentlyPlayed),
        })
        setIsLoading(false)
      } catch (err) {
        if (err instanceof CustomError) {
          setNotification(err.message, 'error')
        } else {
          setNotification('Something went wrong, try reloading the app.', 'error')
        }
      }
    }

    if (!data) {
      handleTopContent()
    }
  }, [data, accessToken, setNotification])

  if (!data) {
    return null
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
  )
}
