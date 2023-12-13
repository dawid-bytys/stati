import type { FilteredFriendActivity } from '@/types';

import { FriendTile } from './FriendTile';

interface FriendsActivityMainProps {
  data: FilteredFriendActivity[];
}

export function FriendsActivityMain({ data }: FriendsActivityMainProps) {
  return (
    <>
      {data.map(({ context, artist, track, image, name, time }, i) => (
        <FriendTile
          context={context}
          artist={artist}
          delay={i * 100}
          image={image}
          track={track}
          name={name}
          time={time}
          key={i}
        />
      ))}
    </>
  );
}
