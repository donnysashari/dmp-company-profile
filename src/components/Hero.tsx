'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.6')
    .from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')

    // Parallax effect for background elements
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroElement = heroRef.current
      
      if (heroElement) {
        gsap.set('.hero-bg-element', {
          y: scrollY * 0.5,
          opacity: 1 - scrollY * 0.002
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="hero-bg-element absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="hero-bg-element absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="hero-bg-element absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzMzMzMzMyIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMSIvPgo8L2c+CjwvZz4KPC9zdmc+')] opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Digital Mahadata
          </span>
          <br />
          <span className="text-white">Prima</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed"
        >
          Empowering businesses through innovative digital solutions, data analytics, 
          and cutting-edge technology for sustainable growth in the digital era.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollTo('#services')}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Explore Services
            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
          
          <button 
            onClick={() => scrollTo('#about')}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            Learn More
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors cursor-pointer">
            <span className="text-sm mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-blue-400/50 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-20 w-6 h-6 bg-purple-400/50 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-indigo-400/50 rounded-full animate-pulse delay-500"></div>
    </section>
  )
}
