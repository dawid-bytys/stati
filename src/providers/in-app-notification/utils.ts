export function getNotificationColor(type: 'error' | 'success' | 'warning') {
  switch (type) {
    case 'error':
      return '#FF4D4D';
    case 'success':
      return '#1FDF64';
    case 'warning':
      return '#FFD700';
    default:
      throw new Error('Invalid notification type');
  }
}
