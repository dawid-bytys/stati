import { createContext } from 'react'

interface LoadingContext {
  setIsLoading: (isLoading: boolean) => void
}

export const LoadingContext = createContext<LoadingContext | undefined>(undefined)
