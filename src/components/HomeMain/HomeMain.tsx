import type { FilteredRecentlyPlayed, FilteredArtist, FilteredTrack } from '@/types';

import { ScrollView, StyleSheet } from 'react-native';

import { GreetingMessage } from './GreetingMessage';
import { LatestActivity } from './LatestActivity';
import { TopContainer } from './TopContainer';
import { ActivityTile } from './ActivityTile';
import { TopTile } from './TopTile';

interface HomeMainProps {
  data: {
    recentlyPlayed: FilteredRecentlyPlayed[];
    topArtists: FilteredArtist[];
    topTracks: FilteredTrack[];
  };
}

export function HomeMain({ data: { recentlyPlayed, topArtists, topTracks } }: HomeMainProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <GreetingMessage />
      <TopContainer
        title="Top artists"
        delay={100}
      >
        {topArtists.map(({ artist, image }, i) => (
          <TopTile
            delay={i * 100}
            title={artist}
            image={image}
            key={i}
          />
        ))}
      </TopContainer>
      <TopContainer
        title="Top tracks"
        delay={200}
      >
        {topTracks.map(({ track, image }, i) => (
          <TopTile
            delay={i * 100}
            image={image}
            title={track}
            key={i}
          />
        ))}
      </TopContainer>
      <LatestActivity>
        {recentlyPlayed.map(({ artist, image, track, time }, i) => (
          <ActivityTile
            image={image}
            artist={artist}
            delay={i * 100}
            title={track}
            time={time}
            key={i}
          />
        ))}
      </LatestActivity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
  },
});
