import { Loading } from '@/common/loading';
import { useStore } from '@/store/store';
import type { PropsWithChildren } from 'react';

export function LoadingOverlayProvider({ children }: PropsWithChildren) {
  const store = useStore();

  return (
    <>
      {store.isLoading && <Loading absolute withPaddingTop={false} />}
      {children}
    </>
  );
}
