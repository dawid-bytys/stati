import { useNetInfo } from '@react-native-community/netinfo'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { NoConnectionScreen } from '@/screens/NoConnectionScreen/NoConnectionScreen'
import type { PropsWithChildren } from 'react'

export function InternetConnectionProvider({ children }: PropsWithChildren) {
  const { isConnected } = useNetInfo()

  useEffect(() => {
    if (isConnected === false) {
      SplashScreen.hide()
    }
  }, [isConnected])

  if (isConnected === false) {
    return <NoConnectionScreen />
  }

  return children
}
