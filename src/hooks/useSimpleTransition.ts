'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'

// Global transition overlay
let overlay: HTMLDivElement | null = null
let isTransitioning = false

export function initializePageTransition() {
  if (typeof window === 'undefined' || overlay) return

  // Create transition overlay
  overlay = document.createElement('div')
  overlay.id = 'page-transition-overlay'
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    pointer-events: none;
    display: none;
  `

  // Create layers
  const layer1 = document.createElement('div')
  layer1.className = 'transition-layer-1'
  layer1.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    transform: translateY(100%);
  `

  const layer2 = document.createElement('div')
  layer2.className = 'transition-layer-2'
  layer2.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #2082BE;
    transform: translateY(100%);
  `

  const layer3 = document.createElement('div')
  layer3.className = 'transition-layer-3'
  layer3.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #F8F8F8;
    transform: translateY(100%);
  `

  overlay.appendChild(layer1)
  overlay.appendChild(layer2)
  overlay.appendChild(layer3)
  document.body.appendChild(overlay)
}

export function pageTransitionTo(href: string) {
  if (isTransitioning || !overlay) return

  console.log('🚀 Starting page transition to:', href)
  isTransitioning = true

  const layers = overlay.children

  // Show overlay
  overlay.style.display = 'block'

  const tl = gsap.timeline({
    onComplete: () => {
      console.log('✅ Transition complete, navigating...')
      
      // Navigate to new page
      window.location.href = href
    }
  })

  // Reset positions
  gsap.set(layers, { y: '100%' })

  // Animate layers
  tl.to(layers[0], { y: '0%', duration: 0.6, ease: 'power3.out' })
    .to(layers[1], { y: '0%', duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .to(layers[2], { y: '0%', duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .to(layers, { y: '-100%', duration: 0.8, ease: 'power3.inOut', stagger: 0.1 }, '+=0.2')
}

export function useSimpleTransition() {
  useEffect(() => {
    initializePageTransition()
  }, [])

  const transitionTo = (href: string) => {
    pageTransitionTo(href)
  }

  return { transitionTo }
}
