import { useEffect } from 'react'
import { hide } from 'react-native-bootsplash'
import { useAuthContext } from '@/hooks/useAuthContext'
import { AuthStack } from './AuthStack'
import { Tabs } from './Tabs'

export function Router() {
  const { isAuthenticated, isAuthenticating } = useAuthContext()

  useEffect(() => {
    if (!isAuthenticating) {
      hide({ fade: true })
    }
  }, [isAuthenticating])

  return isAuthenticated ? <Tabs /> : <AuthStack />
}
