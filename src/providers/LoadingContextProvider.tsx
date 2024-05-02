import { useState } from 'react'
import { Loading } from '@/components/Loading/Loading'
import { LoadingContext } from '@/context/LoadingContext'
import type { PropsWithChildren } from 'react'

export function LoadingContextProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {isLoading && <Loading />}
      {children}
    </LoadingContext.Provider>
  )
}
