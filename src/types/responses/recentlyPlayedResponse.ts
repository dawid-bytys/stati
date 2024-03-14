export interface RecentlyPlayedResponse {
  href: string;
  limit: number;
  next: string;
  cursors: Cursors;
  total: number;
  items: Item[];
}

interface Cursors {
  after: string;
  before: string;
}

interface Item {
  track: Track;
  played_at: string;
  context: Context;
}

interface Context {
  type: string;
  href: string;
  external_urls: ExternalUrls;
  uri: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Track {
  album: Album;
  artists: TrackArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: Externalids;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: LinkedFrom;
  restrictions: Restrictions;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  artists: AlbumArtist[];
}

interface AlbumArtist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Restrictions {
  reason: string;
}

interface TrackArtist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface Followers {
  href: string;
  total: number;
}

interface Externalids {
  isrc: string;
  ean: string;
  upc: string;
}

interface LinkedFrom {}
