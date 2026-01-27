'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import PageTransition from '@/components/PageTransition'

interface TransitionContextType {
  startTransition: () => void
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined)

export const useTransition = () => {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error('useTransition must be used within a PageTransitionProvider')
  }
  return context
}

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = useCallback(() => {
    console.log('PageTransitionProvider: startTransition called')
    setIsTransitioning(true)
  }, [])

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false)
  }, [])

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      <PageTransition 
        isActive={isTransitioning} 
        onComplete={handleTransitionComplete}
      />
      {children}
    </TransitionContext.Provider>
  )
}
