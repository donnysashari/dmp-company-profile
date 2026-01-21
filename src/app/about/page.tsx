'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/Header'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero animation
    const tl = gsap.timeline({ delay: 0.5 })
    tl.from('.hero-content', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })

    // Content sections animation
    gsap.set('.content-section', { opacity: 0, y: 50 })
    
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.content-section', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: 'power3.out'
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const values = [
    {
      icon: '🎯',
      title: 'Innovation First',
      description: 'We embrace cutting-edge technologies and innovative approaches to solve complex business challenges.'
    },
    {
      icon: '🤝',
      title: 'Client Partnership',
      description: 'We build long-term relationships with our clients, becoming their trusted technology partner.'
    },
    {
      icon: '⭐',
      title: 'Excellence',
      description: 'We strive for excellence in every project, delivering solutions that exceed expectations.'
    },
    {
      icon: '🔍',
      title: 'Data-Driven',
      description: 'Every decision and recommendation is backed by comprehensive data analysis and insights.'
    }
  ]

  const timeline = [
    {
      year: '2015',
      title: 'Company Founded',
      description: 'Digital Mahadata Prima was established with a vision to bridge the digital gap for Indonesian businesses.'
    },
    {
      year: '2017',
      title: 'First Major Contract',
      description: 'Secured our first enterprise client, delivering a comprehensive data analytics platform for a national retail chain.'
    },
    {
      year: '2019',
      title: 'Cloud Expansion',
      description: 'Expanded our services to include cloud migration and infrastructure management, partnering with AWS and Azure.'
    },
    {
      year: '2021',
      title: 'AI & ML Division',
      description: 'Launched our artificial intelligence and machine learning division to help clients leverage predictive analytics.'
    },
    {
      year: '2023',
      title: 'Regional Growth',
      description: 'Expanded operations to serve clients across Southeast Asia, establishing partnerships in Malaysia and Singapore.'
    }
  ]

  const team = [
    {
      name: 'Dr. Ahmad Sutarto',
      position: 'CEO & Founder',
      bio: '15+ years experience in digital transformation and data science. PhD in Computer Science from ITB.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Sarah Wijaya',
      position: 'CTO',
      bio: 'Former Google engineer with expertise in cloud architecture and scalable systems design.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Michael Chen',
      position: 'Head of Data Science',
      bio: 'ML expert with 10+ years experience in predictive analytics and AI implementation.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Rina Sari',
      position: 'Head of Business Development',
      bio: 'Strategic business leader with extensive experience in enterprise client relationship management.',
      image: '/api/placeholder/300/300'
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-24 pb-16 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <div className="hero-content max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-blue-400">Digital Mahadata Prima</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Pioneering digital transformation in Indonesia since 2015, we empower businesses 
              with innovative technology solutions and data-driven insights for sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-20">
        <div className="container mx-auto px-6">
          
          {/* Our Story */}
          <div className="content-section max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="text-xl leading-relaxed mb-6">
                Digital Mahadata Prima was born from a simple yet powerful vision: to democratize access 
                to advanced digital technologies for businesses across Indonesia. Our founders, 
                experienced technology professionals who had worked with global tech giants, 
                recognized a significant gap in the local market.
              </p>
              <p className="text-xl leading-relaxed mb-6">
                Many Indonesian businesses were struggling to keep pace with digital transformation, 
                not due to lack of ambition, but due to limited access to world-class technology 
                expertise and solutions. We set out to change that by bringing enterprise-grade 
                digital solutions within reach of local businesses.
              </p>
              <p className="text-xl leading-relaxed">
                Today, we pride ourselves on being more than just a technology vendor. We are 
                strategic partners who understand the unique challenges of the Indonesian business 
                landscape and have the global perspective needed to implement truly effective solutions.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="content-section mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="text-6xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="content-section mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start mb-12 last:mb-0">
                  <div className="flex-shrink-0 w-24 text-right mr-8">
                    <span className="text-2xl font-bold text-blue-600">{item.year}</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2 mr-8"></div>
                  <div className="flex-grow">
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
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <span className="text-gray-600 text-4xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">By the Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
                <p className="text-gray-600">Happy Clients</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">8+</div>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the many businesses that have transformed their operations with our expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Get In Touch
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                View Our Work
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
