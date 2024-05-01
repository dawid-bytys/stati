import { useLazyQuery, useMutation } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import { RefreshControl, FlatList } from 'react-native'
import { useShallow } from 'zustand/react/shallow'
import { FriendTile } from '@/components/FriendTile/FriendTile'
import { Loading } from '@/components/Loading/Loading'
import { SetCookieMain } from '@/components/SetCookieMain/SetCookieMain'
import { fetchFriendsActivity, fetchWebAccessToken } from '@/domain/spotify'
import { CustomError } from '@/errors'
import { UPSERT_SPOTIFY_AUTH_MUTATION } from '@/graphql/mutations/upsertSpotifyAuth'
import { GET_ACTIVITIES_QUERY } from '@/graphql/queries/getActivities'
import { useNotificationContext } from '@/hooks/useNotificationContext'
import { useBoundStore } from '@/store/boundStore'
import { filterFriendsActivity } from '@/utils'
import { styles } from './FriendsActivityScreen.styles'
import type { GetActivitiesQuery, UpsertNotificationTokenMutation } from '@/graphql-types/graphql'
import type { FilteredFriendActivity } from '@/types/types'
import type { ListRenderItemInfo } from 'react-native'

export function FriendsActivityScreen() {
  const { spdcCookie, webAccessToken, setAuthValue } = useBoundStore(
    useShallow((state) => ({
      spdcCookie: state.spdcCookie,
      webAccessToken: state.webAccessToken.value,
      setAuthValue: state.setAuthValue,
    })),
  )
  const [friendsActivity, setFriendsActivity] = useState<FilteredFriendActivity[] | null>(null)
  const { setNotification } = useNotificationContext()
  const [upsertSpotifyAuth] = useMutation<UpsertNotificationTokenMutation>(
    UPSERT_SPOTIFY_AUTH_MUTATION,
  )
  const [getActivities, { data: trackedActivities }] =
    useLazyQuery<GetActivitiesQuery>(GET_ACTIVITIES_QUERY)

  useEffect(() => {
    async function handleWebAccessToken() {
      try {
        const { accessToken, accessTokenExpirationTimestampMs } =
          await fetchWebAccessToken(spdcCookie)

        await upsertSpotifyAuth({
          variables: {
            spdcCookie,
            accessToken,
            accessTokenExpirationTimestampMs,
          },
        })
        await getActivities()

        setAuthValue('webAccessToken', {
          value: accessToken,
          expiresAt: accessTokenExpirationTimestampMs,
        })
      } catch (err) {
        if (err instanceof CustomError) {
          setNotification(err.message, 'error')
          setAuthValue('spdcCookie', '')
        } else {
          setNotification('Something went wrong, try reloading the app.', 'error')
        }
      }
    }

    if (spdcCookie && !webAccessToken) {
      handleWebAccessToken()
    }
  }, [spdcCookie, webAccessToken])

  useEffect(() => {
    async function handleFriendsActivity() {
      try {
        const friendsActivity = await fetchFriendsActivity(webAccessToken)
        await getActivities()
        const filteredFriendsActivity = filterFriendsActivity(friendsActivity)
        setFriendsActivity(filteredFriendsActivity)
      } catch (err) {
        if (err instanceof CustomError) {
          setNotification(err.message, 'error')
        } else {
          setNotification('Something went wrong, try reloading the app.', 'error')
        }
      }
    }

    if (spdcCookie && webAccessToken && !friendsActivity) {
      handleFriendsActivity()
    }
  }, [spdcCookie, webAccessToken, friendsActivity])

  const renderItem = useCallback(
    (activities: { friendUri: string }[]) => {
      return ({ item, index }: ListRenderItemInfo<FilteredFriendActivity>) => {
        const isTracking = activities.some(({ friendUri }) => friendUri === item.friendUri)

        return (
          <FriendTile
            {...item}
            delay={index * 100}
            isTracking={isTracking}
          />
        )
      }
    },
    [trackedActivities],
  )

  if (!spdcCookie) {
    return <SetCookieMain />
  }

  if (!friendsActivity || trackedActivities === undefined) {
    return <Loading />
  }

  return (
    <FlatList
      style={styles.container}
      data={friendsActivity}
      contentContainerStyle={{ gap: 40, paddingBottom: 55 }}
      keyExtractor={({ name }) => name}
      refreshControl={
        <RefreshControl
          refreshing={friendsActivity === null}
          onRefresh={() => setFriendsActivity(null)}
        />
      }
      renderItem={renderItem(trackedActivities.getActivities)}
    />
  )
}
