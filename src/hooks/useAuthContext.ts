import { useSafeContext } from './useSafeContext'
import { AuthContext } from '../context/AuthContext'

export function useAuthContext() {
  return useSafeContext(AuthContext)
}
