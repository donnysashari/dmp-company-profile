'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface PageTransitionProps {
  isActive: boolean
  onComplete?: () => void
}

export default function PageTransition({ isActive, onComplete }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null) // White layer
  const layer2Ref = useRef<HTMLDivElement>(null) // Blue layer
  const layer3Ref = useRef<HTMLDivElement>(null) // Background layer

  useEffect(() => {
    console.log('PageTransition useEffect triggered, isActive:', isActive)
    if (!isActive || !containerRef.current) return

    console.log('Starting page transition animation')
    
    const timeline = gsap.timeline({
      onComplete: () => {
        console.log('Page transition animation complete')
        setTimeout(() => {
          onComplete?.()
        }, 100)
      }
    })

    // Initial state - all layers at bottom
    gsap.set([layer1Ref.current, layer2Ref.current, layer3Ref.current], {
      y: '100%'
    })

    // Show container
    gsap.set(containerRef.current, {
      display: 'flex'
    })

    // Animate layers sliding up with stagger
    timeline
      .to(layer1Ref.current, {
        y: '0%',
        duration: 0.6,
        ease: 'power3.out'
      })
      .to(layer2Ref.current, {
        y: '0%',
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4') // Start 0.4s before previous animation ends
      .to(layer3Ref.current, {
        y: '0%',
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4')
      .to([layer1Ref.current, layer2Ref.current, layer3Ref.current], {
        y: '-100%',
        duration: 0.8,
        ease: 'power3.inOut',
        stagger: 0.1
      }, '+=0.2') // Wait 0.2s then slide up and out

    return () => {
      timeline.kill()
    }
  }, [isActive, onComplete])

  if (!isActive) return null

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none hidden"
      style={{ display: 'none' }}
    >
      {/* Layer 1 - White */}
      <div 
        ref={layer1Ref}
        className="absolute inset-0 bg-white"
        style={{ transform: 'translateY(100%)' }}
      />
      
      {/* Layer 2 - Blue */}
      <div 
        ref={layer2Ref}
        className="absolute inset-0 bg-[#2082BE]"
        style={{ transform: 'translateY(100%)' }}
      />
      
      {/* Layer 3 - Background */}
      <div 
        ref={layer3Ref}
        className="absolute inset-0 bg-[#F8F8F8]"
        style={{ transform: 'translateY(100%)' }}
      />
    </div>
  )
}
