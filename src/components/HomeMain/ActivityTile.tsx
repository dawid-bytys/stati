import { StyleSheet, Image, View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import ClockIcon from '@/assets/svg/clock.svg';
import GraphIcon from '@/assets/svg/graph.svg';

interface ActivityTileProps {
  imageSrc: string;
  artist: string;
  title: string;
  delay: number;
  time: string;
}

export function ActivityTile({ imageSrc, artist, title, delay, time }: ActivityTileProps) {
  return (
    <Animated.View
      style={{
        ...styles.container,
      }}
      entering={FadeInUp.delay(delay)}
    >
      <Image
        source={{ uri: imageSrc }}
        style={styles.image}
      />
      <View style={styles.song}>
        <Text
          style={styles.titleText}
          numberOfLines={1}
        >
          {title}
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

const styles = StyleSheet.create({
  time: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    marginLeft: 10,
  },
  container: {
    borderColor: '#2D2D2D',
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
    height: 50,
  },
  timeText: {
    fontFamily: 'Poppins-Medium',
    color: '#6A6A6A',
    marginRight: 10,
    fontSize: 12,
  },
  artistText: {
    fontFamily: 'Poppins-Medium',
    color: '#6A6A6A',
    fontSize: 10,
  },
  titleText: {
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: 12,
  },
  song: {
    flexDirection: 'column',
    marginLeft: 10,
    flex: 1,
  },
  image: {
    borderRadius: 5,
    height: 30,
    width: 30,
  },
});
