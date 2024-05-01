import { useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import { Loading } from '@/components/Loading/Loading'
import { TrackTile } from '@/components/TrackTile/TrackTile'
import { fetchTopItems } from '@/domain/spotify'
import { CustomError } from '@/errors'
import { useNotificationContext } from '@/hooks/useNotificationContext'
import { useBoundStore } from '@/store/boundStore'
import { filterTracks } from '@/utils'
import { styles } from './TopTracksScreen.styles'
import type { TopTracksResponse } from '@/types/responses'
import type { FilteredTrack } from '@/types/types'
import type { ListRenderItemInfo } from 'react-native'

interface TopTracksScreenProps {
  route: {
    params: {
      period: 'short_term' | 'medium_term' | 'long_term'
    }
  }
}

export function TopTracksScreen({ route }: TopTracksScreenProps) {
  const { period } = route.params
  const [data, setData] = useState<FilteredTrack[] | null>(null)
  const accessToken = useBoundStore((state) => state.accessToken.value)
  const { setNotification } = useNotificationContext()
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const renderListFooter = useCallback(() => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="small"
          style={{ marginVertical: 20 }}
        />
      )
    }

    return null
  }, [isLoading])

  const renderTrackTile = useCallback(
    ({ item, index }: ListRenderItemInfo<FilteredTrack>) => {
      return (
        <TrackTile
          {...item}
          key={item.id}
          rank={index + 1}
          delay={(index - offset) * 100}
        />
      )
    },
    [offset],
  )

  const handleLoadMore = useCallback(() => {
    if (data && data.length < 50 && !isLoading) {
      handleTopTracks(offset)
    }
  }, [offset, isLoading])

  const handleRefresh = useCallback(() => {
    setOffset(0)
    setData(null)
  }, [])

  const handleTopTracks = useCallback(async (offset = 0) => {
    setIsLoading(true)

    try {
      const topTracks = await fetchTopItems<TopTracksResponse>(
        accessToken,
        'tracks',
        period,
        offset,
        10,
      )
      const filteredTracks = filterTracks(topTracks)

      setData((prevData) => {
        if (prevData) {
          return [...prevData, ...filteredTracks]
        }

        return filteredTracks
      })

      setOffset((prevOffset) => prevOffset + 10)
    } catch (err) {
      if (err instanceof CustomError) {
        setNotification(err.message, 'error')
      } else {
        setNotification('Something went wrong, try reloading the app.', 'error')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!data) {
      handleTopTracks()
    }
  }, [data])

  if (!data) {
    return <Loading />
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
      ListFooterComponent={renderListFooter}
      data={data}
      keyExtractor={(item, index) => item.artist + index}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        rowGap: 20,
      }}
      renderItem={renderTrackTile}
    />
  )
}
