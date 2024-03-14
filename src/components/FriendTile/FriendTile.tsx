import { Image, View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import AlbumIcon from '@/assets/svg/album.svg';
import DotIcon from '@/assets/svg/dot.svg';
import PlaylistIcon from '@/assets/svg/playlist.svg';
import { styles } from './FriendTile.styles';
import { AnimatedIcon } from '../AnimatedIcon';

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
    </Animated.View>
  );
}
