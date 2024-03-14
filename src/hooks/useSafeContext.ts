import { useContext, type Context } from 'react';

export function useSafeContext<T>(context: Context<T>) {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error('Provided context must be used within the proper provider');
  }

  return ctx;
}
