import { NotificationContext } from '../context/NotificationContext';
import { useSafeContext } from './useSafeContext';

export function useNotificationContext() {
  return useSafeContext(NotificationContext);
}
