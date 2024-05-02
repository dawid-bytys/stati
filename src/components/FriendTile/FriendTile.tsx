import { useMutation } from '@apollo/client'
import { useCallback, useState } from 'react'
import { Image, View, Text, ActionSheetIOS, TouchableOpacity } from 'react-native'
import AlbumIcon from '@/assets/svg/album.svg'
import DotIcon from '@/assets/svg/dot.svg'
import PlaylistIcon from '@/assets/svg/playlist.svg'
import { DELETE_ACTIVITY_MUTATION } from '@/graphql/mutations/deleteActivity'
import { INSERT_ACTIVITY_MUTATION } from '@/graphql/mutations/insertActivity'
import { useNotificationContext } from '@/hooks/useNotificationContext'
import { IS_ANDROID } from '@/platform'
import { styles } from './FriendTile.styles'
import { AnimatedIcon } from '../AnimatedIcon'
import type { InsertActivityMutation, DeleteActivityMutation } from '@/graphql-types/graphql'

interface FriendTileProps {
  context: {
    type: string
    name: string
  }
  artist: string
  image: string
  track: string
  delay: number
  name: string
  time: string
  timestampMs: number
  friendUri: string
  isTracking: boolean
}

export function FriendTile({
  context,
  artist,
  image,
  track,
  name,
  time,
  timestampMs,
  friendUri,
  isTracking,
}: FriendTileProps) {
  const [isAlreadyTracking, setIsAlreadyTracking] = useState(isTracking)
  const { setNotification } = useNotificationContext()
  const [insertActivity] = useMutation<InsertActivityMutation>(INSERT_ACTIVITY_MUTATION, {
    onError() {
      setNotification('Something went wrong, try again!', 'error')
    },
    onCompleted() {
      setNotification(`Started tracking ${name}!`, 'success')
    },
  })
  const [deleteActivity] = useMutation<DeleteActivityMutation>(DELETE_ACTIVITY_MUTATION, {
    onError() {
      setNotification('Something went wrong, try again!', 'error')
    },
    onCompleted() {
      setNotification(`Stopped tracking ${name}!`, 'success')
    },
  })

  const handlePressIOS = useCallback(() => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', isAlreadyTracking ? 'Stop tracking' : 'Start tracking'],
        cancelButtonIndex: 0,
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          if (isAlreadyTracking) {
            await deleteActivity({ variables: { friendUri } })
            setIsAlreadyTracking(false)
          } else {
            await insertActivity({
              variables: {
                friendUri,
                timestampMs,
              },
            })
            setIsAlreadyTracking(true)
          }
        }
      },
    )
  }, [isAlreadyTracking])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => (IS_ANDROID ? console.log('Start/stop tracking') : handlePressIOS())}
    >
      <View style={styles.innerLeft}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
        {time === 'now' && (
          <View style={styles.activityDot}>
            <DotIcon
              fill="#0076CB"
              height={12}
              width={12}
            />
          </View>
        )}
      </View>
      <View style={styles.innerRight}>
        <View style={styles.innerRightUpper}>
          <Text style={styles.username}>{name}</Text>
          {time === 'now' ? (
            <AnimatedIcon
              width={20}
              height={20}
              duration={1400}
              source={require('@/assets/lottie/chart-animation.json')}
            />
          ) : (
            <Text style={styles.whenText}>{time}</Text>
          )}
        </View>
        <View style={styles.innerRightMiddle}>
          <Text
            style={styles.trackName}
            numberOfLines={1}
          >
            {track}
          </Text>
          <DotIcon fill="#6A6A6A" />
          <Text
            style={styles.artistName}
            numberOfLines={1}
          >
            {artist}
          </Text>
        </View>
        <View style={styles.innerRightLower}>
          {context.type === 'album' ? (
            <AlbumIcon
              fill="#6A6A6A"
              width={14}
              height={14}
            />
          ) : (
            <PlaylistIcon
              fill="#6A6A6A"
              width={14}
              height={14}
            />
          )}
          <Text
            style={styles.fromText}
            numberOfLines={1}
          >
            {context.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
