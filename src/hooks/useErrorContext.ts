import { ErrorContext } from '../context/ErrorContext';
import { useSafeContext } from './useSafeContext';

export function useErrorContext() {
  return useSafeContext(ErrorContext);
}
