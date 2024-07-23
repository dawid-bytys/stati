export interface FriendsActivityResponse {
  friends: Friend[];
}

interface Friend {
  timestamp: number;
  user: User;
  track: Track;
}

interface Track {
  uri: string;
  name: string;
  imageUrl: string;
  album: Album;
  artist: Album;
  context: Context;
}

interface Album {
  uri: string;
  name: string;
}

interface Context {
  uri: string;
  name: string;
  index: number;
}

interface User {
  uri: string;
  name: string;
  imageUrl: string;
}
