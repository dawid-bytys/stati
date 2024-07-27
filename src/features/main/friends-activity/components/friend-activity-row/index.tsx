import { AnimatedIcon } from '@/common/animated-icon';
import { getIcon } from '@/common/icons';
import { memo } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import type { FriendActivityRowProps } from './types';

export const FriendActivityRow = memo(({ data }: FriendActivityRowProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.innerLeftWrapper}>
        <FastImage source={{ uri: data.image }} style={styles.image} />
        {data.time === 'now' && <View style={styles.activityDot}>{getIcon('dot', '#0076CB', 12, 12)}</View>}
      </View>
      <View style={styles.innerRightWrapper}>
        <View style={styles.innerRightUpperWrapper}>
          <Text style={styles.friend}>{data.name}</Text>
          {data.time === 'now' ? (
            <AnimatedIcon width={20} height={20} duration={1400} source={require('@/assets/lottie/listening.json')} />
          ) : (
            <Text style={styles.time}>{data.time}</Text>
          )}
        </View>
        <View style={styles.innerRightMiddleWrapper}>
          <Text style={styles.track} numberOfLines={1}>
            {data.track}
          </Text>
          {getIcon('dot')}
          <Text style={styles.artist} numberOfLines={1}>
            {data.artist}
          </Text>
        </View>
        <View style={styles.innerRightLowerWrapper}>
          {data.context.type === 'album'
            ? getIcon('album')
            : data.context.type === 'playlist'
            ? getIcon('playlist')
            : getIcon('artist')}
          <Text style={styles.context} numberOfLines={1}>
            {data.context.name}
          </Text>
        </View>
      </View>
    </View>
  );
});
