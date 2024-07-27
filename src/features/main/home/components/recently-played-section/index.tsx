import { NotFound } from '@/common/not-found';
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { RecentlyPlayedTile } from '../recently-played-tile';
import { styles } from './styles';
import type { RecentlyPlayedSectionProps } from './types';

export function RecentlyPlayedSection({ data }: RecentlyPlayedSectionProps) {
  const renderData = useCallback(() => {
    if (data.length === 0) {
      return <NotFound iconWidth={100} iconHeight={100} />;
    }

    return data.map(({ track, artist, image, timestampMs }) => (
      <RecentlyPlayedTile key={timestampMs} track={track} artist={artist} image={image} timestampMs={timestampMs} />
    ));
  }, [data]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Recently played</Text>
      <View style={styles.innerWrapper}>{renderData()}</View>
    </View>
  );
}
