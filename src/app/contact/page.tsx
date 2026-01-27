'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimationManager } from '@/lib/animation-utils'
import Header from '@/components/Header'
import PageHeader from '@/components/PageHeader'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [showTransition, setShowTransition] = useState(true)

  useEffect(() => {
    const componentId = 'contact-page-animations'

    // Wait for page transition to complete before starting content animations
    const startAnimations = () => {
      // Hero animation
      const heroContent = document.querySelector('.hero-content')
      if (heroContent) {
        // Set initial state without animation
        AnimationManager.animateElement(heroContent as HTMLElement, { y: 50, opacity: 0 })
        
        const heroTimeline = AnimationManager.createTimeline(`${componentId}-hero`, { delay: 0.3 })
        if (heroTimeline) {
          heroTimeline.to(heroContent, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
          })
        }
      }

      // Form animation
      const contactSections = document.querySelectorAll('.contact-section')
      contactSections.forEach(section => {
        AnimationManager.animateElement(section as HTMLElement, { opacity: 0, y: 50 })
      })
      
      if (formRef.current) {
        const formTimeline = AnimationManager.createTimeline(`${componentId}-form`, {
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })
        
        if (formTimeline) {
          formTimeline.to(contactSections, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
          })
        }
      }
    }

    // Delay content animations to wait for page transition
    const timer = setTimeout(startAnimations, 1800)

    return () => {
      clearTimeout(timer)
      AnimationManager.cleanup(componentId)
    }
  }, [])

  const handleTransitionComplete = () => {
    setShowTransition(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage('Thank you for your message! We will get back to you within 24 hours.')
    }, 2000)
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      details: 'info@digitalmahadata.com',
      action: 'mailto:info@digitalmahadata.com'
    },
    {
      icon: '📞',
      title: 'Phone',
      details: '+62 21 1234 5678',
      action: 'tel:+622112345678'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      details: '+62 812 3456 7890',
      action: 'https://wa.me/6281234567890'
    },
    {
      icon: '📍',
      title: 'Office',
      details: 'Menara Kuningan, Jakarta Selatan',
      action: 'https://maps.google.com'
    }
  ]

  const offices = [
    {
      city: 'Jakarta',
      address: 'Menara Kuningan, 12th Floor\nJl. HR. Rasuna Said Blok X-7 Kavling 5\nJakarta Selatan 12940',
      phone: '+62 21 1234 5678',
      email: 'jakarta@digitalmahadata.com'
    },
    {
      city: 'Surabaya',
      address: 'Pakuwon Tower, 15th Floor\nJl. Embong Malang No. 1-5\nSurabaya 60261',
      phone: '+62 31 9876 5432',
      email: 'surabaya@digitalmahadata.com'
    }
  ]

  return (
    <>
      <PageTransition 
        isActive={showTransition} 
        onComplete={handleTransitionComplete}
      />
      
      <main className="min-h-screen bg-[#F8F8F8]">
        <Header />
        
        {/* Page Header */}
        <PageHeader 
          title="Hubungi Kami"
          subtitle="Siap mentransformasi bisnis Anda? Mari diskusikan bagaimana kami dapat membantu Anda mencapai tujuan transformasi digital."
          breadcrumbs={[
            { label: 'Kontak' }
          ]}
        />

      {/* Contact Form & Info */}
      <section ref={formRef} className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="contact-section">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 font-figtree">Kirim Pesan</h2>
                
                {submitMessage && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    {submitMessage}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2 font-plus-jakarta">
                        Nama Depan *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-plus-jakarta"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2 font-plus-jakarta">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-plus-jakarta"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-plus-jakarta">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-plus-jakarta"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 font-plus-jakarta">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-plus-jakarta"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2 font-plus-jakarta">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-plus-jakarta"
                      placeholder="Your Company Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2 font-plus-jakarta">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-plus-jakarta"
                    >
                      <option value="">Select a service</option>
                      <option value="data-analytics">Data Analytics & BI</option>
                      <option value="digital-transformation">Digital Transformation</option>
                      <option value="cybersecurity">Cybersecurity Solutions</option>
                      <option value="custom-development">Custom Software Development</option>
                      <option value="cloud-infrastructure">Cloud Infrastructure</option>
                      <option value="ai-ml">AI & Machine Learning</option>
                      <option value="consultation">General Consultation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-plus-jakarta">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none font-plus-jakarta"
                      placeholder="Tell us about your project requirements..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-plus-jakarta"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="contact-section">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 font-figtree">Contact Information</h2>
                
                {/* Quick Contact */}
                <div className="grid grid-cols-2 gap-4 mb-12">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.action}
                      target={info.action.startsWith('http') ? '_blank' : '_self'}
                      rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <div className="text-4xl mb-3">{info.icon}</div>
                      <h3 className="font-semibold text-gray-900 mb-1 font-figtree">{info.title}</h3>
                      <p className="text-sm text-gray-600 text-center font-plus-jakarta">{info.details}</p>
                    </a>
                  ))}
                </div>

                {/* Office Locations */}
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-figtree">Our Offices</h3>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3 font-figtree">{office.city}</h4>
                      <div className="space-y-2">
                        <p className="text-gray-600 whitespace-pre-line font-plus-jakarta">{office.address}</p>
                        <p className="text-gray-600 font-plus-jakarta">
                          <span className="font-medium">Phone:</span> {office.phone}
                        </p>
                        <p className="text-gray-600 font-plus-jakarta">
                          <span className="font-medium">Email:</span> {office.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Business Hours */}
                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-figtree">Business Hours</h3>
                  <div className="space-y-2 text-gray-600 font-plus-jakarta">
                    <p><span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                    <p><span className="font-medium">Saturday:</span> 9:00 AM - 1:00 PM</p>
                    <p><span className="font-medium">Sunday:</span> Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 font-figtree">Temukan Kami</h2>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15824.916522465808!2d112.72952300000001!3d-7.439881!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e700258d7d87%3A0xc6079ab1e6e22364!2sPT%20DIGITAL%20MAHADATA%20PRIMA%20(CABANG)!5e0!3m2!1sid!2sid!4v1769490683005!5m2!1sid!2sid" 
                width="100%" 
                height="450" 
                style={{border: 0}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
    </>
  )
}
