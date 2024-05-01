import { useCallback, useEffect, useState } from 'react'
import { Notification } from '@/components/Notification/Notification'
import { NotificationContext } from '@/context/NotificationContext'
import type { NotificationType } from '@/context/NotificationContext'
import type { PropsWithChildren } from 'react'

export function NotificationContextProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState<string | null>(null)
  const [type, setType] = useState<NotificationType | null>(null)

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 3000)
    }
  }, [message, setMessage, setType])

  const setNotification = useCallback(
    (message: string, type: NotificationType) => {
      setMessage(message)
      setType(type)
    },
    [setMessage, setType],
  )

  return (
    <NotificationContext.Provider value={{ setNotification }}>
      {message && type && (
        <Notification
          message={message}
          type={type}
        />
      )}
      {children}
    </NotificationContext.Provider>
  )
}
