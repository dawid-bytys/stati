import { View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import Animated, { FadeInLeft } from 'react-native-reanimated'
import { styles } from './TopTile.styles'

interface TopTileProps {
  image: string
  title: string
  delay: number
}

export function TopTile({ image, title, delay }: TopTileProps) {
  return (
    <Animated.View entering={FadeInLeft.delay(delay)}>
      <FastImage
        source={{ uri: image, priority: FastImage.priority.high }}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
    </Animated.View>
  )
}
