import { Image, View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import ClockIcon from '@/assets/svg/clock.svg';
import GraphIcon from '@/assets/svg/graph.svg';
import { styles } from './ActivityTile.styles';

interface ActivityTileProps {
  image: string;
  artist: string;
  track: string;
  delay: number;
  time: string;
}

export function ActivityTile({ image, artist, track, delay, time }: ActivityTileProps) {
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
        {time === 'now' ? <GraphIcon fill="#6A6A6A" /> : <ClockIcon fill="#6A6A6A" />}
      </View>
    </Animated.View>
  );
}
