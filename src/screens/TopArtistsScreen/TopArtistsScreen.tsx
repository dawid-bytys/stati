import { useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import { ArtistTile } from '@/components/ArtistTile/ArtistTile'
import { Loading } from '@/components/Loading/Loading'
import { fetchTopItems } from '@/domain/spotify'
import { CustomError } from '@/errors'
import { useNotificationContext } from '@/hooks/useNotificationContext'
import { useBoundStore } from '@/store/boundStore'
import { filterArtists } from '@/utils'
import { styles } from './TopArtistsScreen.styles'
import type { TopArtistsResponse } from '@/types/responses'
import type { FilteredArtist } from '@/types/types'
import type { ListRenderItemInfo } from 'react-native'

interface TopArtistsScreenProps {
  route: {
    params: {
      period: 'short_term' | 'medium_term' | 'long_term'
    }
  }
}

export function TopArtistsScreen({ route }: TopArtistsScreenProps) {
  const { period } = route.params
  const [data, setData] = useState<FilteredArtist[] | null>(null)
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

  const renderArtistTile = useCallback(
    ({ item, index }: ListRenderItemInfo<FilteredArtist>) => {
      return (
        <ArtistTile
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
      handleTopArtists(offset)
    }
  }, [offset, isLoading])

  const handleRefresh = useCallback(() => {
    setOffset(0)
    setData(null)
  }, [])

  const handleTopArtists = useCallback(async (offset = 0) => {
    setIsLoading(true)

    try {
      const topArtists = await fetchTopItems<TopArtistsResponse>(
        accessToken,
        'artists',
        period,
        offset,
        10,
      )
      const filteredArtists = filterArtists(topArtists)

      setData((prevData) => {
        if (prevData) {
          return [...prevData, ...filteredArtists]
        }

        return filteredArtists
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
      handleTopArtists()
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
      renderItem={renderArtistTile}
    />
  )
}
