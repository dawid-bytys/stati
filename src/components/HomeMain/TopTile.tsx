import Animated, { FadeInLeft } from 'react-native-reanimated';
import { StyleSheet, Image, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

interface TopTileProps {
  image: string;
  title: string;
  delay: number;
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
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
    fontSize: 10,
    width: 70,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    height: 70,
    width: 70,
  },
  container: {
    flexDirection: 'column',
  },
});
