import { rankColor } from '@/common/utils';
import { Linking, Pressable, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import type { TopRowProps } from './types';

export function TopRow({ image, track, link, artist, rank }: TopRowProps) {
  return (
    <Pressable style={styles.container} onPress={() => Linking.openURL(link)}>
      <View style={styles.innerLeft}>
        <FastImage source={{ uri: image || '' }} style={styles.image} />
      </View>
      <View style={styles.innerMiddle}>
        <Text style={styles.track} numberOfLines={1}>
          {track}
        </Text>
        {artist && (
          <Text style={styles.artist} numberOfLines={1}>
            {artist}
          </Text>
        )}
      </View>
      <View style={styles.innerRight}>
        <Text style={[styles.rank, { color: rankColor(rank) }]}>#{rank}</Text>
      </View>
    </Pressable>
  );
}
