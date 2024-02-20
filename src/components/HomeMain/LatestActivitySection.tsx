import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ActivityTile } from './ActivityTile';
import { FilteredRecentlyPlayed } from '@/types';

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

const styles = StyleSheet.create({
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
    width: 50,
  },
  titleText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
  container: {
    flexDirection: 'column',
    paddingBottom: 50,
    marginTop: 40,
  },
  innerLower: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 14,
  },
});
