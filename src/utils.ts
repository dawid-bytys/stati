import { Buffer } from 'buffer';

import type {
  FilteredRecentlyPlayed,
  FilteredFriendActivity,
  FriendsActivity,
  FilteredArtist,
  FilteredTrack,
  Tokens,
} from './types';
import type { RecentlyPlayed } from './types/activity';
import type { TopArtists } from './types/artists';
import type { TopTracks } from './types/tracks';

export function generateBasicAuthHeader(clientId: string, clientSecret: string) {
  return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
}

export function isTokenExpired(expiresIn: number, creationDate: number) {
  const expirationDate = new Date(creationDate + expiresIn * 1000);
  return expirationDate.getTime() < Date.now();
}

export function parseTokens(tokensString: string): Tokens {
  const tokens = JSON.parse(tokensString);
  tokens.creationDate = Number(tokens.creationDate);
  tokens.expiresIn = Number(tokens.expiresIn);
  return tokens;
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

export function filterArtists(artists: TopArtists): FilteredArtist[] {
  return artists.items.map((artist) => ({
    image: artist.images.length > 0 ? artist.images[0].url : '',
    artist: artist.name,
  }));
}

export function filterTracks(tracks: TopTracks): FilteredTrack[] {
  return tracks.items.map((track) => ({
    image: track.album.images.length > 0 ? track.album.images[0].url : '',
    artist: track.artists[0].name,
    track: track.name,
  }));
}

export function filterRecentlyPlayed(recentlyPlayed: RecentlyPlayed): FilteredRecentlyPlayed[] {
  return recentlyPlayed.items.map((item) => ({
    image: item.track.album.images.length > 0 ? item.track.album.images[0].url : '',
    time: formatDateString(item.played_at),
    artist: item.track.artists[0].name,
    track: item.track.name,
  }));
}

export function filterFriendsActivity(friendsActivity: FriendsActivity): FilteredFriendActivity[] {
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
