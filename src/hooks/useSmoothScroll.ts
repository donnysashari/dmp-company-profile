'use client'

import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis with basic configuration
    lenisRef.current = new Lenis()

    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  const scrollTo = useCallback((target: string | number) => {
    lenisRef.current?.scrollTo(target)
  }, [])

  return { scrollTo }
}
