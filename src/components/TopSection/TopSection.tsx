import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './TopSection.styles';
import { TopTile } from '../TopTile/TopTile';
import type { FilteredArtist, FilteredTrack } from '@/types/types';
import type { NavigationProp } from '@react-navigation/native';

interface TopProps {
  title: string;
  tracks?: FilteredTrack[];
  artists?: FilteredArtist[];
}

type NavigationTabsParamList = {
  Top: {
    screen: 'artists' | 'tracks';
  };
};

export function TopSection({ title, tracks, artists }: TopProps) {
  const navigation = useNavigation<NavigationProp<NavigationTabsParamList>>();

  const handleNavigation = useCallback(() => {
    if (tracks) {
      navigation.navigate('Top', { screen: 'tracks' });
    } else if (artists) {
      navigation.navigate('Top', { screen: 'artists' });
    }
  }, [navigation, tracks, artists]);

  const renderTiles = useCallback(
    (tracks?: FilteredTrack[], artists?: FilteredArtist[]) => {
      if (tracks) {
        return tracks.map((item, idx) => (
          <TopTile
            title={item.track}
            image={item.image}
            key={item.image + idx}
            delay={idx * 100}
          />
        ));
      }

      if (artists) {
        return artists.map((item, idx) => (
          <TopTile
            title={item.artist}
            image={item.image}
            key={item.image + idx}
            delay={idx * 100}
          />
        ));
      }

      return null;
    },
    [tracks, artists],
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerUpper}>
        <Text style={styles.titleText}>{title}</Text>
        <TouchableOpacity
          style={styles.redirectBtn}
          onPress={handleNavigation}
        >
          <Text style={styles.redirectBtnText}>see more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerLower}>{renderTiles(tracks, artists)}</View>
    </View>
  );
}
