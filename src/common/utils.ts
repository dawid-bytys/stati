export function formatDate(timestampMs: number, forFriends = false) {
  const currentDate = new Date();
  const differenceInSeconds = Math.floor((currentDate.getTime() - timestampMs) / 1000);

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

export function rankColor(rank: number) {
  switch (rank) {
    case 1:
      return '#FFD700';
    case 2:
      return '#C0C0C0';
    case 3:
      return '#CD7F32';
    default:
      return '#6A6A6A';
  }
}
