import { formatDate } from '@/common/utils';
import type { FriendsActivityResponse } from '@/network/responses';

export function mapFriendsActivityData(data: FriendsActivityResponse) {
  const sortedFriendsActivity = data.friends.sort((a, b) => b.timestamp - a.timestamp);

  return sortedFriendsActivity.map((friend) => ({
    friendUri: friend.user.uri,
    name: friend.user.name,
    track: friend.track.name,
    artist: friend.track.artist.name,
    image: friend.user.imageUrl,
    time: formatDate(friend.timestamp, true),
    context: {
      type: friend.track.context.uri.split(':')[1],
      name: friend.track.context.name,
    },
  }));
}
