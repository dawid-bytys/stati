export interface TopArtists {
  offset: number;
  previous: null;
  items: Item[];
  limit: number;
  total: number;
  href: string;
  next: string;
}

interface Item {
  external_urls: string[];
  followers: string[];
  popularity: number;
  genres: string[];
  images: Image[];
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
