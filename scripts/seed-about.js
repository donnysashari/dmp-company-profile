#!/usr/bin/env node
const { MongoClient } = require('mongodb')

async function seedAboutData() {
  const url = process.env.DATABASE_URI || 'mongodb://localhost:27017'
  const dbName = 'dmp-compro'
  
  const client = new MongoClient(url)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db(dbName)
    const collection = db.collection('abouts')
    
    // Check if data already exists
    const existingData = await collection.findOne({})
    if (existingData) {
      console.log('About data already exists, skipping...')
      return
    }
    
    const aboutData = {
      title: 'About Digital Mahadata Prima',
      heroTitle: 'About Digital Mahadata Prima',
      heroDescription: 'Pioneering digital transformation in Indonesia since 2015, we empower businesses with innovative technology solutions and data-driven insights for sustainable growth.',
      ourStory: {
        title: 'Our Story',
        content: [
          {
            children: [
              {
                text: 'Digital Mahadata Prima was born from a simple yet powerful vision: to democratize access to advanced digital technologies for businesses across Indonesia. Our founders, experienced technology professionals who had worked with global tech giants, recognized a significant gap in the local market.',
              },
            ],
          },
          {
            children: [
              {
                text: 'Many Indonesian businesses were struggling to keep pace with digital transformation, not due to lack of ambition, but due to limited access to world-class technology expertise and solutions. We set out to change that by bringing enterprise-grade digital solutions within reach of local businesses.',
              },
            ],
          },
          {
            children: [
              {
                text: 'Today, we pride ourselves on being more than just a technology vendor. We are strategic partners who understand the unique challenges of the Indonesian business landscape and have the global perspective needed to implement truly effective solutions.',
              },
            ],
          },
        ],
      },
      values: [
        {
          id: Math.random().toString(),
          icon: '🎯',
          title: 'Innovation First',
          description: 'We embrace cutting-edge technologies and innovative approaches to solve complex business challenges.',
        },
        {
          id: Math.random().toString(),
          icon: '🤝',
          title: 'Client Partnership',
          description: 'We build long-term relationships with our clients, becoming their trusted technology partner.',
        },
        {
          id: Math.random().toString(),
          icon: '⭐',
          title: 'Excellence',
          description: 'We strive for excellence in every project, delivering solutions that exceed expectations.',
        },
        {
          id: Math.random().toString(),
          icon: '🔍',
          title: 'Data-Driven',
          description: 'Every decision and recommendation is backed by comprehensive data analysis and insights.',
        },
      ],
      timeline: [
        {
          id: Math.random().toString(),
          year: '2015',
          title: 'Company Founded',
          description: 'Digital Mahadata Prima was established with a vision to bridge the digital gap for Indonesian businesses.',
        },
        {
          id: Math.random().toString(),
          year: '2017',
          title: 'First Major Contract',
          description: 'Secured our first enterprise client, delivering a comprehensive data analytics platform for a national retail chain.',
        },
        {
          id: Math.random().toString(),
          year: '2019',
          title: 'Cloud Expansion',
          description: 'Expanded our services to include cloud migration and infrastructure management, partnering with AWS and Azure.',
        },
        {
          id: Math.random().toString(),
          year: '2021',
          title: 'AI & ML Division',
          description: 'Launched our artificial intelligence and machine learning division to help clients leverage predictive analytics.',
        },
        {
          id: Math.random().toString(),
          year: '2023',
          title: 'Regional Growth',
          description: 'Expanded operations to serve clients across Southeast Asia, establishing partnerships in Malaysia and Singapore.',
        },
      ],
      team: [
        {
          id: Math.random().toString(),
          name: 'Dr. Ahmad Sutarto',
          position: 'CEO & Founder',
          bio: '15+ years experience in digital transformation and data science. PhD in Computer Science from ITB.',
        },
        {
          id: Math.random().toString(),
          name: 'Sarah Wijaya',
          position: 'CTO',
          bio: 'Former Google engineer with expertise in cloud architecture and scalable systems design.',
        },
        {
          id: Math.random().toString(),
          name: 'Michael Chen',
          position: 'Head of Data Science',
          bio: 'ML expert with 10+ years experience in predictive analytics and AI implementation.',
        },
        {
          id: Math.random().toString(),
          name: 'Rina Sari',
          position: 'Head of Business Development',
          bio: 'Strategic business leader with extensive experience in enterprise client relationship management.',
        },
      ],
      statistics: {
        title: 'By the Numbers',
        stats: [
          {
            id: Math.random().toString(),
            number: '50+',
            label: 'Projects Completed',
          },
          {
            id: Math.random().toString(),
            number: '30+',
            label: 'Happy Clients',
          },
          {
            id: Math.random().toString(),
            number: '8+',
            label: 'Years Experience',
          },
          {
            id: Math.random().toString(),
            number: '99%',
            label: 'Success Rate',
          },
        ],
      },
      cta: {
        title: 'Ready to Work With Us?',
        description: 'Join the many businesses that have transformed their operations with our expertise.',
        primaryButtonText: 'Get In Touch',
        secondaryButtonText: 'View Our Work',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    await collection.insertOne(aboutData)
    console.log('✅ About data seeded successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding about data:', error)
  } finally {
    await client.close()
  }
}

seedAboutData()
