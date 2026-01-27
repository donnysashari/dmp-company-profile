'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navigateWithTransition = (href: string) => {
    if (href === pathname) return // Don't transition if same page
    
    setIsTransitioning(true)
  }

  const onTransitionComplete = () => {
    setIsTransitioning(false)
  }

  return {
    isTransitioning,
    navigateWithTransition,
    onTransitionComplete
  }
}
