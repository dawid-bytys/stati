import type { NavigationProp } from '@react-navigation/native';
import type { FilteredArtist, FilteredTrack } from '@/types';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TopTile } from '../TopTile/TopTile';
import { styles } from './TopSection.styles';

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

  function handleNavigation() {
    if (title === 'Top tracks') {
      navigation.navigate('Top', { screen: 'tracks' });
    } else {
      navigation.navigate('Top', { screen: 'artists' });
    }
  }

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

function renderTiles(tracks?: FilteredTrack[], artists?: FilteredArtist[]) {
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
}
