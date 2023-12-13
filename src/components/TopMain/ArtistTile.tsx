import { StyleSheet, Image, View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface ArtistTileProps {
  artist: string;
  image: string;
  plays: number;
  delay: number;
  rank: number;
}

export function ArtistTile({ artist, image, plays, delay, rank }: ArtistTileProps) {
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
        <Text style={styles.plays}>{plays} plays</Text>
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
  innerMiddle: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
  },
  plays: {
    fontFamily: 'Poppins-SemiBold',
    color: '#6A6A6A',
    fontSize: 12,
  },
  artist: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 14,
  },
  rank: {
    fontFamily: 'Poppins-SemiBold',
    marginRight: 5,
    fontSize: 16,
  },
  innerRight: {
    justifyContent: 'center',
    alignItems: 'center',
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
