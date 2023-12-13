export interface RecentlyPlayed {
  cursors: Cursors;
  limit: number;
  total: number;
  items: Item[];
  href: string;
  next: string;
}

interface Cursors {
  before: string;
  after: string;
}

interface Item {
  played_at: string;
  context: Context;
  track: Track;
}

interface Context {
  external_urls: ExternalUrls;
  type: string;
  href: string;
  uri: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Track {
  available_markets: string[];
  external_urls: ExternalUrls;
  restrictions: Restrictions;
  external_ids: ExternalIDS;
  linked_from: LinkedFrom;
  artists: TrackArtist[];
  is_playable: boolean;
  track_number: number;
  disc_number: number;
  duration_ms: number;
  preview_url: string;
  popularity: number;
  explicit: boolean;
  is_local: boolean;
  album: Album;
  href: string;
  name: string;
  type: string;
  uri: string;
  id: string;
}

interface Album {
  release_date_precision: string;
  available_markets: string[];
  external_urls: ExternalUrls;
  restrictions: Restrictions;
  artists: AlbumArtist[];
  total_tracks: number;
  release_date: string;
  album_type: string;
  images: Image[];
  href: string;
  name: string;
  type: string;
  uri: string;
  id: string;
}

interface AlbumArtist {
  external_urls: ExternalUrls;
  href: string;
  name: string;
  type: string;
  uri: string;
  id: string;
}

interface Image {
  height: number;
  width: number;
  url: string;
}

interface Restrictions {
  reason: string;
}

interface TrackArtist {
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

interface Followers {
  total: number;
  href: string;
}

interface ExternalIDS {
  isrc: string;
  ean: string;
  upc: string;
}

interface LinkedFrom {}
