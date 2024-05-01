import { createContext } from 'react'

export type NotificationType = 'error' | 'success' | 'warning' | null

interface NotificationContext {
  setNotification: (message: string, type: NotificationType) => void
}

export const NotificationContext = createContext<NotificationContext | undefined>(undefined)
