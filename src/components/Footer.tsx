'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const logoElement = logoRef.current

    if (logoElement) {
      // Create animation that only triggers when scrolling to footer section
      gsap.fromTo(logoElement, {
        opacity: 0,
        y: 50,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: logoElement,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          once: false // Allow animation to replay when scrolling back
        }
      })
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <footer className="relative bg-[#3094D6] overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-5 md:px-20 py-12 md:py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Column 1 - Company Info */}
          <div className="space-y-4">
            <h3 className="text-white font-figtree text-xl font-semibold mb-4">
              PT. Digital Mahadata Prima
            </h3>
            <p className="text-white font-plus-jakarta text-sm font-light leading-relaxed">
              Kami membantu organisasi mentransformasikan bisnis mereka melalui perangkat lunak digital dan layanan TIK yang unggul.
            </p>
          </div>

          {/* Column 2 - Sitemap */}
          <div className="space-y-4">
            <h4 className="text-white font-figtree text-lg font-semibold mb-4">
              Perusahaan
            </h4>
            <nav className="space-y-3">
              <Link 
                href="/" 
                className="block text-white font-plus-jakarta text-sm hover:opacity-80 transition-opacity"
              >
                Beranda
              </Link>
              <Link 
                href="/about" 
                className="block text-white font-plus-jakarta text-sm hover:opacity-80 transition-opacity"
              >
                Tentang
              </Link>
              <Link 
                href="/portfolio" 
                className="block text-white font-plus-jakarta text-sm hover:opacity-80 transition-opacity"
              >
                Portofolio
              </Link>
              <Link 
                href="/contact" 
                className="block text-white font-plus-jakarta text-sm hover:opacity-80 transition-opacity"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3 - Contact Us */}
          <div className="space-y-4">
            <h4 className="text-white font-figtree text-lg font-semibold mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <p className="text-white font-plus-jakarta text-sm font-light leading-relaxed">
                No.10 Blok A3, Ruko Dewe Square<br />
                Jl. Raya, Bedrek, Siwalanpanji,<br />
                Kec. Buduran, Kabupaten Sidoarjo,<br />
                Jawa Timur 61252, Indonesia
              </p>
              <p className="text-white font-plus-jakarta text-sm font-light">
                Phone: 021-22212552
              </p>
            </div>
          </div>

          {/* Column 4 - Maps */}
          <div className="space-y-4">
            <div className="w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2291804495444!2d112.72694777603003!3d-7.439875473307659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e700258d7d87%3A0xc6079ab1e6e22364!2sPT%20DIGITAL%20MAHADATA%20PRIMA%20(CABANG)!5e0!3m2!1sid!2sid!4v1769160832621!5m2!1sid!2sid" 
                width="280" 
                height="200" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Large Logo Background - Overlapping 20% */}
        <div ref={logoRef} className="relative -mb-20">
          <div className="flex justify-center">
            <div className="w-full max-w-[920px]">
              <svg 
                width="920" 
                height="364" 
                viewBox="0 0 920 364" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
              >
                <path d="M234.894 0C253.812 3.3134e-06 269.149 15.3628 269.149 34.3137C269.149 45.9733 263.342 56.272 254.468 62.4728V164.65C278.367 141.616 310.848 127.451 346.631 127.451C395.155 127.451 437.604 153.492 460.816 192.382C484.028 153.492 526.477 127.451 575 127.451C623.698 127.451 666.277 153.68 689.434 192.802C709.948 153.936 750.717 127.451 797.66 127.451C865.226 127.451 920 182.319 920 250C920 317.681 865.226 372.549 797.66 372.549C762.766 372.549 731.286 357.915 708.997 334.441L707.943 333.315V438.739C715.891 445.023 720.993 454.757 720.993 465.686C720.993 484.637 705.656 500 686.738 500C667.819 500 652.482 484.637 652.482 465.686C652.482 454.026 658.289 443.729 667.163 437.528V260.621C667.163 208.732 625.169 166.667 573.369 166.667C521.568 166.667 479.575 208.732 479.575 260.621V372.549H442.057V260.621C442.057 208.732 400.063 166.667 348.262 166.667C296.462 166.667 254.468 208.732 254.468 260.621V372.549H213.688V331.52C191.282 356.694 158.66 372.549 122.34 372.549C54.7737 372.549 -1.18137e-05 317.681 0 250C1.18138e-05 182.319 54.7737 127.451 122.34 127.451C158.66 127.451 191.282 143.306 213.688 168.482V61.2617C205.741 54.9779 200.638 45.2433 200.638 34.3137C200.638 15.3628 215.975 -3.31356e-06 234.894 0ZM686.738 440.523C672.864 440.523 661.617 451.789 661.617 465.686C661.617 479.583 672.864 490.85 686.738 490.85C700.611 490.85 711.858 479.583 711.858 465.686C711.858 451.789 700.611 440.523 686.738 440.523ZM122.34 160.131C72.7915 160.131 32.6242 200.366 32.6242 250C32.6242 299.634 72.7915 339.869 122.34 339.869C171.89 339.869 212.057 299.634 212.057 250C212.057 200.366 171.89 160.131 122.34 160.131ZM797.66 160.131C748.11 160.131 707.943 200.366 707.943 250C707.943 299.634 748.11 339.869 797.66 339.869C847.209 339.869 887.376 299.634 887.376 250C887.376 200.366 847.209 160.131 797.66 160.131ZM234.894 9.14968C221.02 9.14968 209.773 20.4165 209.773 34.3137C209.773 48.2111 221.02 59.4777 234.894 59.4777C248.767 59.4777 260.014 48.2111 260.014 34.3137C260.014 20.4165 248.767 9.14976 234.894 9.14968Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
