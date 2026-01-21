'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

interface Partner {
  id: string
  filename: string
  alt: string
  url: string
  width: number
  height: number
}

interface OurPartnersProps {
  partners: Partner[]
}

export default function OurPartners({ partners }: OurPartnersProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<GSAPTween | null>(null)

  useEffect(() => {
    if (!containerRef.current || !partners || partners.length === 0) return

    const container = containerRef.current
    const logoItems = container.querySelectorAll('.logo-item')
    
    if (logoItems.length === 0) return

    // Set initial position and create smooth infinite scroll from right to left
    gsap.set(logoItems, { x: `-${200 * partners.length}` })
    
    animationRef.current = gsap.to(logoItems, {
      x: `+=${200 * partners.length}`, // Move by total width of one set (opposite direction)
      duration: 20, // Same speed as clients
      ease: "none",
      repeat: -1,
    })

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [partners])

  if (!partners || partners.length === 0) {
    return null
  }

  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="py-16 lg:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Berkolaborasi dengan mitra terpercaya untuk memberikan solusi teknologi terdepan
          </p>
        </div>

        <div 
          ref={containerRef}
          className="flex items-center gap-16"
          style={{ width: 'max-content' }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="logo-item flex items-center justify-center shrink-0"
              style={{ width: '200px', height: '120px' }}
            >
              <div className="relative w-32 h-20 grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110">
                <Image
                  src={partner.url}
                  alt={partner.alt || 'Partner logo'}
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
