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

export function HomeMain({ data }: HomeMainProps) {
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
        {data.topArtists.map(({ artist, image }, i) => (
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
        {data.topTracks.map(({ image, track }, i) => (
          <TopTile
            delay={i * 100}
            image={image}
            title={track}
            key={i}
          />
        ))}
      </TopContainer>
      <LatestActivity>
        {data.recentlyPlayed.map(({ artist, image, track, time }, i) => {
          return (
            <ActivityTile
              imageSrc={image}
              artist={artist}
              delay={i * 100}
              title={track}
              time={time}
              key={i}
            />
          );
        })}
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
