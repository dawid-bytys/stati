import { useMutation } from '@apollo/client'
import messaging from '@react-native-firebase/messaging'
import { useEffect, type PropsWithChildren } from 'react'
import { getUniqueIdSync } from 'react-native-device-info'
import { UPSERT_NOTIFICATION_TOKEN_MUTATION } from '@/graphql/mutations/upsertNotificationToken'
import { useBoundStore } from '@/store/boundStore'

export function PushNotificationsProvider({ children }: PropsWithChildren) {
  const gqlAccessToken = useBoundStore((state) => state.gqlAccessToken)
  const [upsertNotificationToken] = useMutation(UPSERT_NOTIFICATION_TOKEN_MUTATION)

  useEffect(() => {
    async function checkPermission() {
      const authorizationStatus = await messaging().hasPermission()

      if (authorizationStatus !== messaging.AuthorizationStatus.AUTHORIZED) {
        await messaging().requestPermission()
      }
    }

    checkPermission()
  }, [])

  useEffect(() => {
    async function requestNotificationTokenAndUpsert() {
      const token = await messaging().getToken()
      const deviceUniqueId = getUniqueIdSync()
      await upsertNotificationToken({ variables: { token, deviceUniqueId } })
    }

    if (gqlAccessToken) {
      requestNotificationTokenAndUpsert()
    }
  }, [gqlAccessToken])

  return children
}
