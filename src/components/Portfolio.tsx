'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

interface PortfolioItem {
  id: string
  number: string
  projectName: string
  category: string
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      number: '01',
      projectName: 'MICE UNAIR',
      category: 'AI, FACE RECOGNITION'
    },
    {
      id: '2',
      number: '02',
      projectName: 'SIMKEU POLTEKBANG',
      category: 'PAYMENT SOLUTION'
    },
    {
      id: '3',
      number: '03',
      projectName: 'SPADA INDONESIA',
      category: 'LMS'
    },
    {
      id: '4',
      number: '04',
      projectName: 'ROBODOCS MITRATEL',
      category: 'RPA'
    },
    {
      id: '5',
      number: '05',
      projectName: 'ELAMOS',
      category: 'SOFTWARE DEV.'
    }
  ]

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const items = itemsRef.current

    if (section && header && items) {
      gsap.set([header, '.portfolio-item'], { opacity: 0, y: 30 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.to(header, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out' 
      })
      .to('.portfolio-item', { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'power3.out' 
      }, '-=0.4')
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-5 md:px-20">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16 lg:mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#DEDEDE] bg-white mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.0767 1.3877L11.6317 2.7677L13.0117 3.3227C13.1242 3.3677 13.1992 3.4802 13.1992 3.6002C13.1992 3.7202 13.1242 3.8327 13.0117 3.8777L11.6317 4.43269L11.0767 5.8127C11.0317 5.9252 10.9192 6.0002 10.7992 6.0002C10.6792 6.0002 10.5667 5.9252 10.5217 5.8127L9.96672 4.43269L8.58672 3.8777C8.47422 3.8327 8.39922 3.7202 8.39922 3.6002C8.39922 3.4802 8.47422 3.3677 8.58672 3.3227L9.96672 2.7677L10.5217 1.3877C10.5667 1.2752 10.6792 1.2002 10.7992 1.2002C10.9192 1.2002 11.0317 1.2752 11.0767 1.3877ZM5.35047 3.96395L6.15672 5.8427L8.03547 6.64895C8.25672 6.7427 8.39922 6.9602 8.39922 7.20019C8.39922 7.4402 8.25672 7.65769 8.03547 7.75144L6.15672 8.55769L5.35047 10.4364C5.25672 10.6577 5.03922 10.8002 4.79922 10.8002C4.55922 10.8002 4.34172 10.6577 4.24797 10.4364L3.44172 8.55769L1.56297 7.75144C1.34172 7.65769 1.19922 7.4402 1.19922 7.20019C1.19922 6.9602 1.34172 6.7427 1.56297 6.64895L3.44172 5.8427L4.24797 3.96395C4.34172 3.7427 4.55922 3.6002 4.79922 3.6002C5.03922 3.6002 5.25672 3.7427 5.35047 3.96395ZM18.5992 13.8002C18.8392 13.8002 19.0567 13.9427 19.1505 14.1639L19.9567 16.0427L21.8355 16.8489C22.0567 16.9427 22.1992 17.1602 22.1992 17.4002C22.1992 17.6402 22.0567 17.8577 21.8355 17.9514L19.9567 18.7577L19.1505 20.6364C19.0567 20.8577 18.8392 21.0002 18.5992 21.0002C18.3592 21.0002 18.1417 20.8577 18.048 20.6364L17.2417 18.7577L15.363 17.9514C15.1417 17.8577 14.9992 17.6402 14.9992 17.4002C14.9992 17.1602 15.1417 16.9427 15.363 16.8489L17.2417 16.0427L18.048 14.1639C18.1417 13.9427 18.3592 13.8002 18.5992 13.8002ZM18.4492 2.4002C18.8617 2.4002 19.2592 2.5652 19.5555 2.8577L21.1417 4.44395C21.4342 4.7402 21.5992 5.1377 21.5992 5.5502C21.5992 5.9627 21.4342 6.3602 21.1417 6.65645L17.8342 9.96395L14.0355 6.16519L17.343 2.8577C17.6392 2.5652 18.0367 2.4002 18.4492 2.4002ZM2.85672 17.3439L12.7642 7.43645L16.563 11.2352L6.65547 21.1427C6.35922 21.4352 5.96172 21.6002 5.54922 21.6002C5.13672 21.6002 4.73922 21.4352 4.44297 21.1427L2.85672 19.5564C2.56422 19.2602 2.39922 18.8627 2.39922 18.4502C2.39922 18.0377 2.56422 17.6402 2.85672 17.3439Z" fill="#FFC107"/>
            </svg>
            <span className="text-[#4C5C6E] font-plus-jakarta text-xs">Portofolio Kami</span>
          </div>

          {/* Heading */}
          <h2 className="text-[#4C5C6E] font-figtree text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal mb-5 px-4 leading-tight">
            Solusi Nyata yang Telah Digunakan oleh Berbagai Institusi
          </h2>

          {/* Description */}
          <p className="text-[#4C5C6E] font-plus-jakarta text-sm md:text-base font-light leading-relaxed max-w-[800px] mx-auto px-4">
            Dari kecerdasan buatan dan otomatisasi robotik hingga ekosistem kampus pintar dan sistem pembayaran, DMP telah berhasil menghadirkan berbagai solusi IT. Jelajahi bagaimana proyek-proyek kami di perusahaan, pemerintahan, dan pendidikan telah memberdayakan transformasi digital di berbagai industri.
          </p>
        </div>

        {/* Portfolio Items */}
        <div ref={itemsRef} className="max-w-6xl mx-auto mb-12 md:mb-16">
          {portfolioItems.map((item, index) => (
            <div 
              key={item.id}
              className="portfolio-item border-t border-[#4C5C6E] hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="grid grid-cols-12 gap-4 py-6 md:py-8 px-4 md:px-6">
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className="text-[#4C5C6E] font-figtree text-xl md:text-2xl lg:text-3xl font-normal">
                    {item.number}
                  </span>
                </div>

                {/* Project Name */}
                <div className="col-span-10 md:col-span-6 lg:col-span-7">
                  <h3 className="text-[#4C5C6E] font-figtree text-xl md:text-2xl lg:text-3xl font-normal">
                    {item.projectName}
                  </h3>
                </div>

                {/* Category */}
                <div className="col-span-12 md:col-span-5 lg:col-span-4 md:text-right">
                  <span className="text-[#4C5C6E] font-figtree text-lg md:text-xl lg:text-3xl font-normal">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Bottom border */}
          <div className="border-t border-[#4C5C6E]"></div>
        </div>

        {/* Featured Portfolio Card - MICE UNAIR */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-16">
          <div className="relative rounded-2xl bg-white/20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 md:h-[500px] bg-[#D9D9D9] rounded-l-2xl overflow-hidden">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/25805b85ee9b7ab1a9bb9121e0ef8891b372b99b?width=1016"
                  alt="MICE UNAIR Project"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex items-end p-8 md:p-10 lg:p-12">
                <p className="text-[#4C5C6E] font-plus-jakarta text-sm md:text-base font-light leading-relaxed">
                  Face recognition and object storage solutions that enhance security and data analytics for enterprises in the digital era.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* More Work Button */}
        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-12 py-4 md:px-14 md:py-5 rounded-full bg-[#FFC107] text-[#4C5C6E] font-plus-jakarta text-base font-normal hover:bg-[#FFD54F] hover:scale-105 transition-all duration-300"
          >
            More Work
          </Link>
        </div>
      </div>
    </section>
  )
}
