import { AuthContext } from '../context/AuthContext';
import { useSafeContext } from './useSafeContext';

export function useAuthContext() {
  return useSafeContext(AuthContext);
}
