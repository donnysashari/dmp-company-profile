'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

declare global {
  interface Window {
    pageTransition?: {
      to: (href: string) => void;
    };
  }
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleTransitionTo = (href: string) => {
    console.log('🚀 Attempting transition to:', href)
    if (typeof window !== 'undefined' && window.pageTransition) {
      console.log('✅ Using pageTransition.to()')
      window.pageTransition.to(href)
    } else {
      console.log('❌ pageTransition not found, using fallback')
      window.location.href = href
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-[100px] overflow-hidden transition-all duration-300 ${
      isScrolled ? 'bg-white/20 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
    }`}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-0 pointer-events-none">
        <Image
          src="/grid-pattern.svg"
          alt="Grid Pattern Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-20 h-full relative z-10">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center"
            onClick={(e) => { e.preventDefault(); handleTransitionTo('/') }}
          >
            <Image
              src="/api/media/file/Logo-DigitalMahadataPrima.png"
              alt="Digital Mahadata Prima"
              width={120}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* HOME */}
            <Link 
              href="/" 
              className="flex items-center gap-[5px] h-16 justify-center relative group"
              onClick={(e) => { e.preventDefault(); handleTransitionTo('/') }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM0.8 8C0.8 11.9764 4.02355 15.2 8 15.2C11.9764 15.2 15.2 11.9764 15.2 8C15.2 4.02355 11.9764 0.8 8 0.8C4.02355 0.8 0.8 4.02355 0.8 8Z" fill="black"/>
              </svg>
              <span className="font-plus-jakarta text-xs font-normal text-[#4C5C6E]">BERANDA</span>
              
              {/* Hover Circle Background */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#2082BE] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 pointer-events-none"></div>
            </Link>

            {/* PORTOFOLIO */}
            <Link 
              href="/portfolio" 
              className="flex items-center gap-[5px] h-16 justify-center relative group"
              onClick={(e) => { e.preventDefault(); handleTransitionTo('/portfolio') }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM0.8 8C0.8 11.9764 4.02355 15.2 8 15.2C11.9764 15.2 15.2 11.9764 15.2 8C15.2 4.02355 11.9764 0.8 8 0.8C4.02355 0.8 0.8 4.02355 0.8 8Z" fill="black"/>
              </svg>
              <span className="font-plus-jakarta text-xs font-normal text-[#4C5C6E]">PORTOFOLIO</span>
              
              {/* Hover Circle Background */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#2082BE] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 pointer-events-none"></div>
            </Link>

            {/* ABOUT */}
            <Link 
              href="/about" 
              className="flex items-center gap-[5px] h-16 justify-center relative group"
              onClick={(e) => { e.preventDefault(); handleTransitionTo('/about') }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM0.8 8C0.8 11.9764 4.02355 15.2 8 15.2C11.9764 15.2 15.2 11.9764 15.2 8C15.2 4.02355 11.9764 0.8 8 0.8C4.02355 0.8 0.8 4.02355 0.8 8Z" fill="black"/>
              </svg>
              <span className="font-plus-jakarta text-xs font-normal text-[#4C5C6E]">TENTANG</span>
              
              {/* Hover Circle Background */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#2082BE] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 pointer-events-none"></div>
            </Link>

            {/* CONTACT */}
            <Link 
              href="/contact" 
              className="flex items-center gap-[5px] h-16 justify-center relative group"
              onClick={(e) => { e.preventDefault(); handleTransitionTo('/contact') }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM0.8 8C0.8 11.9764 4.02355 15.2 8 15.2C11.9764 15.2 15.2 11.9764 15.2 8C15.2 4.02355 11.9764 0.8 8 0.8C4.02355 0.8 0.8 4.02355 0.8 8Z" fill="black"/>
              </svg>
              <span className="font-plus-jakarta text-xs font-normal text-[#4C5C6E]">KONTAK</span>
              
              {/* Hover Circle Background */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#2082BE] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 pointer-events-none"></div>
            </Link>
          </nav>

          {/* Right Section: Language + Contact Button */}
          <div className="hidden lg:flex items-center gap-[31px]">
            {/* Language Selector */}
            <button className="flex items-center justify-center w-[52px] h-[52px] rounded-full hover:bg-gray-50 transition-colors">
              <span className="font-plus-jakarta text-base font-normal text-[#4C5C6E]">ID</span>
            </button>

            {/* Contact Button */}
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center gap-[10px] px-5 py-4 rounded-[100px] bg-gradient-to-br from-[#9FD4FF] to-[#47A6F1] shadow-[0_5px_5px_0_rgba(32,130,190,0.1),0_-5px_5px_0_rgba(255,255,255,0.1)_inset,0_5px_5px_1px_rgba(255,255,255,0.1)_inset] h-[52px] transition-transform hover:scale-105"
              onClick={(e) => { e.preventDefault(); handleTransitionTo('/contact') }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1 4C1 3.44772 1.44772 3 2 3H18C18.5523 3 19 3.44772 19 4V16C19 16.5523 18.5523 17 18 17H2C1.44772 17 1 16.5523 1 16V4ZM2 5.41421L10 9.41421L18 5.41421V4H2V5.41421ZM2 16V7.58579L7.29289 10.2929C8.06863 10.6886 11.9314 10.6886 12.7071 10.2929L18 7.58579V16H2Z" fill="white"/>
              </svg>
              <span className="font-plus-jakarta text-base font-medium text-white">Kontak Kami</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-6 h-6 flex flex-col justify-center items-center z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : 'translate-y-[-4px]'}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-[4px]'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed left-0 right-0 top-25 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg z-40 transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible max-h-screen' : 'opacity-0 invisible max-h-0'
      } overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-5 md:px-20">
          <nav className="flex flex-col py-8">
            <Link href="/" className="py-4 text-gray-700 text-lg hover:text-blue-600 transition-colors" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleTransitionTo('/') }}>
              Beranda
            </Link>
            <Link href="/portfolio" className="py-4 text-gray-700 text-lg hover:text-blue-600 transition-colors" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleTransitionTo('/portfolio') }}>
              Portofolio
            </Link>
            <Link href="/about" className="py-4 text-gray-700 text-lg hover:text-blue-600 transition-colors" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleTransitionTo('/about') }}>
              Tentang
            </Link>
            <Link href="/services" className="py-4 text-gray-700 text-lg hover:text-blue-600 transition-colors" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleTransitionTo('/services') }}>
              Layanan
            </Link>
            <Link href="/contact" className="py-4 text-gray-700 text-lg hover:text-blue-600 transition-colors" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleTransitionTo('/contact') }}>
              Kontak
            </Link>
            
            <div className="py-4">
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white w-full transition-all duration-300"
                onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleTransitionTo('/contact') }}
              >
                <span className="text-base font-medium">Kontak Kami</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
