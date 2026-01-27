'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { AnimationManager } from '@/lib/animation-utils'
import Header from '@/components/Header'
import PageHeader from '@/components/PageHeader'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Service } from '@/types/service'

export default function ServicesPage() {
  const servicesRef = useRef<HTMLDivElement>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  // Fallback data in case CMS is not available
  const fallbackServices: Service[] = useMemo(() => [
    {
      id: '1',
      title: 'Solusi Kecerdasan Buatan (Artificial Intelligence)',
      description: 'Solusi AI mulai dari pengenalan wajah hingga pengelolaan dan analitik data untuk meningkatkan keamanan serta pengambilan keputusan berbasis data.',
      icon: '🤖',
      category: 'ai',
      features: [
        { feature: 'Computer Vision & Face Recognition' },
        { feature: 'Machine Learning Analytics' },
        { feature: 'Predictive Analytics' },
        { feature: 'Natural Language Processing' },
        { feature: 'Data Intelligence Solutions' }
      ],
      benefits: [
        { benefit: 'Peningkatan keamanan dengan sistem pengenalan wajah' },
        { benefit: 'Pengambilan keputusan berbasis data yang akurat' },
        { benefit: 'Otomatisasi proses analisis data kompleks' },
        { benefit: 'Prediksi trend dan pola bisnis' }
      ],
      technologies: [
        { technology: 'TensorFlow' },
        { technology: 'PyTorch' },
        { technology: 'OpenCV' },
        { technology: 'scikit-learn' }
      ],
      featured: true,
      order: 1,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Otomatisasi Proses Robotik (Robotic Process Automation)',
      description: 'Otomatisasi proses bisnis dengan DMS dan OCR untuk mempercepat alur kerja, mengurangi kesalahan manual, dan meningkatkan efisiensi operasional.',
      icon: '🤖',
      category: 'automation',
      features: [
        { feature: 'Document Management System (DMS)' },
        { feature: 'Optical Character Recognition (OCR)' },
        { feature: 'Workflow Automation' },
        { feature: 'Process Mining' },
        { feature: 'Bot Development' }
      ],
      benefits: [
        { benefit: 'Pengurangan kesalahan manual hingga 95%' },
        { benefit: 'Peningkatan efisiensi operasional' },
        { benefit: 'Penghematan waktu dan biaya operasional' },
        { benefit: 'Standardisasi proses bisnis' }
      ],
      technologies: [
        { technology: 'UiPath' },
        { technology: 'Blue Prism' },
        { technology: 'Automation Anywhere' },
        { technology: 'Python' }
      ],
      featured: true,
      order: 2,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Solusi Smart Campus (LMS)',
      description: 'Ekosistem Learning Management System (LMS) terintegrasi yang mencakup SIAKAD, video conference, ujian online, dan dashboard monitoring untuk mendukung transformasi digital pendidikan.',
      icon: '🎓',
      category: 'edtech',
      features: [
        { feature: 'Learning Management System' },
        { feature: 'SIAKAD Integration' },
        { feature: 'Video Conference Platform' },
        { feature: 'Online Examination System' },
        { feature: 'Performance Dashboard' }
      ],
      benefits: [
        { benefit: 'Transformasi digital pendidikan menyeluruh' },
        { benefit: 'Monitoring pembelajaran real-time' },
        { benefit: 'Efisiensi administrasi akademik' },
        { benefit: 'Pembelajaran hybrid yang fleksibel' }
      ],
      technologies: [
        { technology: 'Moodle' },
        { technology: 'BigBlueButton' },
        { technology: 'React' },
        { technology: 'Node.js' }
      ],
      featured: true,
      order: 3,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Solusi Pembayaran Digital',
      description: 'Solusi pembayaran digital terintegrasi dengan teknologi AI untuk meningkatkan keamanan transaksi dan memberikan pengalaman pembayaran yang seamless.',
      icon: '💳',
      category: 'fintech',
      features: [
        { feature: 'Digital Payment Gateway' },
        { feature: 'AI-Powered Security' },
        { feature: 'Multi-Channel Integration' },
        { feature: 'Real-time Transaction Monitoring' },
        { feature: 'Fraud Detection System' }
      ],
      benefits: [
        { benefit: 'Keamanan transaksi tingkat tinggi' },
        { benefit: 'Integrasi multi-platform' },
        { benefit: 'Deteksi fraud otomatis' },
        { benefit: 'Pengalaman pembayaran yang mudah' }
      ],
      technologies: [
        { technology: 'Stripe' },
        { technology: 'PayPal' },
        { technology: 'Blockchain' },
        { technology: 'Machine Learning' }
      ],
      featured: true,
      order: 4,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Pengembangan Perangkat Lunak',
      description: 'Pengembangan aplikasi dan portal kustom untuk korporasi, pemerintahan, dan pendidikan, meliputi sistem monitoring, manajemen aset, hingga dashboard kinerja.',
      icon: '💻',
      category: 'software',
      features: [
        { feature: 'Custom Application Development' },
        { feature: 'Web Portal Development' },
        { feature: 'Asset Management System' },
        { feature: 'Performance Dashboard' },
        { feature: 'System Integration' }
      ],
      benefits: [
        { benefit: 'Solusi custom sesuai kebutuhan bisnis' },
        { benefit: 'Integrasi sistem yang seamless' },
        { benefit: 'Monitoring dan reporting real-time' },
        { benefit: 'Skalabilitas dan maintainability tinggi' }
      ],
      technologies: [
        { technology: 'React' },
        { technology: 'Node.js' },
        { technology: 'Next.js' },
        { technology: 'TypeScript' }
      ],
      featured: true,
      order: 5,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ], [])

  // Fetch services from CMS
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services?status=active')
        
        if (response.ok) {
          const data = await response.json()
          if (data.docs && data.docs.length > 0) {
            setServices(data.docs)
          } else {
            // Use fallback data if no services in CMS
            setServices(fallbackServices)
          }
        } else {
          // Use fallback data if API fails
          setServices(fallbackServices)
        }
      } catch (error) {
        console.error('Error fetching services:', error)
        // Use fallback data if error occurs
        setServices(fallbackServices)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [fallbackServices])

  useEffect(() => {
    if (loading) return

    const componentId = 'services-page-animations'

    // Hero animation
    const heroContent = document.querySelector('.hero-content')
    if (heroContent) {
      AnimationManager.animateElement(heroContent as HTMLElement, { y: 100, opacity: 0 })
      
      const heroTimeline = AnimationManager.createTimeline(`${componentId}-hero`, { delay: 0.5 })
      if (heroTimeline) {
        heroTimeline.to(heroContent, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out'
        })
      }
    }

    // Services animation
    const serviceCards = document.querySelectorAll('.service-card')
    serviceCards.forEach(card => {
      AnimationManager.animateElement(card as HTMLElement, { opacity: 0, y: 50 })
    })
    
    if (servicesRef.current) {
      const servicesTimeline = AnimationManager.createTimeline(`${componentId}-services`, {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
      
      if (servicesTimeline) {
        servicesTimeline.to(serviceCards, {
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
  }, [loading])

  // Helper functions
  const getServiceFeatures = (service: Service): string[] => {
    return service.features?.map(f => f.feature) || []
  }

  const getServiceBenefits = (service: Service): string[] => {
    return service.benefits?.map(b => b.benefit) || []
  }

  // Remove loading check to show content directly with page transition

  return (
    <main className="min-h-screen bg-[#F8F8F8]">
      <Header />
      
      {/* Page Header */}
      <PageHeader 
        title="Layanan Kami"
        subtitle="Digital Mahadata Prima menyediakan solusi teknologi terdepan untuk transformasi digital bisnis Anda. Dari AI hingga otomatisasi, kami memiliki keahlian untuk mengoptimalkan operasional perusahaan Anda."
        breadcrumbs={[
          { label: 'Layanan' }
        ]}
      />

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-figtree">
              Layanan Unggulan Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-plus-jakarta">
              Kami menawarkan solusi teknologi komprehensif yang telah terbukti membantu berbagai industri 
              mencapai transformasi digital yang sukses.
            </p>
          </div>

          <div className="space-y-12">
            {services.map((service, index) => (
              <div key={service.id} className="service-card">
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center mb-6">
                      <div className="text-4xl mr-4">{service.icon}</div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-figtree">
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-lg text-gray-600 mb-8 font-plus-jakarta">
                      {service.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Features */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Fitur Utama:</h4>
                        <ul className="space-y-2">
                          {getServiceFeatures(service).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Manfaat:</h4>
                        <ul className="space-y-2">
                          {getServiceBenefits(service).map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-gray-600">
                              <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5 mr-3">
                                <span className="text-white text-xs">✓</span>
                              </div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="aspect-square bg-linear-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">{service.icon}</div>
                        <h4 className="text-xl font-semibold text-gray-700">
                          Service {service.id}
                        </h4>
                        <p className="text-gray-600 mt-2">
                          Visual representation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Mengapa Memilih Digital Mahadata Prima?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pengalaman, keahlian, dan komitmen kami untuk memberikan solusi terbaik 
              menjadikan DMP partner terpercaya untuk transformasi digital Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Solusi Tepat Sasaran</h3>
              <p className="text-gray-600">
                Kami memahami kebutuhan unik setiap klien dan menyediakan solusi yang disesuaikan 
                dengan objektif bisnis spesifik.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Implementasi Cepat</h3>
              <p className="text-gray-600">
                Tim ahli kami memastikan implementasi yang efisien dengan minimal downtime 
                dan maksimal impact pada bisnis Anda.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Support Berkelanjutan</h3>
              <p className="text-gray-600">
                Dukungan teknis 24/7 dan maintenance berkala untuk memastikan sistem 
                berjalan optimal sepanjang waktu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Transformasi Digital Bisnis Anda?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Konsultasikan kebutuhan teknologi bisnis Anda dengan tim ahli kami. 
            Dapatkan solusi custom yang tepat untuk mengoptimalkan operasional perusahaan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Mulai Konsultasi
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Lihat Case Study
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
