import { useCallback } from 'react'
import { Image, View, Text } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import ClockIcon from '@/assets/svg/clock.svg'
import { styles } from './ActivityTile.styles'
import { AnimatedIcon } from '../AnimatedIcon'

interface ActivityTileProps {
  image: string
  artist: string
  track: string
  delay: number
  time: string
}

export function ActivityTile({ image, artist, track, delay, time }: ActivityTileProps) {
  const renderIcon = useCallback(() => {
    if (time === 'now') {
      return (
        <AnimatedIcon
          width={20}
          height={20}
          duration={1400}
          source={require('@/assets/lottie/chart-animation.json')}
        />
      )
    }

    return <ClockIcon fill="#6A6A6A" />
  }, [time])

  return (
    <Animated.View
      style={{
        ...styles.container,
      }}
      entering={FadeInUp.delay(delay)}
    >
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
      <View style={styles.song}>
        <Text
          style={styles.titleText}
          numberOfLines={1}
        >
          {track}
        </Text>
        <Text
          style={styles.artistText}
          numberOfLines={1}
        >
          {artist}
        </Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.timeText}>{time}</Text>
        {renderIcon()}
      </View>
    </Animated.View>
  )
}
