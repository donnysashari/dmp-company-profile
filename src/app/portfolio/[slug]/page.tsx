'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/Header'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Portfolio } from '@/types/portfolio'

gsap.registerPlugin(ScrollTrigger)

// Mock data as fallback
interface FallbackPortfolio {
  title: string
  client: string
  category: string
  completedAt: string
  projectUrl?: string
  description: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
  images: string[]
  testimonial: {
    quote: string
    author: string
    position: string
  }
}

const portfolioDataFallback: { [key: string]: FallbackPortfolio } = {
  'ecommerce-analytics-dashboard': {
    title: 'E-Commerce Analytics Dashboard',
    client: 'RetailMax Indonesia',
    category: 'Data Analytics',
    completedAt: '2023-12-15',
    projectUrl: 'https://dashboard.retailmax.id',
    description: 'A comprehensive real-time analytics dashboard for Indonesia\'s largest retail chain, providing insights across 500+ stores nationwide.',
    challenge: 'RetailMax needed to centralize data from multiple sources and provide real-time insights to store managers and executives. The existing system was fragmented and couldn\'t handle the scale of operations.',
    solution: 'We developed a modern analytics platform using React and D3.js for the frontend, with Python-based data processing pipelines running on AWS. The system aggregates data from POS systems, inventory management, and customer databases.',
    results: [
      '40% improvement in decision-making speed',
      '25% reduction in inventory wastage',
      '60% faster report generation',
      'Real-time monitoring across 500+ locations'
    ],
    technologies: ['React', 'TypeScript', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    images: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800'
    ],
    testimonial: {
      quote: 'Digital Mahadata Prima transformed how we understand our business. The dashboard provides insights we never had before.',
      author: 'Budi Santoso',
      position: 'CTO, RetailMax Indonesia'
    }
  },
  'banking-mobile-app': {
    title: 'Banking Mobile Application',
    client: 'Bank Mandiri',
    category: 'Mobile Development',
    completedAt: '2023-11-15',
    projectUrl: 'https://mandiri-mobile.co.id',
    description: 'A secure and user-friendly mobile banking application with advanced biometric authentication and real-time transaction processing.',
    challenge: 'Bank Mandiri needed a modern mobile banking solution that could handle millions of users while maintaining the highest security standards. The existing system was outdated and couldn\'t scale with growing customer demands.',
    solution: 'We developed a React Native mobile application with advanced security features including biometric authentication, real-time fraud detection, and end-to-end encryption. The backend was built with Node.js and deployed on secure cloud infrastructure.',
    results: [
      '200% increase in mobile banking adoption',
      '50% reduction in customer service calls',
      '99.9% uptime and zero security incidents',
      'Support for 10 million+ active users'
    ],
    technologies: ['React Native', 'Node.js', 'Express.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Kubernetes'],
    images: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800'
    ],
    testimonial: {
      quote: 'The mobile banking app has revolutionized how our customers interact with our services. User satisfaction has never been higher.',
      author: 'Andi Wijaya',
      position: 'Head of Digital Banking, Bank Mandiri'
    }
  },
  'cloud-migration-project': {
    title: 'Cloud Infrastructure Migration',
    client: 'PT Telkom Indonesia',
    category: 'Cloud Solutions',
    completedAt: '2023-10-15',
    description: 'Complete migration of legacy systems to modern cloud infrastructure, improving scalability and reducing operational costs.',
    challenge: 'PT Telkom needed to migrate their legacy on-premise infrastructure to the cloud while maintaining 24/7 service availability and ensuring zero data loss during the transition.',
    solution: 'We executed a phased cloud migration strategy using AWS services, containerizing applications with Docker and Kubernetes, and implementing Infrastructure as Code with Terraform. The migration included comprehensive testing and rollback procedures.',
    results: [
      '60% reduction in infrastructure costs',
      '300% improvement in system scalability',
      '99.99% uptime during migration',
      'Zero data loss throughout the process'
    ],
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Prometheus', 'Grafana', 'ELK Stack'],
    images: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800'
    ],
    testimonial: {
      quote: 'The cloud migration was seamless and exceeded our expectations. Our systems are now more reliable and cost-effective than ever.',
      author: 'Dewi Sartika',
      position: 'CIO, PT Telkom Indonesia'
    }
  },
  'healthcare-management-system': {
    title: 'Healthcare Management System',
    client: 'RS Siloam',
    category: 'Web Development',
    completedAt: '2023-09-15',
    projectUrl: 'https://portal.siloam.co.id',
    description: 'A comprehensive hospital management system with integrated patient portal, electronic health records, and real-time monitoring.',
    challenge: 'RS Siloam needed to digitize their entire hospital operations, from patient registration to medical records management. The existing paper-based system was inefficient and prone to errors.',
    solution: 'We built a complete healthcare management platform using Next.js and TypeScript for the frontend, with a robust backend API. The system includes patient management, appointment scheduling, electronic health records, billing, and real-time monitoring dashboards.',
    results: [
      '75% reduction in patient wait times',
      '90% decrease in medical record errors',
      '100% digital transformation achieved',
      'Improved patient satisfaction scores by 85%'
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Socket.io'],
    images: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800'
    ],
    testimonial: {
      quote: 'The healthcare management system has transformed our hospital operations. We can now focus more on patient care rather than administrative tasks.',
      author: 'Dr. Sarah Putri',
      position: 'Medical Director, RS Siloam'
    }
  }
}

interface PortfolioDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [project, setProject] = useState<Portfolio | FallbackPortfolio | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const resolvedParams = await params
        const slug = resolvedParams.slug

        // First try to fetch from CMS
        const response = await fetch(`/api/portfolio/${slug}`)
        
        if (response.ok) {
          const data = await response.json()
          if (data && !data.error) {
            setProject(data)
            setIsLoading(false)
            return
          }
        }

        // Fallback to static data
        const fallbackProject = portfolioDataFallback[slug]
        if (fallbackProject) {
          setProject(fallbackProject)
        } else {
          notFound()
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching project:', error)
        
        // Try fallback
        const resolvedParams = await params
        const fallbackProject = portfolioDataFallback[resolvedParams.slug]
        if (fallbackProject) {
          setProject(fallbackProject)
        } else {
          notFound()
        }
        
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [params])

  // GSAP Animation Effect - moved here to maintain hook order
  useEffect(() => {
    if (!project || isLoading) return

    // Hero animation
    const tl = gsap.timeline({ delay: 0.5 })
    tl.from('.hero-content', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })

    // Content animation
    gsap.set('.content-section', { opacity: 0, y: 50 })
    
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.content-section', {
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
  }, [project, isLoading])

  // Helper functions for data handling
  const getProjectImages = (): string[] => {
    if (!project) return ['/api/placeholder/1200/800']
    
    if ('gallery' in project && project.gallery && project.gallery.length > 0) {
      return project.gallery
        .map((g: { image?: { url?: string } }) => g.image?.url)
        .filter((url): url is string => Boolean(url))
    }
    if ('images' in project && project.images) {
      return project.images
    }
    return ['/api/placeholder/1200/800']
  }

  const getProjectTechnologies = (): string[] => {
    if (!project) return []
    
    if ('technologies' in project && project.technologies && Array.isArray(project.technologies)) {
      if (typeof project.technologies[0] === 'string') {
        return project.technologies as string[]
      }
      return project.technologies
        .map((t: { technology?: string }) => t.technology)
        .filter((tech): tech is string => Boolean(tech))
    }
    return []
  }

  const getProjectResults = (): string[] => {
    if (!project) return []
    
    if ('results' in project && project.results && Array.isArray(project.results)) {
      if (typeof project.results[0] === 'string') {
        return project.results as string[]
      }
      return project.results
        .map((r: { result?: string }) => r.result)
        .filter((result): result is string => Boolean(result))
    }
    return []
  }

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading project details...</p>
        </div>
      </main>
    )
  }

  // Project not found
  if (!project) {
    notFound()
  }

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading project details...</p>
        </div>
      </main>
    )
  }

  // Project not found
  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-24 pb-16 bg-linear-to-br from-blue-900 via-purple-900 to-indigo-900 text-white"
      >
        <div className="container mx-auto px-6">
          <div className="hero-content max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link href="/portfolio" className="text-blue-400 hover:text-blue-300">
                Portfolio
              </Link>
              <span className="mx-2">→</span>
              <span className="text-gray-300">{project.title}</span>
            </nav>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {project.title}
            </h1>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-blue-400 font-semibold mb-2">Client</h3>
                <p className="text-xl">{project.client}</p>
              </div>
              <div>
                <h3 className="text-blue-400 font-semibold mb-2">Category</h3>
                <p className="text-xl">{project.category}</p>
              </div>
              <div>
                <h3 className="text-blue-400 font-semibold mb-2">Completed</h3>
                <p className="text-xl">
                  {project.completedAt 
                    ? new Date(project.completedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'Recently Completed'
                  }
                </p>
              </div>
              {project.projectUrl && (
                <div>
                  <h3 className="text-blue-400 font-semibold mb-2">Live Project</h3>
                  <a 
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl hover:text-blue-400 transition-colors"
                  >
                    View Live →
                  </a>
                </div>
              )}
            </div>
            
            <p className="text-xl text-gray-300">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Project Images */}
            <div className="content-section">
              <div className="grid gap-8">
                {getProjectImages().map((image: string, index: number) => (
                  <div key={index} className="aspect-video bg-gray-200 rounded-2xl overflow-hidden">
                    <div className="w-full h-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <span className="text-gray-600">Project Image {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenge */}
            <div className="content-section">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="content-section">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Solution</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Technologies */}
            <div className="content-section">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {getProjectTechnologies().map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="content-section">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Results</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {getProjectResults().map((result: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-gray-700">{result}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            {project.testimonial && (
              <div className="content-section bg-gray-50 rounded-2xl p-8">
                <blockquote className="text-xl italic text-gray-700 mb-6">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">
                      {project.testimonial?.author?.split(' ').map((n: string) => n[0]).join('') || 'C'}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{project.testimonial.author}</p>
                    <p className="text-gray-600">{project.testimonial.position}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in Similar Results?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let&apos;s discuss how we can help transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Start Your Project
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                View More Projects
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
