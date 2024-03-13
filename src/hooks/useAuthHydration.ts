import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';

export function useAuthHydration() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const unsubHydrate = useAuthStore.persist.onHydrate(() => setHasHydrated(false));
    const unsubFinishHydration = useAuthStore.persist.onFinishHydration(() => setHasHydrated(true));

    setHasHydrated(useAuthStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hasHydrated;
}
