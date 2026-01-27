'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from './PageTransitionProvider'

interface TransitionLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function TransitionLink({ href, children, className, onClick }: TransitionLinkProps) {
  const router = useRouter()
  const { startTransition, isTransitioning } = useTransition()

  const handleClick = (e: React.MouseEvent) => {
    console.log('TransitionLink clicked, href:', href)
    e.preventDefault()
    
    if (isTransitioning) {
      console.log('Already transitioning, ignoring click')
      return
    }
    
    onClick?.() // Call any additional onClick handler
    
    console.log('Starting transition...')
    startTransition()
    
    // Navigate during the middle of transition when layers cover the screen
    setTimeout(() => {
      console.log('Navigating to:', href)
      router.push(href)
    }, 800) // Navigate when the blue layer (layer 2) is fully covering
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
