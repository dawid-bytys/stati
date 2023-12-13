export interface TopTracks {
  offset: number;
  previous: null;
  limit: number;
  total: number;
  items: Item[];
  href: string;
  next: string;
}

interface Item {
  available_markets: string[];
  external_urls: ExternalUrls;
  external_ids: ExternalIDS;
  track_number: number;
  disc_number: number;
  duration_ms: number;
  preview_url: string;
  popularity: number;
  artists: Artist[];
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

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  name: string;
  type: string;
  uri: string;
  id: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  height: number;
  width: number;
  url: string;
}

interface ExternalIDS {
  isrc: string;
}
