import { createContext } from 'react'

interface LoadingContext {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const LoadingContext = createContext<LoadingContext | undefined>(undefined)
