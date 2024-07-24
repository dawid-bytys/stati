import type { TopArtistsResponse, TopTracksResponse, RecentlyPlayedResponse } from '@/network/responses';

export function greetingMessages() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 6 && currentHour < 12) {
    return ['Good morning.', 'Ready for the sunshine vibes?'];
  }

  if (currentHour >= 12 && currentHour < 18) {
    return ['Good afternoon.', "Let's chill a bit..."];
  }

  if (currentHour >= 18 && currentHour <= 23) {
    return ['Good evening.', 'How was your day?'];
  }

  return ['Good night.', 'Have a nice sleep!'];
}

export function mapArtistsData(data: TopArtistsResponse) {
  return data.items.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.images.length ? item.images[0].url : '',
  }));
}

export function mapTracksData(data: TopTracksResponse) {
  return data.items.map((item) => ({
    id: item.id,
    name: `${item.artists[0].name} - ${item.name}`,
    image: item.album.images.length ? item.album.images[0].url : '',
  }));
}

export function mapRecentlyPlayedData(data: RecentlyPlayedResponse) {
  return data.items.map((item) => ({
    track: item.track.name,
    artist: item.track.artists[0].name,
    image: item.track.album.images.length ? item.track.album.images[0].url : '',
    date: item.played_at,
  }));
}
