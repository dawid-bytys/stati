import { useEffect, useState } from 'react'
import { useBoundStore } from '@/store/boundStore'

export function useAuthHydration() {
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const unsubHydrate = useBoundStore.persist.onHydrate(() => setHasHydrated(false))
    const unsubFinishHydration = useBoundStore.persist.onFinishHydration(() => setHasHydrated(true))

    setHasHydrated(useBoundStore.persist.hasHydrated())

    return () => {
      unsubHydrate()
      unsubFinishHydration()
    }
  }, [])

  return hasHydrated
}
