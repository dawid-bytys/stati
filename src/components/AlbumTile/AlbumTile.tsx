import { Image, View, Text } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { styles } from './AlbumTile.styles'

interface AlbumTileProps {
  artist: string
  album: string
  image: string
  plays: number
  delay: number
  rank: number
}

export function AlbumTile({ artist, album, image, plays, delay, rank }: AlbumTileProps) {
  return (
    <Animated.View
      entering={FadeInUp.delay(delay)}
      style={styles.container}
    >
      <View style={styles.innerLeft}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      </View>
      <View style={styles.innerRight}>
        <View style={styles.innerRightUpper}>
          <Text style={styles.album}>{album}</Text>
          <Text
            style={{
              ...styles.rank,
              color:
                rank === 1
                  ? '#FFD700'
                  : rank === 2
                    ? '#C0C0C0'
                    : rank === 3
                      ? '#CD7F32'
                      : '#6A6A6A',
            }}
          >{`#${rank}`}</Text>
        </View>
        <View style={styles.innerRightLower}>
          <Text style={styles.artist}>{artist}</Text>
          <Text style={styles.plays}>{plays} plays</Text>
        </View>
      </View>
    </Animated.View>
  )
}
