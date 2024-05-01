import { useSafeContext } from './useSafeContext'
import { LoadingContext } from '../context/LoadingContext'

export function useLoadingContext() {
  return useSafeContext(LoadingContext)
}
