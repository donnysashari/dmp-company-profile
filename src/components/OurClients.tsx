'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

interface Client {
  id: string
  filename: string
  alt: string
  url: string
  width: number
  height: number
}

interface OurClientsProps {
  clients: Client[]
}

export default function OurClients({ clients }: OurClientsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<GSAPTween | null>(null)

  useEffect(() => {
    if (!containerRef.current || !clients || clients.length === 0) return

    const container = containerRef.current
    const logoItems = container.querySelectorAll('.logo-item')
    
    if (logoItems.length === 0) return

    // Set initial position and create smooth infinite scroll from left to right
    gsap.set(logoItems, { x: 0 })
    
    animationRef.current = gsap.to(logoItems, {
      x: `-=${200 * clients.length}`, // Move by total width of one set
      duration: 20, // Adjust speed as needed
      ease: "none",
      repeat: -1,
    })

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [clients])

  if (!clients || clients.length === 0) {
    return null
  }

  // Duplicate clients for seamless infinite scroll
  const duplicatedClients = [...clients, ...clients]

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Clients
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dipercaya oleh berbagai perusahaan terkemuka untuk solusi teknologi terbaik
          </p>
        </div>

        <div 
          ref={containerRef}
          className="flex items-center gap-16"
          style={{ width: 'max-content' }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="logo-item flex items-center justify-center shrink-0"
              style={{ width: '200px', height: '120px' }}
            >
              <div className="relative w-32 h-20 grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110">
                <Image
                  src={client.url}
                  alt={client.alt || 'Client logo'}
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
