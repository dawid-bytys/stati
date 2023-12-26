import { StyleSheet, Image, View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface TrackTileProps {
  artist: string;
  track: string;
  image: string;
  delay: number;
  rank: number;
}

export function TrackTile({ artist, track, image, delay, rank }: TrackTileProps) {
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
        <Text
          style={styles.track}
          numberOfLines={1}
        >
          {track}
        </Text>
        <Text
          style={styles.artist}
          numberOfLines={1}
        >
          {artist}
        </Text>
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

const styles = StyleSheet.create({
  container: {
    borderColor: '#2D2D2D',
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    columnGap: 10,
    padding: 10,
    height: 60,
  },
  innerRight: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  artist: {
    fontFamily: 'Poppins-SemiBold',
    color: '#6A6A6A',
    fontSize: 12,
  },
  rank: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'right',
    fontSize: 16,
  },
  innerMiddle: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexShrink: 1,
    flexGrow: 1,
  },
  track: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 14,
  },
  image: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
  },
  innerLeft: {
    height: 40,
    width: 40,
  },
});
