'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimationManager } from '@/lib/animation-utils'
import Header from '@/components/Header'
import PageHeader from '@/components/PageHeader'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { AboutData } from '@/types/about'

export default function AboutPage() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/about')
        if (response.ok) {
          const data = await response.json()
          setAboutData(data)
        } else {
          console.warn('Using fallback data')
          // Use fallback data if API fails
          setAboutData(getFallbackData())
        }
      } catch (error) {
        console.warn('Error fetching about data, using fallback:', error)
        setAboutData(getFallbackData())
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  useEffect(() => {
    if (!aboutData || loading) return

    const componentId = 'about-page-animations'

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

    // Content sections animation
    const contentSections = document.querySelectorAll('.content-section')
    contentSections.forEach(section => {
      AnimationManager.animateElement(section as HTMLElement, { opacity: 0, y: 50 })
    })
    
    if (contentRef.current) {
      const contentTimeline = AnimationManager.createTimeline(`${componentId}-content`, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
      
      if (contentTimeline) {
        contentTimeline.to(contentSections, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: 'power3.out'
        })
      }
    }

    return () => {
      AnimationManager.cleanup(componentId)
    }
  }, [aboutData, loading])

  // Fallback data function
  const getFallbackData = (): AboutData => ({
    id: 'fallback',
    title: 'Tentang Digital Mahadata Prima',
    heroTitle: 'Tentang Digital Mahadata Prima',
    heroDescription: 'Memimpin transformasi digital di Indonesia sejak 2015, kami memberdayakan bisnis dengan solusi teknologi inovatif dan wawasan berbasis data untuk pertumbuhan berkelanjutan.',
    ourStory: {
      title: 'Cerita Kami',
      content: []
    },
    values: [
      {
        icon: '🎯',
        title: 'Inovasi Utama',
        description: 'Kami mengembangkan teknologi terdepan dan pendekatan inovatif untuk menyelesaikan tantangan bisnis yang kompleks.'
      },
      {
        icon: '🤝',
        title: 'Kemitraan Klien',
        description: 'Kami membangun hubungan jangka panjang dengan klien, menjadi mitra teknologi terpercaya mereka.'
      },
      {
        icon: '⭐',
        title: 'Keunggulan',
        description: 'Kami berusaha untuk mencapai keunggulan dalam setiap proyek, memberikan solusi yang melebihi ekspektasi.'
      },
      {
        icon: '🔍',
        title: 'Berbasis Data',
        description: 'Setiap keputusan didukung oleh analisis data komprehensif dan wawasan mendalam.'
      }
    ],
    timeline: [
      {
        year: '2015',
        title: 'Perusahaan Didirikan',
        description: 'Digital Mahadata Prima didirikan dengan visi untuk menjembatani kesenjangan digital bagi bisnis Indonesia.'
      },
      {
        year: '2017',
        title: 'Kontrak Besar Pertama',
        description: 'Mengamankan klien enterprise pertama, memberikan platform analisis data komprehensif untuk jaringan retail nasional.'
      },
      {
        year: '2019',
        title: 'Ekspansi Cloud',
        description: 'Memperluas layanan untuk migrasi cloud dan manajemen infrastruktur, bermitra dengan AWS dan Azure.'
      },
      {
        year: '2021',
        title: 'Divisi AI & ML',
        description: 'Meluncurkan divisi kecerdasan buatan dan machine learning untuk membantu klien memanfaatkan analisis prediktif.'
      },
      {
        year: '2023',
        title: 'Pertumbuhan Regional',
        description: 'Memperluas operasi untuk melayani klien di Asia Tenggara, membangun kemitraan di Malaysia dan Singapura.'
      }
    ],
    team: [
      {
        name: 'Dr. Ahmad Sutarto',
        position: 'CEO & Pendiri',
        bio: 'Pengalaman 15+ tahun dalam transformasi digital dan data science. PhD Ilmu Komputer dari ITB.'
      },
      {
        name: 'Sarah Wijaya',
        position: 'CTO',
        bio: 'Mantan insinyur Google dengan keahlian dalam arsitektur cloud dan desain sistem yang scalable.'
      },
      {
        name: 'Michael Chen',
        position: 'Kepala Data Science',
        bio: 'Ahli ML dengan pengalaman 10+ tahun dalam analisis prediktif dan implementasi AI.'
      },
      {
        name: 'Rina Sari',
        position: 'Kepala Pengembangan Bisnis',
        bio: 'Pemimpin bisnis strategis dengan pengalaman luas dalam manajemen hubungan klien enterprise.'
      }
    ],
    statistics: {
      title: 'Dalam Angka',
      stats: [
        { number: '50+', label: 'Proyek Diselesaikan' },
        { number: '30+', label: 'Klien Puas' },
        { number: '8+', label: 'Tahun Pengalaman' },
        { number: '99%', label: 'Tingkat Keberhasilan' }
      ]
    },
    cta: {
      title: 'Siap Bekerja Sama Dengan Kami?',
      description: 'Bergabunglah dengan banyak bisnis yang telah mentransformasi operasi mereka dengan keahlian kami.',
      primaryButtonText: 'Hubungi Kami',
      secondaryButtonText: 'Lihat Karya Kami'
    },
    createdAt: '',
    updatedAt: ''
  })

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </main>
    )
  }

  if (!aboutData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to load About page</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F8F8F8]">
      <Header />
      
      {/* Page Header */}
      <PageHeader 
        title={aboutData.heroTitle}
        subtitle={aboutData.heroDescription}
        breadcrumbs={[
          { label: 'Tentang Kami' }
        ]}
      />

      {/* Main Content */}
      <section ref={contentRef} className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-6">
          
          {/* Our Story */}
          <div className="content-section max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center font-figtree">{aboutData.ourStory.title}</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="text-xl leading-relaxed mb-6 font-plus-jakarta">
                Digital Mahadata Prima lahir dari visi yang sederhana namun kuat: untuk mendemokratisasi akses 
                ke teknologi digital canggih bagi bisnis di seluruh Indonesia. Para pendiri kami, 
                profesional teknologi berpengalaman yang telah bekerja dengan raksasa teknologi global, 
                mengenali kesenjangan yang signifikan di pasar lokal.
              </p>
              <p className="text-xl leading-relaxed mb-6 font-plus-jakarta">
                Banyak bisnis Indonesia kesulitan mengikuti transformasi digital, 
                bukan karena kurang ambisi, tetapi karena keterbatasan akses ke keahlian dan solusi 
                teknologi kelas dunia. Kami bertekad mengubah hal itu dengan membawa 
                solusi digital tingkat enterprise dalam jangkauan bisnis lokal.
              </p>
              <p className="text-xl leading-relaxed font-plus-jakarta">
                Saat ini, kami telah menjadi mitra transformasi digital terpercaya bagi berbagai perusahaan, 
                dari startup hingga korporasi besar. Komitmen kami terhadap inovasi, kualitas, dan 
                kemitraan jangka panjang telah memungkinkan klien kami mencapai pertumbuhan yang berkelanjutan 
                melalui teknologi.
              </p>
              <p className="text-xl leading-relaxed font-plus-jakarta">
                Today, we pride ourselves on being more than just a technology vendor. We are 
                strategic partners who understand the unique challenges of the Indonesian business 
                landscape and have the global perspective needed to implement truly effective solutions.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="content-section mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center font-figtree">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutData.values.map((value, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="text-6xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-figtree">{value.title}</h3>
                  <p className="text-gray-600 font-plus-jakarta">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="content-section mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center font-figtree">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              {aboutData.timeline.map((item, index) => (
                <div key={index} className="flex items-start mb-12 last:mb-0">
                  <div className="shrink-0 w-24 text-right mr-8">
                    <span className="text-2xl font-bold text-blue-600">{item.year}</span>
                  </div>
                  <div className="shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2 mr-8"></div>
                  <div className="grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Team */}
          <div className="content-section mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Leadership Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutData.team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                    {member.image?.url ? (
                      <Image src={member.image.url} alt={member.image.alt || member.name} className="w-full h-full object-cover" width={192} height={192} />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <span className="text-gray-600 text-4xl">
                          {member.name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="content-section bg-gray-50 rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">{aboutData.statistics.title}</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {aboutData.statistics.stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{aboutData.cta.title}</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {aboutData.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                {aboutData.cta.primaryButtonText}
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                {aboutData.cta.secondaryButtonText}
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
