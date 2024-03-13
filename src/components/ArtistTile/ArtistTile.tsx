import { Image, View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { styles } from './ArtistTile.styles';

interface ArtistTileProps {
  artist: string;
  image: string;
  delay: number;
  rank: number;
}

export function ArtistTile({ artist, image, delay, rank }: ArtistTileProps) {
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
      <View style={styles.innerMiddle}>
        <Text style={styles.artist}>{artist}</Text>
      </View>
      <View style={styles.innerRight}>
        <Text
          style={{
            ...styles.rank,
            color:
              rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : '#6A6A6A',
          }}
        >{`#${rank}`}</Text>
      </View>
    </Animated.View>
  );
}
