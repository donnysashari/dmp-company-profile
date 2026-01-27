'use client'

import { useEffect, useRef } from 'react'
import { AnimationManager } from '@/lib/animation-utils'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const componentId = 'about-animations'
    const section = sectionRef.current
    const title = titleRef.current
    const content = contentRef.current
    const stats = statsRef.current

    if (section && title && content && stats) {
      // Initialize elements with hidden state
      AnimationManager.animateElement(title, { opacity: 0, y: 50 })
      AnimationManager.animateElement(content, { opacity: 0, y: 50 })
      AnimationManager.animateElement(stats, { opacity: 0, y: 50 })

      // Create main timeline with scroll trigger
      const tl = AnimationManager.createTimeline(componentId, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      })

      if (tl) {
        tl.to(title, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
          .to(content, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
          .to(stats, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      }

      // Animate stat numbers
      const statNumbers = stats.querySelectorAll('.stat-number')
      statNumbers.forEach((stat) => {
        const finalValue = parseInt(stat.textContent || '0')
        
        AnimationManager.animateElement(stat as HTMLElement, {
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
          },
          onUpdate: function() {
            this.targets()[0].textContent = Math.round(this.progress() * finalValue)
          },
          onComplete: function() {
            this.targets()[0].textContent = finalValue
          }
        })
      })
    }

    // Cleanup function
    return () => {
      AnimationManager.cleanup(componentId)
    }
  }, [])

  const stats = [
    { number: 50, label: 'Projects Completed', suffix: '+' },
    { number: 15, label: 'Years Experience', suffix: '+' },
    { number: 30, label: 'Happy Clients', suffix: '+' },
    { number: 99, label: 'Success Rate', suffix: '%' }
  ]

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div ref={titleRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Digital Mahadata Prima</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a leading digital transformation company dedicated to empowering businesses 
              with innovative technology solutions and data-driven insights.
            </p>
          </div>

          {/* Content Grid */}
          <div ref={contentRef} className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To bridge the gap between traditional business operations and modern digital solutions. 
                We believe in the power of data and technology to transform industries and create 
                sustainable competitive advantages for our clients.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our team of experts combines deep industry knowledge with cutting-edge technical 
                skills to deliver solutions that not only meet current needs but also prepare 
                businesses for future challenges and opportunities.
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Data-Driven Solutions</h4>
                    <p className="text-gray-600">Every decision backed by comprehensive data analysis and insights.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Agile Methodology</h4>
                    <p className="text-gray-600">Flexible, iterative development process ensuring rapid delivery.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Long-term Partnership</h4>
                    <p className="text-gray-600">Building lasting relationships through continuous support and innovation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  <span className="stat-number">{stat.number}</span>{stat.suffix}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
