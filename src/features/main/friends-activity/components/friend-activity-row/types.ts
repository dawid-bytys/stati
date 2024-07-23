export interface FriendActivityRowProps {
  data: {
    friendUri: string;
    name: string;
    image: string;
    artist: string;
    track: string;
    time: string;
    context: {
      type: string;
      name: string;
    };
  };
}
