import Animated, { FadeInUp } from 'react-native-reanimated';
import { StyleSheet, Image, View, Text } from 'react-native';
import PlaylistIcon from '@/assets/svg/playlist.svg';
import AlbumIcon from '@/assets/svg/album.svg';
import GraphIcon from '@/assets/svg/graph.svg';
import DotIcon from '@/assets/svg/dot.svg';

interface FriendTileProps {
  context: {
    type: string;
    name: string;
  };
  artist: string;
  image: string;
  track: string;
  delay: number;
  name: string;
  time: string;
}

export function FriendTile({ context, artist, image, track, delay, name, time }: FriendTileProps) {
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
        {time === 'now' && (
          <DotIcon
            style={styles.activityDot}
            fill="#0076CB"
            height={12}
            width={12}
          />
        )}
      </View>
      <View style={styles.innerRight}>
        <View style={styles.innerRightUpper}>
          <Text style={styles.username}>{name}</Text>
          {time === 'now' ? (
            <GraphIcon fill="#6A6A6A" />
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
          <Text style={styles.fromText}>{context.name}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  innerRight: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexShrink: 1,
    width: '100%',
  },
  artistName: {
    fontFamily: 'Poppins-SemiBold',
    color: '#6A6A6A',
    flexShrink: 1,
    fontSize: 12,
  },
  username: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    flexShrink: 1,
    fontSize: 15,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    columnGap: 15,
    marginBottom: 50,
    height: 60,
  },
  innerRightMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  innerRightLower: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  trackName: {
    fontFamily: 'Poppins-SemiBold',
    color: '#6A6A6A',
    fontSize: 12,
  },
  fromText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#6A6A6A',
    fontSize: 12,
  },
  innerLeft: {
    justifyContent: 'center',
    alignContent: 'center',
    width: 60,
  },
  whenText: {
    fontFamily: 'Poppins-Bold',
    color: '#6A6A6A',
    fontSize: 12,
  },
  innerRightUpper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  activityDot: {
    position: 'absolute',
    right: 2,
    top: 2,
  },
  image: {
    borderRadius: 50,
    height: 60,
    width: 60,
  },
});
