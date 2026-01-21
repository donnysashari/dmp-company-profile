'use client'

import { useSmoothScroll } from '../hooks/useSmoothScroll'

interface ClientWrapperProps {
  children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  // Initialize smooth scrolling
  useSmoothScroll()
  
  return <>{children}</>
}
