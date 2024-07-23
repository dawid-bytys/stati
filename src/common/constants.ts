import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const TWELVE_HOURS = 43_200_000;
export const THREE_HOURS = 10_800_000;
export const FIVE_MINUTES = 300_000;
export const FIFTEEN_SECONDS = 15_000;
export const THIRTY_MINUTES = 1_800_000;
export const ONE_HOUR = 3_600_000;
export const FIFTY_FIVE_MINUTES = 3_300_000;

export const TOP_ARTISTS_SHORT_TERM = ['topArtists', 'short_term'];
export const TOP_ARTISTS_MEDIUM_TERM = ['topArtists', 'medium_term'];
export const TOP_ARTISTS_LONG_TERM = ['topArtists', 'long_term'];

export const TOP_TRACKS_SHORT_TERM = ['topTracks', 'short_term'];
export const TOP_TRACKS_MEDIUM_TERM = ['topTracks', 'medium_term'];
export const TOP_TRACKS_LONG_TERM = ['topTracks', 'long_term'];

export const RECENTLY_PLAYED = ['recentlyPlayed'];
