'use client'

import Link from 'next/link'

interface VanillaTransitionLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function VanillaTransitionLink({ href, children, className, onClick }: VanillaTransitionLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    console.log('🔗 VanillaTransitionLink clicked, href:', href)
    
    onClick?.() // Call any additional onClick handler
    
    // Use the global pageTransition function
    if (typeof window !== 'undefined' && (window as any).pageTransition) {
      (window as any).pageTransition.to(href)
    } else {
      // Fallback to normal navigation
      window.location.href = href
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
