'use client'

import Link from 'next/link'
import { pageTransitionTo } from '@/hooks/useSimpleTransition'

interface SimpleTransitionLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function SimpleTransitionLink({ href, children, className, onClick }: SimpleTransitionLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    console.log('🔗 SimpleTransitionLink clicked, href:', href)
    
    onClick?.() // Call any additional onClick handler
    
    pageTransitionTo(href)
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
