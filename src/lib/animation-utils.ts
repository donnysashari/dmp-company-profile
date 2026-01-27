import { gsap } from 'gsap'

/**
 * GSAP Animation Utilities
 * Utility functions to handle common animation patterns and prevent animation bugs
 */

export class AnimationManager {
  private static activeTimelines = new Map<string, gsap.core.Timeline>()
  private static activeIntervals = new Map<string, NodeJS.Timeout>()

  /**
   * Create a managed timeline that automatically cleans up previous instances
   */
  static createTimeline(id: string, config?: gsap.TimelineVars): gsap.core.Timeline {
    // Kill existing timeline with same ID
    this.killTimeline(id)
    
    const timeline = gsap.timeline(config)
    this.activeTimelines.set(id, timeline)
    
    return timeline
  }

  /**
   * Kill a specific timeline
   */
  static killTimeline(id: string): void {
    const timeline = this.activeTimelines.get(id)
    if (timeline) {
      timeline.kill()
      this.activeTimelines.delete(id)
    }
  }

  /**
   * Create a managed interval that automatically cleans up previous instances
   */
  static createInterval(id: string, callback: () => void, delay: number): NodeJS.Timeout {
    // Clear existing interval with same ID
    this.clearInterval(id)
    
    const interval = setInterval(callback, delay)
    this.activeIntervals.set(id, interval)
    
    return interval
  }

  /**
   * Clear a specific interval
   */
  static clearInterval(id: string): void {
    const interval = this.activeIntervals.get(id)
    if (interval) {
      clearInterval(interval)
      this.activeIntervals.delete(id)
    }
  }

  /**
   * Clean up all managed animations and intervals
   */
  static cleanup(id?: string): void {
    if (id) {
      this.killTimeline(id)
      this.clearInterval(id)
    } else {
      // Clean up all
      this.activeTimelines.forEach(timeline => timeline.kill())
      this.activeTimelines.clear()
      
      this.activeIntervals.forEach(interval => clearInterval(interval))
      this.activeIntervals.clear()
    }
  }

  /**
   * Safe element animation with automatic cleanup
   */
  static animateElement(element: HTMLElement | null, props: gsap.TweenVars): gsap.core.Tween | null {
    if (!element) return null
    
    // Kill any existing tweens on this element
    gsap.killTweensOf(element)
    
    // Ensure clean initial state
    gsap.set(element, { clearProps: "transform,opacity" })
    
    return gsap.to(element, props)
  }

  /**
   * Safe text rotation animation
   */
  static rotateText(element: HTMLElement | null, texts: string[], interval: number = 3000, id?: string): void {
    if (!element || texts.length === 0) return
    
    const animationId = id || 'text-rotation'
    let currentIndex = 0
    
    const rotateText = () => {
      if (!element || document.hidden) return
      
      gsap.killTweensOf(element)
      
      gsap.to(element, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          currentIndex = (currentIndex + 1) % texts.length
          if (element) {
            element.textContent = texts[currentIndex]
            gsap.fromTo(element, 
              { opacity: 0, y: 20 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.5, 
                ease: 'power2.inOut',
                clearProps: "transform"
              }
            )
          }
        }
      })
    }
    
    this.createInterval(animationId, rotateText, interval)
  }

  /**
   * Split text animation (similar to SplitText)
   */
  static splitTextAnimation(
    element: HTMLElement | null, 
    config: {
      stagger?: number
      duration?: number
      ease?: string
      yPercent?: number
      delay?: number
    } = {}
  ): gsap.core.Timeline | null {
    if (!element) return null
    
    const {
      stagger = 0.1,
      duration = 1.5,
      ease = "power4.out",
      yPercent = 100,
      delay = 0.5
    } = config
    
    const staticSpans = element.querySelectorAll('span:not([ref])') as NodeListOf<HTMLSpanElement>
    const staticSpanArray = Array.from(staticSpans).filter(span => !span.className.includes('text-[#47A6F1]'))
    
    if (staticSpanArray.length === 0) return null
    
    const tl = gsap.timeline({ delay })
    
    // Set initial state
    gsap.set(staticSpanArray, { 
      yPercent,
      opacity: 0,
      clearProps: "transform"
    })
    
    // Animate
    tl.to(staticSpanArray, {
      duration,
      yPercent: 0,
      opacity: 1,
      ease,
      stagger
    })
    
    return tl
  }

  /**
   * Handle page visibility changes to restart animations
   */
  static handleVisibilityChange(callback: () => void): () => void {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(callback, 100)
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }
}

/**
 * Hook-like utility for React components
 */
export const useGSAPCleanup = (id: string) => {
  return () => {
    AnimationManager.cleanup(id)
  }
}
