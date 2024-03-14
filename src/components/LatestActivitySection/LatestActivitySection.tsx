import { View, Text } from 'react-native';
import { styles } from './LatestActivitySection.styles';
import { ActivityTile } from '../ActivityTile/ActivityTile';
import type { FilteredRecentlyPlayed } from '@/types/types';

interface LatestActivityProps {
  data: FilteredRecentlyPlayed[];
}

export function LatestActivitySection({ data }: LatestActivityProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>Latest activity</Text>
      </View>
      <View style={styles.innerLower}>
        {data.map((item, idx) => (
          <ActivityTile
            {...item}
            key={item.track + idx}
            delay={idx * 100}
          />
        ))}
      </View>
    </View>
  );
}
