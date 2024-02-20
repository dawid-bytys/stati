import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ActivityTile } from './ActivityTile';
import { FilteredRecentlyPlayed } from '@/types';

interface LatestActivityProps {
  recentlyPlayed: FilteredRecentlyPlayed[];
}

export function LatestActivity({ recentlyPlayed }: LatestActivityProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>Latest activity</Text>
      </View>
      <FlatList
        data={recentlyPlayed}
        contentContainerStyle={{ gap: 20 }}
        style={styles.innerLower}
        keyExtractor={({ image, time }) => image + time}
        renderItem={({ item, index }) => (
          <ActivityTile
            {...item}
            delay={index * 100}
          />
        )}
      />
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
  },
});
