import { useNetInfo } from '@react-native-community/netinfo'
import React, { useEffect } from 'react'
import { hide } from 'react-native-bootsplash'
import { useLoadingContext } from '@/hooks/useLoadingContext'
import { NoConnectionScreen } from '@/screens/NoConnectionScreen/NoConnectionScreen'
import type { PropsWithChildren } from 'react'

export function InternetConnectionProvider({ children }: PropsWithChildren) {
  const { isConnected } = useNetInfo()
  const { setIsLoading } = useLoadingContext()

  useEffect(() => {
    if (isConnected === false) {
      setIsLoading(true)
      hide({ fade: true })
    }
  }, [isConnected])

  if (isConnected === false) {
    return <NoConnectionScreen />
  }

  return children
}
