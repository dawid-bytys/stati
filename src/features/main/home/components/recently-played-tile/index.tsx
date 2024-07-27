import { AnimatedIcon } from '@/common/animated-icon';
import { ClockIcon } from '@/common/svgs';
import { formatDate } from '@/common/utils';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import type { RecentlyPlayedTileProps } from './types';

export function RecentlyPlayedTile({ track, artist, image, timestampMs }: RecentlyPlayedTileProps) {
  const listeningText = formatDate(timestampMs);

  const renderListeningIndicator = () => {
    if (listeningText === 'now') {
      return <AnimatedIcon width={20} height={20} duration={1400} source={require('@/assets/lottie/listening.json')} />;
    }

    return <ClockIcon />;
  };

  return (
    <View style={styles.wrapper}>
      <FastImage style={styles.image} source={{ uri: image }} resizeMode={FastImage.resizeMode.contain} />
      <View style={styles.innerWrapper}>
        <Text style={styles.trackText} numberOfLines={1}>
          {track}
        </Text>
        <Text style={styles.artistText} numberOfLines={1}>
          {artist}
        </Text>
      </View>
      <View style={styles.timeWrapper}>
        <Text style={styles.timeText}>{listeningText}</Text>
        {renderListeningIndicator()}
      </View>
    </View>
  );
}
