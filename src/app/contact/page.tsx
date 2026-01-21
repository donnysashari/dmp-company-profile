'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/Header'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    // Hero animation
    const tl = gsap.timeline({ delay: 0.5 })
    tl.from('.hero-content', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })

    // Form animation
    gsap.set('.contact-section', { opacity: 0, y: 50 })
    
    ScrollTrigger.create({
      trigger: formRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.contact-section', {
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
              Get In <span className="text-blue-400">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Ready to transform your business? Let&apos;s discuss how we can help you 
              achieve your digital transformation goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section ref={formRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="contact-section">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
                
                {submitMessage && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    {submitMessage}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your Company Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us about your project requirements..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="contact-section">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
                
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
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-sm text-gray-600 text-center">{info.details}</p>
                    </a>
                  ))}
                </div>

                {/* Office Locations */}
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Offices</h3>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{office.city}</h4>
                      <div className="space-y-2">
                        <p className="text-gray-600 whitespace-pre-line">{office.address}</p>
                        <p className="text-gray-600">
                          <span className="font-medium">Phone:</span> {office.phone}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Email:</span> {office.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Business Hours */}
                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h3>
                  <div className="space-y-2 text-gray-600">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Find Us</h2>
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <p className="text-gray-600">Interactive Map Integration</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
