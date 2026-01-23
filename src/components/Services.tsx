'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import { Service } from '../types/service'

gsap.registerPlugin(ScrollTrigger)

// Static fallback services to avoid dependency issues
const FALLBACK_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Solusi Kecerdasan Buatan (Artificial Intelligence)',
    description: 'Solusi AI mulai dari pengenalan wajah hingga pengelolaan dan analitik data untuk meningkatkan keamanan serta pengambilan keputusan berbasis data.',
    icon: '🤖',
    serviceImage: {
      url: 'https://api.builder.io/api/v1/image/assets/TEMP/c874172de1a667d8c20595bc6422c1905a41db17?width=804',
      alt: 'AI Illustration'
    },
    category: 'ai',
    features: [],
    benefits: [],
    technologies: [],
    featured: true,
    order: 1,
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    title: 'Otomatisasi Proses Robotik (Robotic Process Automation)',
    description: 'Otomatisasi proses bisnis dengan DMS dan OCR untuk mempercepat alur kerja, mengurangi kesalahan manual, dan meningkatkan efisiensi operasional.',
    icon: '🤖',
    serviceImage: {
      url: 'https://api.builder.io/api/v1/image/assets/TEMP/6ac2fc8fd3368850af35f3ade077d20ee75756c8?width=804',
      alt: 'RPA Illustration'
    },
    category: 'automation',
    features: [],
    benefits: [],
    technologies: [],
    featured: true,
    order: 2,
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '3',
    title: 'Solusi Smart Campus (LMS)',
    description: 'Ekosistem Learning Management System (LMS) terintegrasi yang mencakup SIAKAD, video conference, ujian online, dan dashboard monitoring untuk mendukung transformasi digital pendidikan.',
    icon: '📚',
    serviceImage: {
      url: 'https://api.builder.io/api/v1/image/assets/TEMP/8bf992a9bcdaaa311a1f76686a3c96608dbe77c9?width=804',
      alt: 'LMS Illustration'
    },
    category: 'ai',
    features: [],
    benefits: [],
    technologies: [],
    featured: true,
    order: 3,
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '4',
    title: 'Solusi Pembayaran Digital',
    description: 'Solusi AI mulai dari pengenalan wajah hingga pengelolaan dan analitik data untuk meningkatkan keamanan serta pengambilan keputusan berbasis data.',
    icon: '💳',
    serviceImage: {
      url: 'https://api.builder.io/api/v1/image/assets/TEMP/75aa643f15ec622f034b81cde8118f460c9c9115?width=804',
      alt: 'Digital Payment Illustration'
    },
    category: 'fintech',
    features: [],
    benefits: [],
    technologies: [],
    featured: true,
    order: 4,
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '5',
    title: 'Pengembangan Perangkat Lunak',
    description: 'Pengembangan aplikasi dan portal kustom untuk korporasi, pemerintahan, dan pendidikan, meliputi sistem monitoring, manajemen aset, hingga dashboard kinerja.',
    icon: '💻',
    serviceImage: {
      url: 'https://api.builder.io/api/v1/image/assets/TEMP/a83a96c31cf0bb90f472f8da70a3f0493922d6e4?width=804',
      alt: 'Software Development Illustration'
    },
    category: 'software',
    features: [],
    benefits: [],
    technologies: [],
    featured: true,
    order: 5,
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  }
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log('Fetching services from API...')
        const response = await fetch('/api/services?featured=true&status=active&limit=5')
        
        if (response.ok) {
          const data = await response.json()
          console.log('API Response:', data)
          
          if (data.docs && data.docs.length > 0) {
            console.log('Using CMS data, found', data.docs.length, 'services')
            setServices(data.docs)
          } else {
            console.log('No CMS data, using fallback services')
            setServices(FALLBACK_SERVICES)
          }
        } else {
          console.log('API failed, using fallback services')
          setServices(FALLBACK_SERVICES)
        }
      } catch (error) {
        console.log('Error fetching services, using fallback:', error)
        setServices(FALLBACK_SERVICES)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Animations
  useEffect(() => {
    if (loading) return

    const section = sectionRef.current
    const title = titleRef.current

    if (section && title) {
      gsap.set([title, '.service-card'], { opacity: 0, y: 50 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.to(title, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        .to('.service-card', { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: 'power3.out' 
        }, '-=0.6')
    }
  }, [loading, services])

  if (loading) {
    return (
      <section id="services" className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading services...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-[#F8F8F8]">
      <div className="container mx-auto px-5 md:px-20">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12 md:mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#DEDEDE] bg-white mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21H5V15H3V21ZM12.46 22L9.53 21.36L6.6 20.67C6.43041 20.6369 6.27805 20.5448 6.17 20.41C6.05743 20.2796 5.9969 20.1122 6 19.94V15.94C6.00283 15.7688 6.06265 15.6034 6.17 15.47C6.28169 15.3394 6.43246 15.2482 6.6 15.21L11.38 14.62L16.17 14.02L16.32 14.58L16.47 15.13C16.4727 15.3144 16.4204 15.4954 16.32 15.65C16.2281 15.8117 16.0884 15.941 15.92 16.02L13.92 16.52L11.92 17.02L13.54 17.68L15.17 18.33L17.44 17.69L19.65 17C19.8464 16.9503 20.0544 16.979 20.23 17.08C20.3184 17.1278 20.3961 17.1933 20.458 17.2724C20.52 17.3516 20.5649 17.4427 20.59 17.54L20.78 18.31L20.98 19.07C21.0254 19.2601 20.9968 19.4602 20.9 19.63C20.7971 19.8013 20.6325 19.9265 20.44 19.98L16.81 20.98L13.18 21.98C13.0605 21.9955 12.9395 21.9955 12.82 21.98C12.7019 22.0064 12.5803 22.0132 12.46 22ZM9 4L7 6L5 8L7 10L9 12L9.7 11.3L10.4 10.6L9.1 9.3L7.8 8L9.1 6.7L10.4 5.4L9.7 4.7L9 4ZM15 4L14.3 4.7L13.6 5.4L14.9 6.7L16.2 8L14.9 9.3L13.6 10.6L14.3 11.3L15 12L17 10L19 8L17 6L15 4Z" fill="#47A6F1"/>
            </svg>
            <span className="text-[#4C5C6E] font-plus-jakarta text-xs">Layanan Kami</span>
          </div>

          {/* Title */}
          <h2 className="text-[#4C5C6E] font-figtree text-3xl md:text-5xl lg:text-6xl font-normal mb-5 px-4">
            Software Enterprise yang Memecahkan Masalah Bisnis Nyata
          </h2>

          {/* Decorative Elements */}
          <div className="flex items-center justify-center gap-0">
            <DecorativeIcon variant="small-grid" />
            <DecorativeIcon variant="large-ring" />
            <DecorativeIcon variant="oval" />
            <DecorativeIcon variant="circle" />
            <DecorativeIcon variant="medium-grid" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="flex flex-col gap-20 md:gap-20 lg:gap-24">
          {services.slice(0, 5).map((service, index) => (
            <div
              key={service.id}
              className="service-card"
            >
              <ServiceCard
                number={String(index + 1).padStart(2, '0')}
                title={service.title}
                description={service.description}
                image={service.serviceImage?.url || FALLBACK_SERVICES[index]?.serviceImage?.url || ''}
                iconVariant={index + 1}
              />
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Lihat Semua Layanan
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Service Card Component
function ServiceCard({ number, title, description, image, iconVariant }: { 
  number: string
  title: string
  description: string
  image: string
  iconVariant: number
}) {
  return (
    <div className="relative bg-white rounded-2xl border-2 border-white overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Content */}
        <div className="flex-1 p-6 md:p-12 lg:p-16 flex flex-col justify-center">
          {/* Decorative Icon */}
          <div className="absolute top-5 left-5 opacity-50">
            <Image
              src={`/decorative-icon-${iconVariant}.svg`}
              alt="Decorative icon"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
          </div>

          {/* Number */}
          <div className="text-[#4C5C6E] font-figtree text-xs font-medium mb-3">
            {number}
          </div>

          {/* Title */}
          <h3 className="text-[#4C5C6E] font-figtree text-xl md:text-2xl font-medium mb-4 leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-[#4C5C6E] font-plus-jakarta text-sm font-light leading-relaxed text-justify max-w-md">
            {description}
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-[400px] lg:w-[400px] shrink-0 relative h-64 md:h-[410px]">
          <div className="absolute top-1 right-1 bottom-1 md:top-1 md:right-1 md:bottom-1 w-full h-full max-w-[400px] max-h-[400px] mx-auto md:mx-0">
            <Image
              src={image}
              alt={title}
              width={400}
              height={400}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          {/* Gradient Overlay Ring */}
          <svg 
            className="absolute top-1 left-1 md:top-1 md:left-auto md:right-1 pointer-events-none" 
            width="50" 
            height="50" 
            viewBox="0 0 50 50" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`paint0_${number}`} x1="25" y1="0" x2="45" y2="36.75" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="0.625" stopColor="black" stopOpacity="0.2"/>
                <stop offset="1" stopColor="white"/>
              </linearGradient>
              <linearGradient id={`paint1_${number}`} x1="44.5" y1="8" x2="2" y2="41" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="0.615385" stopColor="black" stopOpacity="0.3"/>
                <stop offset="1" stopColor="#FFF5F5"/>
              </linearGradient>
            </defs>
            <mask id={`mask_${number}`} fill="white">
              <path d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25ZM12.6494 25C12.6494 31.821 18.179 37.3506 25 37.3506C31.821 37.3506 37.3506 31.821 37.3506 25C37.3506 18.179 31.821 12.6494 25 12.6494C18.179 12.6494 12.6494 18.179 12.6494 25Z"/>
            </mask>
            <path 
              d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25ZM12.6494 25C12.6494 31.821 18.179 37.3506 25 37.3506C31.821 37.3506 37.3506 31.821 37.3506 25C37.3506 18.179 31.821 12.6494 25 12.6494C18.179 12.6494 12.6494 18.179 12.6494 25Z" 
              fill={`url(#paint0_${number})`} 
              fillOpacity="0.2" 
              style={{ mixBlendMode: 'overlay' }}
            />
            <path 
              d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25ZM12.6494 25C12.6494 31.821 18.179 37.3506 25 37.3506C31.821 37.3506 37.3506 31.821 37.3506 25C37.3506 18.179 31.821 12.6494 25 12.6494C18.179 12.6494 12.6494 18.179 12.6494 25Z" 
              stroke={`url(#paint1_${number})`} 
              strokeOpacity="0.3" 
              strokeWidth="2" 
              style={{ mixBlendMode: 'overlay' }}
              mask={`url(#mask_${number})`}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

// Header Decorative Icons
function DecorativeIcon({ variant }: { variant: 'small-grid' | 'large-ring' | 'oval' | 'circle' | 'medium-grid' }) {
  const iconMap = {
    'small-grid': '/decorative-icon-1.svg',
    'large-ring': '/decorative-icon-2.svg',
    'oval': '/decorative-icon-3.svg',
    'circle': '/decorative-icon-4.svg',
    'medium-grid': '/decorative-icon-5.svg'
  }

  return (
    <div className="w-10 h-10 relative flex-shrink-0">
      <Image
        src={iconMap[variant]}
        alt={`Decorative icon ${variant}`}
        width={40}
        height={40}
        className="w-full h-full object-contain"
      />
    </div>
  )
}
