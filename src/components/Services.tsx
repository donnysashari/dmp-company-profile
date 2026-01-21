'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Service } from '../types/service'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  // Simple fallback services
  const fallbackServices: Service[] = [
    {
      id: '1',
      title: 'Manajemen Proyek Digital',
      description: 'Kami menyediakan layanan manajemen proyek digital yang komprehensif untuk memastikan kesuksesan setiap inisiatif teknologi Anda.',
      icon: '📊',
      category: 'software',
      features: [
        { feature: 'Perencanaan proyek yang detail' },
        { feature: 'Monitoring progres real-time' },
        { feature: 'Risk management' }
      ],
      benefits: [],
      technologies: [],
      featured: true,
      order: 1,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Konsultasi Strategi IT',
      description: 'Konsultasi strategis untuk mengoptimalkan infrastruktur IT dan mengidentifikasi peluang transformasi digital.',
      icon: '☁️',
      category: 'software',
      features: [
        { feature: 'Audit infrastruktur existing' },
        { feature: 'Roadmap teknologi' },
        { feature: 'Analisis ROI' }
      ],
      benefits: [],
      technologies: [],
      featured: true,
      order: 2,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Pengembangan Aplikasi Custom',
      description: 'Solusi aplikasi yang disesuaikan dengan kebutuhan spesifik bisnis Anda dengan teknologi terdepan.',
      icon: '💻',
      category: 'software',
      features: [
        { feature: 'Full-stack development' },
        { feature: 'Mobile app development' },
        { feature: 'API integration' }
      ],
      benefits: [],
      technologies: [],
      featured: true,
      order: 3,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log('Fetching services from API...')
        const response = await fetch('/api/services?featured=true&status=active&limit=3')
        
        if (response.ok) {
          const data = await response.json()
          console.log('API Response:', data)
          
          if (data.docs && data.docs.length > 0) {
            console.log('Using CMS data, found', data.docs.length, 'services')
            setServices(data.docs)
          } else {
            console.log('No CMS data, using fallback services')
            setServices(fallbackServices)
          }
        } else {
          console.log('API failed, using fallback services')
          setServices(fallbackServices)
        }
      } catch (error) {
        console.log('Error fetching services, using fallback:', error)
        setServices(fallbackServices)
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
      <section id="services" className="py-20 bg-gray-50">
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
    <section id="services" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Layanan <span className="text-blue-600">Kami</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solusi teknologi terdepan untuk mengoptimalkan operasional bisnis 
            dan mendorong transformasi digital perusahaan Anda.
          </p>
          
          {/* Debug info - remove in production */}
          <div className="text-sm text-gray-500 mt-4">
            Menampilkan {services.length} layanan 
            {services.length > 0 && services[0].id.includes('fallback') ? '(fallback data)' : '(from CMS)'}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div 
              key={service.id}
              className="service-card group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div className="space-y-2">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature.feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-12">
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
