export type AuthStackParamList = {
  Welcome: undefined;
};

export type TabNavigatorParamList = {
  Friends: undefined;
  Search: undefined;
  Home: undefined;
  Top: undefined;
};

export type CustomParamList = AuthStackParamList & TabNavigatorParamList;

export interface FriendsActivity {
  friends: Friend[];
}

interface Friend {
  timestamp: number;
  track: Track;
  user: User;
}

interface Track {
  context: Context;
  imageUrl: string;
  artist: Album;
  name: string;
  album: Album;
  uri: string;
}

interface Context {
  index: number;
  name: string;
  uri: string;
}

interface User {
  imageUrl: string;
  name: string;
  uri: string;
}

export interface FilteredFriendActivity {
  context: {
    type: string;
    name: string;
  };
  artist: string;
  image: string;
  track: string;
  name: string;
  time: string;
}

export interface Tokens {
  refreshToken: string;
  accessToken: string;
  creationDate: number;
  expiresIn: number;
}

export interface TopTracks {
  items: TrackItem[];
  offset: number;
  previous: null;
  limit: number;
  total: number;
  href: string;
  next: string;
}

export interface TrackItem {
  external_urls: ExternalUrls;
  available_markets: string[];
  external_ids: ExternalIDS;
  track_number: number;
  disc_number: number;
  duration_ms: number;
  preview_url: string;
  popularity: number;
  artists: Artist[];
  explicit: boolean;
  is_local: boolean;
  href: string;
  name: string;
  type: string;
  album: Album;
  uri: string;
  id: string;
}

export interface Album {
  release_date_precision: string;
  external_urls: ExternalUrls;
  available_markets: string[];
  total_tracks: number;
  album_type: string;
  release_date: Date;
  artists: Artist[];
  images: Image[];
  href: string;
  name: string;
  type: string;
  uri: string;
  id: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  name: string;
  type: string;
  uri: string;
  id: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number;
  width: number;
  url: string;
}

export interface ExternalIDS {
  isrc: string;
}

export interface TopArtists {
  items: ArtistItem[];
  offset: number;
  previous: null;
  limit: number;
  total: number;
  href: string;
  next: string;
}

export interface ArtistItem {
  external_urls: ExternalUrls;
  followers: Followers;
  popularity: number;
  genres: string[];
  images: Image[];
  href: string;
  name: string;
  type: string;
  uri: string;
  id: string;
}

export interface Followers {
  total: number;
  href: null;
}

export interface FilteredTrack {
  artist: string;
  track: string;
  image: string;
}

export interface FilteredArtist {
  artist: string;
  image: string;
}

export interface FilteredRecentlyPlayed {
  artist: string;
  track: string;
  image: string;
  time: string;
}
