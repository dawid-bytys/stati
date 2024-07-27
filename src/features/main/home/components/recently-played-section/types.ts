export interface RecentlyPlayedSectionProps {
  data: {
    track: string;
    artist: string;
    image: string;
    link: string;
    timestampMs: number;
  }[];
}
