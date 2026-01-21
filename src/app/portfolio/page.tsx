'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'
import { Portfolio } from '@/types/portfolio'

gsap.registerPlugin(ScrollTrigger)

// Mock data as fallback - will be combined with Payload CMS data
const mockPortfolioItems: Portfolio[] = [
  {
    id: 'mock-1',
    title: 'E-Commerce Analytics Dashboard',
    slug: 'ecommerce-analytics-dashboard',
    description: 'Real-time analytics dashboard for major retail chain with 500+ stores',
    client: 'RetailMax Indonesia',
    category: 'analytics',
    technologies: [
      { technology: 'React' },
      { technology: 'D3.js' },
      { technology: 'Python' },
      { technology: 'AWS' }
    ],
    featured: true,
    completedAt: '2023-12-15',
    createdAt: '2023-12-15',
    updatedAt: '2023-12-15'
  },
  {
    id: 'mock-2',
    title: 'Banking Mobile Application',
    slug: 'banking-mobile-app',
    description: 'Secure mobile banking app with biometric authentication',
    client: 'Bank Mandiri',
    category: 'mobile',
    technologies: [
      { technology: 'React Native' },
      { technology: 'Node.js' },
      { technology: 'PostgreSQL' }
    ],
    featured: true,
    createdAt: '2023-11-15',
    updatedAt: '2023-11-15'
  },
  {
    id: 'mock-3',
    title: 'Cloud Infrastructure Migration',
    slug: 'cloud-migration-project',
    description: 'Complete migration of legacy systems to cloud infrastructure',
    client: 'PT Telkom Indonesia',
    category: 'cloud',
    technologies: [
      { technology: 'AWS' },
      { technology: 'Docker' },
      { technology: 'Kubernetes' },
      { technology: 'Terraform' }
    ],
    featured: false,
    createdAt: '2023-10-15',
    updatedAt: '2023-10-15'
  },
  {
    id: 'mock-4',
    title: 'Healthcare Management System',
    slug: 'healthcare-management-system',
    description: 'Comprehensive hospital management system with patient portal',
    client: 'RS Siloam',
    category: 'web',
    technologies: [
      { technology: 'Next.js' },
      { technology: 'TypeScript' },
      { technology: 'PostgreSQL' },
      { technology: 'Redis' }
    ],
    featured: false,
    createdAt: '2023-09-15',
    updatedAt: '2023-09-15'
  }
]

const categories = [
  { label: 'All Projects', value: 'all' },
  { label: 'Web Development', value: 'web' },
  { label: 'Mobile Apps', value: 'mobile' },
  { label: 'Data Analytics', value: 'analytics' },
  { label: 'Cloud Solutions', value: 'cloud' }
]

export default function PortfolioPage() {
  const heroRef = useRef<HTMLElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>(mockPortfolioItems)
  const [filteredItems, setFilteredItems] = useState<Portfolio[]>(mockPortfolioItems)
  const [activeCategory, setActiveCategory] = useState('all')

  // Fetch portfolio data from CMS
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('/api/portfolio')
        if (response.ok) {
          const data = await response.json()
          // Combine CMS data with mock data, prioritizing CMS data
          const cmsItems = data.docs || []
          const combinedItems = [...cmsItems, ...mockPortfolioItems]
          
          // Remove duplicates based on slug
          const uniqueItems = combinedItems.filter((item, index, self) =>
            index === self.findIndex(t => t.slug === item.slug)
          )
          
          setPortfolioItems(uniqueItems)
          setFilteredItems(uniqueItems)
        } else {
          console.log('Using fallback data')
        }
      } catch (error) {
        console.error('Error fetching portfolio data:', error)
        console.log('Using fallback data')
      }
    }

    fetchPortfolioData()
  }, [])

  // Filter portfolio items
  const filterItems = (category: string) => {
    setActiveCategory(category)
    if (category === 'all') {
      setFilteredItems(portfolioItems)
    } else {
      const filtered = portfolioItems.filter(item => item.category === category)
      setFilteredItems(filtered)
    }
  }

  useEffect(() => {
    // Hero animation
    const tl = gsap.timeline({ delay: 0.5 })
    tl.from('.hero-title', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.6')

    // Portfolio items animation
    gsap.set('.portfolio-item', { opacity: 0, y: 50 })
    
    ScrollTrigger.create({
      trigger: portfolioRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.portfolio-item', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-24 pb-16 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="hero-title text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-blue-400">Portfolio</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Discover how we&apos;ve helped businesses transform through innovative digital solutions
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => filterItems(category.value)}
                className={`px-6 py-3 rounded-full transition-all duration-300 shadow-md ${
                  activeCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-600 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Portfolio Items */}
          <div ref={portfolioRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Link key={item.id} href={`/portfolio/${item.slug}`}>
                <div className="portfolio-item group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  {/* Image */}
                  <div className="relative h-64 bg-gray-200 overflow-hidden">
                    {item.featuredImage ? (
                      <Image 
                        src={item.featuredImage.url} 
                        alt={item.featuredImage.alt || item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">{item.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        {categories.find(c => c.value === item.category)?.label}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    {/* Client */}
                    <p className="text-sm text-gray-500 mb-4">
                      <span className="font-medium">Client:</span> {item.client}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {item.technologies?.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {tech.technology}
                        </span>
                      ))}
                      {(item.technologies?.length || 0) > 3 && (
                        <span className="text-xs text-gray-500">
                          +{(item.technologies?.length || 0) - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help transform your business with innovative digital solutions.
          </p>
          <Link href="/contact">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300">
              Get In Touch
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
