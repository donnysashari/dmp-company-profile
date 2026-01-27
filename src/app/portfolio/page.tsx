'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { AnimationManager } from '@/lib/animation-utils'
import Header from '@/components/Header'
import PageHeader from '@/components/PageHeader'
import SimpleFooter from '@/components/SimpleFooter'
import Link from 'next/link'
import Image from 'next/image'

// Inline simple data hook to avoid import issues
function usePortfolioData() {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const hasLoadedRef = useRef(false)

  const fallbackData = {
    docs: [
      {
        id: 'mock-1',
        title: 'Dashboard Analytics E-Commerce',
        slug: 'ecommerce-analytics-dashboard',
        description: 'Dashboard analytics real-time untuk jaringan retail besar dengan 500+ toko',
        client: 'RetailMax Indonesia',
        category: 'analytics',
        technologies: [
          { technology: 'React' },
          { technology: 'Node.js' },
          { technology: 'PostgreSQL' }
        ],
        featured: true,
        completedAt: '2023-12-15'
      },
      {
        id: 'mock-2',
        title: 'Aplikasi Mobile Banking',
        slug: 'banking-mobile-app',
        description: 'Aplikasi mobile banking aman dengan autentikasi biometrik',
        client: 'Bank Mandiri',
        category: 'mobile',
        technologies: [
          { technology: 'React Native' },
          { technology: 'Node.js' },
          { technology: 'MongoDB' }
        ],
        featured: true,
        completedAt: '2024-01-10'
      }
    ]
  }

  const fetchData = async () => {
    if (hasLoadedRef.current) return
    hasLoadedRef.current = true

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/portfolio', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (response.ok) {
        const result = await response.json()
        setData(result)
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (err) {
      console.warn('Using fallback portfolio data:', err)
      setData(fallbackData)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!hasLoadedRef.current) {
      fetchData()
    }
  }, [])

  return { data, isLoading }
}
import { Portfolio } from '@/types/portfolio'

// Mock data as fallback - will be combined with Payload CMS data
const mockPortfolioItems: Portfolio[] = [
  {
    id: 'mock-1',
    title: 'Dashboard Analytics E-Commerce',
    slug: 'ecommerce-analytics-dashboard',
    description: 'Dashboard analytics real-time untuk jaringan retail besar dengan 500+ toko',
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
    title: 'Aplikasi Mobile Banking',
    slug: 'banking-mobile-app',
    description: 'Aplikasi mobile banking aman dengan autentikasi biometrik',
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
    title: 'Migrasi Infrastruktur Cloud',
    slug: 'cloud-migration-project',
    description: 'Migrasi lengkap sistem legacy ke infrastruktur cloud',
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
    title: 'Sistem Manajemen Rumah Sakit',
    slug: 'healthcare-management-system',
    description: 'Sistem manajemen rumah sakit komprehensif dengan portal pasien',
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
  { label: 'Semua Proyek', value: 'all' },
  { label: 'Pengembangan Web', value: 'web' },
  { label: 'Aplikasi Mobile', value: 'mobile' },
  { label: 'Analisis Data', value: 'analytics' },
  { label: 'Solusi Cloud', value: 'cloud' }
]

export default function PortfolioPage() {
  const portfolioRef = useRef<HTMLDivElement>(null)
  const { data: portfolioData, isLoading } = usePortfolioData()
  const [activeCategory, setActiveCategory] = useState('all')

  // Calculate filtered items based on category and data
  const filteredItems = useMemo(() => {
    if (!portfolioData?.docs) return []
    
    if (activeCategory === 'all') {
      return portfolioData.docs
    } else {
      return portfolioData.docs.filter((item: Portfolio) => item.category === activeCategory)
    }
  }, [portfolioData?.docs, activeCategory])

  // Filter portfolio items
  const filterItems = (category: string) => {
    setActiveCategory(category)
  }

  useEffect(() => {
    const componentId = 'portfolio-page-animations'
    
    // Portfolio items animation
    const portfolioItems = document.querySelectorAll('.portfolio-item')
    portfolioItems.forEach(item => {
      AnimationManager.animateElement(item as HTMLElement, { opacity: 0, y: 50 })
    })
    
    if (portfolioRef.current) {
      const itemsTimeline = AnimationManager.createTimeline(`${componentId}-items`, {
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
      
      if (itemsTimeline) {
        itemsTimeline.to(portfolioItems, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        })
      }
    }

    return () => {
      AnimationManager.cleanup(componentId)
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#F8F8F8]">
      <Header />
      
      {/* Page Header */}
      <PageHeader 
        title="Portofolio Kami"
        subtitle="Temukan bagaimana kami telah membantu bisnis bertransformasi melalui solusi digital inovatif"
        breadcrumbs={[
          { label: 'Portofolio' }
        ]}
      />

      {/* Portfolio Grid */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => filterItems(category.value)}
                className={`px-6 py-3 rounded-full transition-all duration-300 shadow-md font-plus-jakarta ${
                  activeCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-600 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Portfolio items will show directly without loading spinner */}
          
          {/* No Data State */}
          {!isLoading && filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 font-plus-jakarta">Tidak ada portofolio yang ditemukan.</p>
            </div>
          )}

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
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors font-figtree">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 font-plus-jakarta">
                      {item.description}
                    </p>
                    
                    {/* Client */}
                    <p className="text-sm text-gray-500 mb-4 font-plus-jakarta">
                      <span className="font-medium">Klien:</span> {item.client}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {item.technologies?.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-plus-jakarta"
                        >
                          {tech.technology}
                        </span>
                      ))}
                      {(item.technologies?.length || 0) > 3 && (
                        <span className="text-xs text-gray-500 font-plus-jakarta">
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
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-figtree">
            Siap Memulai Proyek Anda?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-plus-jakarta">
            Mari diskusikan bagaimana kami dapat membantu mentransformasi bisnis Anda dengan solusi digital inovatif.
          </p>
          <Link href="/contact">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 font-plus-jakarta">
              Hubungi Kami
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <SimpleFooter />
    </main>
  )
}
