import { createContext } from 'react'
import type { AuthStackParamList, Notification } from '@/types/types'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface AuthContext {
  isAuthenticated: boolean
  isAuthenticating: boolean
  getTokens: (navigationRef: NativeStackNavigationProp<AuthStackParamList>) => Promise<void>
  logout: (notification?: Notification) => void
  setIsAuthenticated: (value: boolean) => void
}

export const AuthContext = createContext<AuthContext | undefined>(undefined)
