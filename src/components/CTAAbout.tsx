'use client'

import { useEffect, useRef } from 'react'
import { AnimationManager } from '@/lib/animation-utils'
import Link from 'next/link'

export default function CTAAbout() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const componentId = 'cta-about-animations'
    const section = sectionRef.current
    const content = contentRef.current

    if (section && content) {
      // Initialize element with hidden state
      AnimationManager.animateElement(content, { opacity: 0, x: -50 })

      // Create timeline with scroll trigger
      const tl = AnimationManager.createTimeline(componentId, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      if (tl) {
        tl.to(content, { 
          opacity: 1, 
          x: 0, 
          duration: 1, 
          ease: 'power3.out' 
        })
      }
    }

    // Cleanup function
    return () => {
      AnimationManager.cleanup(componentId)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-10 md:py-16 lg:py-20 bg-[#F8F8F8]">
      <div className="container mx-auto px-5 md:px-20">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#2082BE] via-[#2082BE] to-white">
          {/* Background Images */}
          <div className="absolute inset-0">
            {/* Base blue texture image */}
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/965c2d669729f638b70122d5b595b65ce5033d16?width=2564"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ mixBlendMode: 'soft-light' }}
            />
            
            {/* Telecommunications worker image */}
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/0c5979e84a6bbf41edc3d77b4442ec1e5d01ff4a?width=1088"
              alt="Digital transformation"
              className="absolute right-0 top-0 w-full md:w-1/2 lg:w-[544px] h-full object-cover"
              style={{ mixBlendMode: 'darken' }}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between min-h-[400px] md:min-h-[480px]">
            {/* Text Content */}
            <div ref={contentRef} className="w-full md:w-1/2 lg:w-auto max-w-[507px] p-8 md:p-10 lg:p-12 space-y-6 md:space-y-10">
              {/* Heading */}
              <h2 className="text-white font-figtree text-2xl md:text-3xl lg:text-[32px] font-normal leading-tight">
                Percepat Transformasi Digital Anda bersama Kami
              </h2>

              {/* Description */}
              <p className="text-white font-plus-jakarta text-sm md:text-base font-light leading-relaxed text-justify">
                Sejak tahun 2020, Digital Mahadata Prima telah berkomitmen untuk menghadirkan solusi TIK inovatif — mulai dari AI, RPA, LMS, hingga perangkat lunak khusus — membantu bisnis, pemerintah, dan lembaga pendidikan berkembang di era Industri 4.0.
              </p>

              {/* CTA Button */}
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-transparent bg-gradient-to-br from-[#9FD4FF] to-[#47A6F1] text-white font-plus-jakarta text-base font-medium hover:scale-105 transition-transform duration-300"
                style={{
                  boxShadow: '0 21px 32px 0 rgba(32, 130, 190, 0.21), 0 -24px 32px 0 rgba(255, 255, 255, 0.22) inset, 0 8px 24px 4px rgba(255, 255, 255, 0.25) inset'
                }}
              >
                Tentang Kami
              </Link>
            </div>

            {/* Decorative SVG Rings - Hidden on mobile, visible on larger screens */}
            <div className="hidden lg:block absolute bottom-0 right-0 lg:right-16 pointer-events-none">
              <svg width="331" height="111" viewBox="0 0 331 111" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="paint0_cta" x1="55.2326" y1="0" x2="99.4186" y2="81.1919" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="0.625" stopColor="black" stopOpacity="0"/>
                    <stop offset="1" stopColor="white"/>
                  </linearGradient>
                  <linearGradient id="paint1_cta" x1="98.314" y1="17.6744" x2="4.4186" y2="90.5814" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="0.615385" stopColor="black" stopOpacity="0"/>
                    <stop offset="1" stopColor="#FFF5F5"/>
                  </linearGradient>
                  <linearGradient id="paint2_cta" x1="275.233" y1="0" x2="319.419" y2="81.1919" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="0.625" stopColor="black" stopOpacity="0"/>
                    <stop offset="1" stopColor="white"/>
                  </linearGradient>
                  <linearGradient id="paint3_cta" x1="318.314" y1="17.6744" x2="224.419" y2="90.5814" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="0.615385" stopColor="black" stopOpacity="0"/>
                    <stop offset="1" stopColor="#FFF5F5"/>
                  </linearGradient>
                  <linearGradient id="paint4_cta" x1="165.233" y1="0" x2="209.419" y2="81.1919" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="0.625" stopColor="black" stopOpacity="0"/>
                    <stop offset="1" stopColor="white"/>
                  </linearGradient>
                  <linearGradient id="paint5_cta" x1="208.314" y1="17.6744" x2="114.419" y2="90.5814" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="0.615385" stopColor="black" stopOpacity="0"/>
                    <stop offset="1" stopColor="#FFF5F5"/>
                  </linearGradient>
                </defs>

                {/* Ring 1 */}
                <mask id="mask1_cta" fill="white">
                  <path d="M110.465 55.2326C110.465 85.7367 85.7367 110.465 55.2326 110.465C24.7285 110.465 0 85.7367 0 55.2326C0 24.7285 24.7285 0 55.2326 0C85.7367 0 110.465 24.7285 110.465 55.2326ZM27.9464 55.2326C27.9464 70.3023 40.1628 82.5188 55.2326 82.5188C70.3023 82.5188 82.5188 70.3023 82.5188 55.2326C82.5188 40.1628 70.3023 27.9464 55.2326 27.9464C40.1628 27.9464 27.9464 40.1628 27.9464 55.2326Z"/>
                </mask>
                <path 
                  d="M110.465 55.2326C110.465 85.7367 85.7367 110.465 55.2326 110.465C24.7285 110.465 0 85.7367 0 55.2326C0 24.7285 24.7285 0 55.2326 0C85.7367 0 110.465 24.7285 110.465 55.2326ZM27.9464 55.2326C27.9464 70.3023 40.1628 82.5188 55.2326 82.5188C70.3023 82.5188 82.5188 70.3023 82.5188 55.2326C82.5188 40.1628 70.3023 27.9464 55.2326 27.9464C40.1628 27.9464 27.9464 40.1628 27.9464 55.2326Z" 
                  fill="url(#paint0_cta)" 
                  fillOpacity="0.3" 
                  style={{ mixBlendMode: 'overlay' }}
                />
                <path 
                  d="M110.465 55.2326C110.465 85.7367 85.7367 110.465 55.2326 110.465C24.7285 110.465 0 85.7367 0 55.2326C0 24.7285 24.7285 0 55.2326 0C85.7367 0 110.465 24.7285 110.465 55.2326ZM27.9464 55.2326C27.9464 70.3023 40.1628 82.5188 55.2326 82.5188C70.3023 82.5188 82.5188 70.3023 82.5188 55.2326C82.5188 40.1628 70.3023 27.9464 55.2326 27.9464C40.1628 27.9464 27.9464 40.1628 27.9464 55.2326Z" 
                  stroke="url(#paint1_cta)" 
                  strokeOpacity="0.3" 
                  strokeWidth="2" 
                  style={{ mixBlendMode: 'overlay' }}
                  mask="url(#mask1_cta)"
                />

                {/* Ring 2 */}
                <mask id="mask2_cta" fill="white">
                  <path d="M330.465 55.2326C330.465 85.7367 305.737 110.465 275.233 110.465C244.728 110.465 220 85.7367 220 55.2326C220 24.7285 244.728 0 275.233 0C305.737 0 330.465 24.7285 330.465 55.2326ZM247.946 55.2326C247.946 70.3023 260.163 82.5188 275.233 82.5188C290.302 82.5188 302.519 70.3023 302.519 55.2326C302.519 40.1628 290.302 27.9464 275.233 27.9464C260.163 27.9464 247.946 40.1628 247.946 55.2326Z"/>
                </mask>
                <path 
                  d="M330.465 55.2326C330.465 85.7367 305.737 110.465 275.233 110.465C244.728 110.465 220 85.7367 220 55.2326C220 24.7285 244.728 0 275.233 0C305.737 0 330.465 24.7285 330.465 55.2326ZM247.946 55.2326C247.946 70.3023 260.163 82.5188 275.233 82.5188C290.302 82.5188 302.519 70.3023 302.519 55.2326C302.519 40.1628 290.302 27.9464 275.233 27.9464C260.163 27.9464 247.946 40.1628 247.946 55.2326Z" 
                  fill="url(#paint2_cta)" 
                  fillOpacity="0.3" 
                  style={{ mixBlendMode: 'overlay' }}
                />
                <path 
                  d="M330.465 55.2326C330.465 85.7367 305.737 110.465 275.233 110.465C244.728 110.465 220 85.7367 220 55.2326C220 24.7285 244.728 0 275.233 0C305.737 0 330.465 24.7285 330.465 55.2326ZM247.946 55.2326C247.946 70.3023 260.163 82.5188 275.233 82.5188C290.302 82.5188 302.519 70.3023 302.519 55.2326C302.519 40.1628 290.302 27.9464 275.233 27.9464C260.163 27.9464 247.946 40.1628 247.946 55.2326Z" 
                  stroke="url(#paint3_cta)" 
                  strokeOpacity="0.3" 
                  strokeWidth="2" 
                  style={{ mixBlendMode: 'overlay' }}
                  mask="url(#mask2_cta)"
                />

                {/* Ring 3 */}
                <mask id="mask3_cta" fill="white">
                  <path d="M220.465 55.2326C220.465 85.7367 195.737 110.465 165.233 110.465C134.728 110.465 110 85.7367 110 55.2326C110 24.7285 134.728 0 165.233 0C195.737 0 220.465 24.7285 220.465 55.2326ZM137.946 55.2326C137.946 70.3023 150.163 82.5188 165.233 82.5188C180.302 82.5188 192.519 70.3023 192.519 55.2326C192.519 40.1628 180.302 27.9464 165.233 27.9464C150.163 27.9464 137.946 40.1628 137.946 55.2326Z"/>
                </mask>
                <path 
                  d="M220.465 55.2326C220.465 85.7367 195.737 110.465 165.233 110.465C134.728 110.465 110 85.7367 110 55.2326C110 24.7285 134.728 0 165.233 0C195.737 0 220.465 24.7285 220.465 55.2326ZM137.946 55.2326C137.946 70.3023 150.163 82.5188 165.233 82.5188C180.302 82.5188 192.519 70.3023 192.519 55.2326C192.519 40.1628 180.302 27.9464 165.233 27.9464C150.163 27.9464 137.946 40.1628 137.946 55.2326Z" 
                  fill="url(#paint4_cta)" 
                  fillOpacity="0.3" 
                  style={{ mixBlendMode: 'overlay' }}
                />
                <path 
                  d="M220.465 55.2326C220.465 85.7367 195.737 110.465 165.233 110.465C134.728 110.465 110 85.7367 110 55.2326C110 24.7285 134.728 0 165.233 0C195.737 0 220.465 24.7285 220.465 55.2326ZM137.946 55.2326C137.946 70.3023 150.163 82.5188 165.233 82.5188C180.302 82.5188 192.519 70.3023 192.519 55.2326C192.519 40.1628 180.302 27.9464 165.233 27.9464C150.163 27.9464 137.946 40.1628 137.946 55.2326Z" 
                  stroke="url(#paint5_cta)" 
                  strokeOpacity="0.3" 
                  strokeWidth="2" 
                  style={{ mixBlendMode: 'overlay' }}
                  mask="url(#mask3_cta)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
