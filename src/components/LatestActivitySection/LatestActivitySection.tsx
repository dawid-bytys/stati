import { View, Text } from 'react-native';
import { ActivityTile } from '../ActivityTile/ActivityTile';
import { FilteredRecentlyPlayed } from '@/types';
import { styles } from './LatestActivitySection.styles';

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
