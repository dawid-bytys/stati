export interface TopArtistsResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
  items: ArtistItem[];
}

export interface ArtistItem {
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

interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href: null;
  total: number;
}

interface Image {
  url: string;
  height: number;
  width: number;
}
