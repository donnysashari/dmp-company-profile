#!/usr/bin/env node
const { MongoClient } = require('mongodb')

const pages = [
  {
    title: 'Home',
    slug: 'home',
    pageType: 'home',
    status: 'published',
    description: 'Main landing page showcasing our digital transformation services and company overview.',
    seo: {
      metaTitle: 'Digital Mahadata Prima - Leading Digital Transformation Solutions in Indonesia',
      metaDescription: 'Transform your business with AI, RPA, Smart Campus solutions, and custom software development from Digital Mahadata Prima. Your trusted digital partner since 2015.',
      keywords: 'digital transformation, AI solutions, RPA, smart campus, software development, Indonesia',
    },
    navigation: {
      showInMainMenu: true,
      showInFooter: false,
      menuOrder: 1,
      menuLabel: 'Home'
    },
    content: {
      hasHeroSection: true,
      hasContactForm: false,
      enableComments: false,
    },
    analytics: {
      trackPageViews: true,
      conversionGoals: [
        {
          goalName: 'Hero CTA Click',
          goalType: 'service'
        }
      ]
    }
  },
  {
    title: 'About Us',
    slug: 'about',
    pageType: 'about',
    status: 'published',
    description: 'Learn about our company history, mission, vision, team, and values that drive our digital transformation expertise.',
    seo: {
      metaTitle: 'About Digital Mahadata Prima - Your Digital Transformation Partner',
      metaDescription: 'Discover the story, mission, and expert team behind Digital Mahadata Prima. Leading Indonesia\'s digital transformation since 2015 with innovative solutions.',
      keywords: 'about DMP, company history, digital transformation experts, Indonesia technology company',
    },
    navigation: {
      showInMainMenu: true,
      showInFooter: true,
      menuOrder: 2,
      menuLabel: 'About'
    },
    content: {
      hasHeroSection: true,
      hasContactForm: false,
      enableComments: false,
    },
    analytics: {
      trackPageViews: true,
      conversionGoals: [
        {
          goalName: 'About CTA Click',
          goalType: 'contact'
        }
      ]
    }
  },
  {
    title: 'Our Services',
    slug: 'services',
    pageType: 'services',
    status: 'published',
    description: 'Comprehensive digital services including AI solutions, RPA automation, Smart Campus systems, and custom software development.',
    seo: {
      metaTitle: 'Digital Services - AI, RPA, Smart Campus & Software Development',
      metaDescription: 'Explore our comprehensive digital services: AI solutions, RPA automation, Smart Campus systems, digital payments, and custom software development tailored for your business needs.',
      keywords: 'AI solutions, RPA automation, smart campus, LMS, digital payment, software development services',
    },
    navigation: {
      showInMainMenu: true,
      showInFooter: true,
      menuOrder: 3,
      menuLabel: 'Services'
    },
    content: {
      hasHeroSection: true,
      hasContactForm: true,
      enableComments: false,
    },
    analytics: {
      trackPageViews: true,
      conversionGoals: [
        {
          goalName: 'Service Inquiry',
          goalType: 'service'
        },
        {
          goalName: 'Contact Form Submit',
          goalType: 'contact'
        }
      ]
    }
  },
  {
    title: 'Portfolio',
    slug: 'portfolio',
    pageType: 'portfolio',
    status: 'published',
    description: 'Showcase of our successful digital transformation projects and case studies across various industries.',
    seo: {
      metaTitle: 'Portfolio - Digital Transformation Success Stories & Case Studies',
      metaDescription: 'Discover our portfolio of successful digital transformation projects, case studies, and client success stories that demonstrate our expertise and results.',
      keywords: 'portfolio, case studies, digital transformation projects, success stories, client testimonials',
    },
    navigation: {
      showInMainMenu: true,
      showInFooter: true,
      menuOrder: 4,
      menuLabel: 'Portfolio'
    },
    content: {
      hasHeroSection: true,
      hasContactForm: false,
      enableComments: false,
    },
    analytics: {
      trackPageViews: true,
      conversionGoals: [
        {
          goalName: 'Portfolio CTA',
          goalType: 'contact'
        }
      ]
    }
  },
  {
    title: 'Contact Us',
    slug: 'contact',
    pageType: 'contact',
    status: 'published',
    description: 'Get in touch with our team for consultation, project inquiries, and digital transformation discussions.',
    seo: {
      metaTitle: 'Contact Digital Mahadata Prima - Start Your Digital Transformation Today',
      metaDescription: 'Ready to transform your business? Contact our digital transformation experts for consultation, project quotes, and discover how we can accelerate your business growth.',
      keywords: 'contact DMP, digital transformation consultation, project inquiry, get quote, business consultation',
    },
    navigation: {
      showInMainMenu: true,
      showInFooter: true,
      menuOrder: 5,
      menuLabel: 'Contact'
    },
    content: {
      hasHeroSection: true,
      hasContactForm: true,
      enableComments: false,
    },
    analytics: {
      trackPageViews: true,
      conversionGoals: [
        {
          goalName: 'Contact Form Submit',
          goalType: 'contact'
        },
        {
          goalName: 'Consultation Request',
          goalType: 'service'
        }
      ]
    }
  }
]

async function seedPages() {
  const url = process.env.DATABASE_URI || 'mongodb://localhost:27017'
  const dbName = 'dmp-compro'
  
  const client = new MongoClient(url)
  
  try {
    await client.connect()
    console.log('🔗 Connected to MongoDB')
    
    const db = client.db(dbName)
    const collection = db.collection('pages')
    
    // Check if pages already exist
    const existingCount = await collection.countDocuments()
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing pages. Skipping seed...`)
      return
    }
    
    // Add timestamps
    const pagesWithTimestamps = pages.map(page => ({
      ...page,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
    
    const result = await collection.insertMany(pagesWithTimestamps)
    
    console.log(`✅ Successfully seeded ${result.insertedCount} pages:`)
    pages.forEach((page, index) => {
      const status = page.status === 'published' ? '🟢' : '🟡'
      const menu = page.navigation.showInMainMenu ? '📋' : '  '
      console.log(`   ${index + 1}. ${status} ${menu} ${page.title} (/${page.slug})`)
    })
    
    console.log('\n📊 Pages Summary:')
    console.log(`   • Total Pages: ${pages.length}`)
    console.log(`   • Published: ${pages.filter(p => p.status === 'published').length}`)
    console.log(`   • In Main Menu: ${pages.filter(p => p.navigation.showInMainMenu).length}`)
    console.log(`   • With Hero Section: ${pages.filter(p => p.content.hasHeroSection).length}`)
    console.log(`   • With Contact Form: ${pages.filter(p => p.content.hasContactForm).length}`)
    
  } catch (error) {
    console.error('❌ Error seeding pages:', error)
  } finally {
    await client.close()
    console.log('🔌 Database connection closed')
  }
}

seedPages()
