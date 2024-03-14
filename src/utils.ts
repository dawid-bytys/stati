import type {
  TopArtistsResponse,
  TopTracksResponse,
  RecentlyPlayedResponse,
  FriendsActivityResponse,
} from './types/responses';
import type {
  FilteredArtist,
  FilteredFriendActivity,
  FilteredRecentlyPlayed,
  FilteredTrack,
} from './types/types';

export function isTokenExpired(createdAt: number) {
  const currentTime = Date.now();
  const tokenExpirationTime = createdAt + 3600;
  return currentTime > tokenExpirationTime;
}

export function isWebAccessTokenExpired(expiresAt: number) {
  return expiresAt < Date.now();
}

export function getGreetingMessages() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return ['Good morning.', 'Ready for the sunshine vibes?'];
  }

  if (currentHour >= 12 && currentHour < 18) {
    return ['Good afternoon.', "Let's chill a bit..."];
  }

  return ['Good evening.', 'How was your day?'];
}

function formatDateString(dateString: string, forFriends: boolean = false) {
  const currentDate = new Date();
  const scrappingDate = new Date(dateString);
  const differenceInSeconds = Math.floor((currentDate.getTime() - scrappingDate.getTime()) / 1000);

  if (forFriends && differenceInSeconds < 900) {
    return 'now';
  }

  if (differenceInSeconds < 120) {
    return 'now';
  }

  if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  }

  if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} hr${hours > 1 ? 's' : ''} ago`;
  }

  const days = Math.floor(differenceInSeconds / 86400);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export function filterArtists(artists: TopArtistsResponse): FilteredArtist[] {
  return artists.items.map((artist) => ({
    id: artist.id,
    image: artist.images.length > 0 ? artist.images[0].url : '',
    artist: artist.name,
  }));
}

export function filterTracks(tracks: TopTracksResponse): FilteredTrack[] {
  return tracks.items.map((track) => ({
    id: track.id,
    image: track.album.images.length > 0 ? track.album.images[0].url : '',
    artist: track.artists[0].name,
    track: track.name,
  }));
}

export function filterRecentlyPlayed(
  recentlyPlayed: RecentlyPlayedResponse,
): FilteredRecentlyPlayed[] {
  return recentlyPlayed.items.map((item) => ({
    image: item.track.album.images.length > 0 ? item.track.album.images[0].url : '',
    time: formatDateString(item.played_at),
    artist: item.track.artists[0].name,
    track: item.track.name,
  }));
}

export function filterFriendsActivity(
  friendsActivity: FriendsActivityResponse,
): FilteredFriendActivity[] {
  const sortedFriendsActivity = friendsActivity.friends.sort((a, b) => b.timestamp - a.timestamp);

  return sortedFriendsActivity.map((friend) => ({
    context: {
      type: friend.track.context.uri.split(':')[1],
      name: friend.track.context.name,
    },
    time: formatDateString(new Date(friend.timestamp).toISOString(), true),
    artist: friend.track.artist.name,
    image: friend.user.imageUrl,
    track: friend.track.name,
    name: friend.user.name,
  }));
}

export function mapPeriodToSpotifyPeriod(period: string) {
  switch (period) {
    case '4 weeks':
      return 'short_term';
    case '6 months':
      return 'medium_term';
    case 'all time':
      return 'long_term';
    default:
      return 'short_term';
  }
}

export function mapContentToScreen(content: string) {
  switch (content) {
    case 'tracks':
      return 'TopTracks';
    case 'artists':
      return 'TopArtists';
    default:
      return 'TopTracks';
  }
}
