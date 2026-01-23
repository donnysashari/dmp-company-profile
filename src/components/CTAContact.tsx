'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function CTAContact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current

    if (section && content) {
      gsap.set(content, { opacity: 0, x: -50 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.to(content, { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        ease: 'power3.out' 
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-10 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-5 md:px-20">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#2082BE] via-[#2082BE] to-white">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/0f67eb3f30f2854e460753419482760fdae92a05?width=2992"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              style={{ mixBlendMode: 'overlay' }}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between min-h-[270px] md:min-h-[300px]">
            {/* Text Content */}
            <div ref={contentRef} className="w-full md:w-2/3 lg:w-auto max-w-[667px] p-8 md:p-10 lg:p-12 space-y-5">
              {/* Heading */}
              <h2 className="text-white font-figtree text-2xl md:text-3xl lg:text-[32px] font-normal leading-tight">
                Kami Siap Membantu Bisnis Anda Berkembang Secara Online
              </h2>

              {/* Description */}
              <p className="text-white font-plus-jakarta text-sm md:text-base font-light leading-relaxed">
                Percayakan Mahadata Prima untuk Membangunnya untuk Anda.
              </p>

              {/* CTA Button */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-transparent bg-gradient-to-br from-[#9FD4FF] to-[#47A6F1] text-white font-plus-jakarta text-base font-medium hover:scale-105 transition-transform duration-300"
                style={{
                  boxShadow: '0 21px 32px 0 rgba(32, 130, 190, 0.21), 0 -24px 32px 0 rgba(255, 255, 255, 0.22) inset, 0 8px 24px 4px rgba(255, 255, 255, 0.25) inset'
                }}
              >
                Hubungi Kami
              </Link>
            </div>

            {/* Decorative SVG Rings - Hidden on mobile, visible on larger screens */}
            <div className="hidden lg:block absolute right-0 top-0 pointer-events-none">
              <svg width="190" height="267" viewBox="0 0 190 267" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="paint0_contact" x1="55.2326" y1="0" x2="99.4186" y2="81.1919" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="0.625" stopColor="black" stopOpacity="0"/>
                    <stop offset="1" stopColor="white"/>
                  </linearGradient>
                  <linearGradient id="paint1_contact" x1="98.314" y1="17.6744" x2="4.4186" y2="90.5814" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="0.615385" stopColor="black" stopOpacity="0"/>
                    <stop offset="1" stopColor="#FFF5F5"/>
                  </linearGradient>
                  <linearGradient id="paint2_contact" x1="55.2326" y1="155.756" x2="99.4186" y2="236.948" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="0.625" stopColor="black" stopOpacity="0"/>
                    <stop offset="1" stopColor="white"/>
                  </linearGradient>
                  <linearGradient id="paint3_contact" x1="98.314" y1="173.43" x2="4.4186" y2="246.337" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="0.615385" stopColor="black" stopOpacity="0"/>
                    <stop offset="1" stopColor="#FFF5F5"/>
                  </linearGradient>
                  <linearGradient id="paint4_contact" x1="134.768" y1="77.3257" x2="178.954" y2="158.518" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="0.625" stopColor="black" stopOpacity="0"/>
                    <stop offset="1" stopColor="white"/>
                  </linearGradient>
                  <linearGradient id="paint5_contact" x1="177.849" y1="95.0001" x2="83.9538" y2="167.907" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="0.615385" stopColor="black" stopOpacity="0"/>
                    <stop offset="1" stopColor="#FFF5F5"/>
                  </linearGradient>
                </defs>

                {/* Ring 1 - Top */}
                <mask id="mask1_contact" fill="white">
                  <path d="M110.465 55.2326C110.465 85.7367 85.7367 110.465 55.2326 110.465C24.7285 110.465 0 85.7367 0 55.2326C0 24.7285 24.7285 0 55.2326 0C85.7367 0 110.465 24.7285 110.465 55.2326ZM27.9464 55.2326C27.9464 70.3023 40.1628 82.5188 55.2326 82.5188C70.3023 82.5188 82.5188 70.3023 82.5188 55.2326C82.5188 40.1628 70.3023 27.9464 55.2326 27.9464C40.1628 27.9464 27.9464 40.1628 27.9464 55.2326Z"/>
                </mask>
                <path 
                  d="M110.465 55.2326C110.465 85.7367 85.7367 110.465 55.2326 110.465C24.7285 110.465 0 85.7367 0 55.2326C0 24.7285 24.7285 0 55.2326 0C85.7367 0 110.465 24.7285 110.465 55.2326ZM27.9464 55.2326C27.9464 70.3023 40.1628 82.5188 55.2326 82.5188C70.3023 82.5188 82.5188 70.3023 82.5188 55.2326C82.5188 40.1628 70.3023 27.9464 55.2326 27.9464C40.1628 27.9464 27.9464 40.1628 27.9464 55.2326Z" 
                  fill="url(#paint0_contact)" 
                  fillOpacity="0.3" 
                  style={{ mixBlendMode: 'overlay' }}
                />
                <path 
                  d="M110.465 55.2326C110.465 85.7367 85.7367 110.465 55.2326 110.465C24.7285 110.465 0 85.7367 0 55.2326C0 24.7285 24.7285 0 55.2326 0C85.7367 0 110.465 24.7285 110.465 55.2326ZM27.9464 55.2326C27.9464 70.3023 40.1628 82.5188 55.2326 82.5188C70.3023 82.5188 82.5188 70.3023 82.5188 55.2326C82.5188 40.1628 70.3023 27.9464 55.2326 27.9464C40.1628 27.9464 27.9464 40.1628 27.9464 55.2326Z" 
                  stroke="url(#paint1_contact)" 
                  strokeOpacity="0.3" 
                  strokeWidth="2" 
                  style={{ mixBlendMode: 'overlay' }}
                  mask="url(#mask1_contact)"
                />

                {/* Ring 2 - Bottom */}
                <mask id="mask2_contact" fill="white">
                  <path d="M110.465 210.988C110.465 241.493 85.7367 266.221 55.2326 266.221C24.7285 266.221 0 241.493 0 210.988C0 180.484 24.7285 155.756 55.2326 155.756C85.7367 155.756 110.465 180.484 110.465 210.988ZM27.9464 210.988C27.9464 226.058 40.1628 238.275 55.2326 238.275C70.3023 238.275 82.5188 226.058 82.5188 210.988C82.5188 195.919 70.3023 183.702 55.2326 183.702C40.1628 183.702 27.9464 195.919 27.9464 210.988Z"/>
                </mask>
                <path 
                  d="M110.465 210.988C110.465 241.493 85.7367 266.221 55.2326 266.221C24.7285 266.221 0 241.493 0 210.988C0 180.484 24.7285 155.756 55.2326 155.756C85.7367 155.756 110.465 180.484 110.465 210.988ZM27.9464 210.988C27.9464 226.058 40.1628 238.275 55.2326 238.275C70.3023 238.275 82.5188 226.058 82.5188 210.988C82.5188 195.919 70.3023 183.702 55.2326 183.702C40.1628 183.702 27.9464 195.919 27.9464 210.988Z" 
                  fill="url(#paint2_contact)" 
                  fillOpacity="0.3" 
                  style={{ mixBlendMode: 'overlay' }}
                />
                <path 
                  d="M110.465 210.988C110.465 241.493 85.7367 266.221 55.2326 266.221C24.7285 266.221 0 241.493 0 210.988C0 180.484 24.7285 155.756 55.2326 155.756C85.7367 155.756 110.465 180.484 110.465 210.988ZM27.9464 210.988C27.9464 226.058 40.1628 238.275 55.2326 238.275C70.3023 238.275 82.5188 226.058 82.5188 210.988C82.5188 195.919 70.3023 183.702 55.2326 183.702C40.1628 183.702 27.9464 195.919 27.9464 210.988Z" 
                  stroke="url(#paint3_contact)" 
                  strokeOpacity="0.3" 
                  strokeWidth="2" 
                  style={{ mixBlendMode: 'overlay' }}
                  mask="url(#mask2_contact)"
                />

                {/* Ring 3 - Middle Right */}
                <mask id="mask3_contact" fill="white">
                  <path d="M190 132.558C190 163.062 165.272 187.791 134.768 187.791C104.264 187.791 79.5352 163.062 79.5352 132.558C79.5352 102.054 104.264 77.3257 134.768 77.3257C165.272 77.3257 190 102.054 190 132.558ZM107.482 132.558C107.482 147.628 119.698 159.844 134.768 159.844C149.837 159.844 162.054 147.628 162.054 132.558C162.054 117.488 149.837 105.272 134.768 105.272C119.698 105.272 107.482 117.488 107.482 132.558Z"/>
                </mask>
                <path 
                  d="M190 132.558C190 163.062 165.272 187.791 134.768 187.791C104.264 187.791 79.5352 163.062 79.5352 132.558C79.5352 102.054 104.264 77.3257 134.768 77.3257C165.272 77.3257 190 102.054 190 132.558ZM107.482 132.558C107.482 147.628 119.698 159.844 134.768 159.844C149.837 159.844 162.054 147.628 162.054 132.558C162.054 117.488 149.837 105.272 134.768 105.272C119.698 105.272 107.482 117.488 107.482 132.558Z" 
                  fill="url(#paint4_contact)" 
                  fillOpacity="0.3" 
                  style={{ mixBlendMode: 'overlay' }}
                />
                <path 
                  d="M190 132.558C190 163.062 165.272 187.791 134.768 187.791C104.264 187.791 79.5352 163.062 79.5352 132.558C79.5352 102.054 104.264 77.3257 134.768 77.3257C165.272 77.3257 190 102.054 190 132.558ZM107.482 132.558C107.482 147.628 119.698 159.844 134.768 159.844C149.837 159.844 162.054 147.628 162.054 132.558C162.054 117.488 149.837 105.272 134.768 105.272C119.698 105.272 107.482 117.488 107.482 132.558Z" 
                  stroke="url(#paint5_contact)" 
                  strokeOpacity="0.3" 
                  strokeWidth="2" 
                  style={{ mixBlendMode: 'overlay' }}
                  mask="url(#mask3_contact)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
