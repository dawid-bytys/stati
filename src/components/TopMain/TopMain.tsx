import { ScrollView, StyleSheet } from 'react-native';

import { ArtistTile } from './ArtistTile';
import { AlbumTile } from './AlbumTile';
import { TrackTile } from './TrackTile';

interface TopMainProps {
  currentContent: string;
  currentPeriod: string;
}

const topArtists = [
  {
    image: 'https://i.scdn.co/image/ab6761610000f178504ff11d788162fbf8078654',
    artist: 'Playboi Carti',
    plays: 100,
  },
  {
    image: 'https://i.scdn.co/image/ab676161000051741234d2f516796badbdf16a89',
    artist: 'Lil Uzi Vert',
    plays: 90,
  },
  {
    image: 'https://i.scdn.co/image/ab6761610000517419c2790744c792d05570bb71',
    artist: 'Travis Scott',
    plays: 80,
  },
  {
    image: 'https://i.scdn.co/image/ab67616100005174867008a971fae0f4d913f63a',
    artist: 'Kanye West',
    plays: 70,
  },
];

const topAlbums = [
  {
    image: 'https://i.scdn.co/image/ab67616d00001e0298ea0e689c91f8fea726d9bb',
    album: 'Whole Lotta Red',
    artist: 'Playboi Carti',
    plays: 100,
  },
  {
    image: 'https://i.scdn.co/image/ab67616d00001e02d5f1bbe527fa685633339add',
    album: 'Eternal Atake',
    artist: 'Lil Uzi Vert',
    plays: 90,
  },
  {
    image: 'https://i.scdn.co/image/ab67616d00001e02072e9faef2ef7b6db63834a3',
    artist: 'Travis Scott',
    album: 'ASTROWORLD',
    plays: 80,
  },
  {
    image: 'https://i.scdn.co/image/ab67616d00001e02cad190f1a73c024e5a40dddd',
    artist: 'Kanye West',
    album: 'Donda',
    plays: 70,
  },
];

const topTracks = [
  {
    image: 'https://i.scdn.co/image/ab67616d00001e0298ea0e689c91f8fea726d9bb',
    artist: 'Playboi Carti',
    title: 'Sky',
    plays: 100,
  },
  {
    image: 'https://i.scdn.co/image/ab67616d00001e02d5f1bbe527fa685633339add',
    artist: 'Lil Uzi Vert',
    title: 'Baby Pluto',
    plays: 90,
  },
  {
    image: 'https://i.scdn.co/image/ab67616d00001e02072e9faef2ef7b6db63834a3',
    artist: 'Travis Scott',
    title: 'SICKO MODE',
    plays: 80,
  },
  {
    image: 'https://i.scdn.co/image/ab67616d00001e02cad190f1a73c024e5a40dddd',
    artist: 'Kanye West',
    title: 'Hurricane',
    plays: 70,
  },
];

export function TopMain({ currentContent }: TopMainProps) {
  return (
    <ScrollView
      contentContainerStyle={{
        rowGap: 20,
      }}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      {currentContent === 'artists' &&
        topArtists.map((artist, i) => (
          <ArtistTile
            delay={i * 100}
            rank={i + 1}
            key={i}
            {...artist}
          />
        ))}
      {currentContent === 'albums' &&
        topAlbums.map((album, i) => (
          <AlbumTile
            delay={i * 100}
            rank={i + 1}
            key={i}
            {...album}
          />
        ))}
      {currentContent === 'tracks' &&
        topTracks.map((track, i) => (
          <TrackTile
            delay={i * 100}
            rank={i + 1}
            key={i}
            {...track}
          />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
