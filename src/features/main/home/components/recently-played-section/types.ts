export interface RecentlyPlayedSectionProps {
  data: {
    track: string;
    artist: string;
    image: string;
    timestampMs: number;
  }[];
}
