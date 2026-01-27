'use client'

import { useEffect, useRef } from 'react'
import { AnimationManager } from '@/lib/animation-utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  showBackButton?: boolean
}

export default function PageHeader({ 
  title, 
  subtitle, 
  breadcrumbs = [], 
  showBackButton = true 
}: PageHeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const componentId = 'page-header-animations'
    
    // Set initial states
    if (titleRef.current) {
      AnimationManager.animateElement(titleRef.current, { y: 50, opacity: 0 })
    }
    if (subtitleRef.current) {
      AnimationManager.animateElement(subtitleRef.current, { y: 30, opacity: 0 })
    }
    if (breadcrumbRef.current) {
      AnimationManager.animateElement(breadcrumbRef.current, { y: 20, opacity: 0 })
    }
    
    // Create timeline
    const tl = AnimationManager.createTimeline(`${componentId}-entry`, { delay: 0.5 })
    
    if (tl) {
      // Animate breadcrumb first
      if (breadcrumbRef.current) {
        tl.to(breadcrumbRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        })
      }
      
      // Then animate title
      if (titleRef.current) {
        tl.to(titleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out'
        }, '-=0.6')
      }
      
      // Finally animate subtitle
      if (subtitleRef.current) {
        tl.to(subtitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out'
        }, '-=0.8')
      }
    }

    return () => {
      AnimationManager.cleanup(componentId)
    }
  }, [])

  const handleBackClick = () => {
    router.back()
  }

  return (
    <section 
      ref={headerRef}
      className="relative pt-[100px] pb-20 overflow-hidden bg-[#F8F8F8]"
    >
      {/* Grid Dot Background with Gradient Transparency */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #3094D6 2px, transparent 2px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0',
            mask: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%)',
            WebkitMask: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%)'
          }}
        />
      </div>

      {/* Large Blurred Circles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Circle 1 - 700px */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '700px',
            height: '700px',
            background: '#3094D6',
            filter: 'blur(200px)',
            opacity: 0.15,
            top: '10%',
            right: '15%',
            transform: 'translate(50%, -30%)'
          }}
        />
        
        {/* Circle 2 - 500px */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            background: '#2082BE',
            filter: 'blur(200px)',
            opacity: 0.2,
            bottom: '20%',
            left: '10%',
            transform: 'translate(-30%, 50%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-20">
        <div className="flex flex-col items-start gap-5 pt-10">
          {/* Back Button and Breadcrumb */}
          <div 
            ref={breadcrumbRef}
            className="flex items-center gap-4"
          >
            {showBackButton && (
              <button
                onClick={handleBackClick}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#DEDEDE] hover:bg-gray-50 transition-colors duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M12 19L5 12L12 5" stroke="#4C5C6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            
            {/* Breadcrumb */}
            {breadcrumbs.length > 0 && (
              <nav className="flex items-center space-x-2 text-sm text-[#4C5C6E]">
                <Link href="/" className="hover:text-[#3094D6] transition-colors">
                  Beranda
                </Link>
                {breadcrumbs.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item.href && index < breadcrumbs.length - 1 ? (
                      <Link href={item.href} className="hover:text-[#3094D6] transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-[#3094D6]">{item.label}</span>
                    )}
                  </div>
                ))}
              </nav>
            )}
          </div>

          {/* Main Heading - Left Aligned */}
          <h1 
            ref={titleRef}
            className="font-figtree text-4xl md:text-[56px] font-semibold leading-tight text-left text-[#4C5C6E] max-w-4xl"
          >
            {title}
          </h1>

          {/* Subtitle - Left Aligned */}
          {subtitle && (
            <p 
              ref={subtitleRef}
              className="font-plus-jakarta text-base md:text-lg font-normal max-w-3xl leading-[150%] text-left text-[#4C5C6E]"
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
