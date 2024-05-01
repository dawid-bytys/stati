import { createContext } from 'react'
import type { AuthStackParamList } from '@/types/types'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface AuthContext {
  isAuthenticated: boolean
  isAuthenticating: boolean
  getTokens: (navigationRef: NativeStackNavigationProp<AuthStackParamList>) => Promise<void>
  logout: (withNotification: boolean) => void
  setIsAuthenticated: (value: boolean) => void
}

export const AuthContext = createContext<AuthContext | undefined>(undefined)
