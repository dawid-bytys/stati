import { useSafeContext } from './useSafeContext'
import { NotificationContext } from '../context/NotificationContext'

export function useNotificationContext() {
  return useSafeContext(NotificationContext)
}
