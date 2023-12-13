import { authContext } from '../context/authContext';
import { useSafeContext } from './useSafeContext';

export function useAuthContext() {
  return useSafeContext(authContext);
}
