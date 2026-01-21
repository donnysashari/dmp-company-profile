import { getPayload } from 'payload'
import config from '../src/payload.config'

const mockPortfolioData = [
  {
    title: 'E-Commerce Analytics Dashboard',
    slug: 'ecommerce-analytics-dashboard',
    description: 'Real-time analytics dashboard for major retail chain with 500+ stores',
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
    projectUrl: 'https://dashboard.retailmax.id',
    challenge: 'RetailMax needed to centralize data from multiple sources and provide real-time insights to store managers and executives. The existing system was fragmented and couldn\'t handle the scale of operations.',
    solution: 'We developed a modern analytics platform using React and D3.js for the frontend, with Python-based data processing pipelines running on AWS. The system aggregates data from POS systems, inventory management, and customer databases.',
    results: [
      { result: '40% improvement in decision-making speed' },
      { result: '25% reduction in inventory wastage' },
      { result: '60% faster report generation' },
      { result: 'Real-time monitoring across 500+ locations' }
    ],
    testimonial: {
      quote: 'Digital Mahadata Prima transformed how we understand our business. The dashboard provides insights we never had before.',
      author: 'Budi Santoso',
      position: 'CTO, RetailMax Indonesia'
    }
  },
  {
    title: 'Banking Mobile Application',
    slug: 'banking-mobile-app',
    description: 'Secure mobile banking app with biometric authentication',
    client: 'Bank Mandiri',
    category: 'mobile',
    technologies: [
      { technology: 'React Native' },
      { technology: 'Node.js' },
      { technology: 'PostgreSQL' },
      { technology: 'Redis' }
    ],
    featured: true,
    completedAt: '2023-11-15',
    challenge: 'Bank Mandiri needed a secure, user-friendly mobile banking solution that could handle millions of transactions while maintaining top-level security standards.',
    solution: 'Built with React Native for cross-platform compatibility, featuring biometric authentication, end-to-end encryption, and real-time transaction monitoring.',
    results: [
      { result: '2M+ active users within 6 months' },
      { result: '99.9% uptime reliability' },
      { result: '50% reduction in call center inquiries' },
      { result: 'Zero security incidents since launch' }
    ],
    testimonial: {
      quote: 'The mobile app has revolutionized how our customers interact with our services. User adoption exceeded all expectations.',
      author: 'Sarah Wijaya',
      position: 'Head of Digital Banking, Bank Mandiri'
    }
  },
  {
    title: 'Cloud Infrastructure Migration',
    slug: 'cloud-migration-project',
    description: 'Complete migration of legacy systems to cloud infrastructure',
    client: 'PT Telkom Indonesia',
    category: 'cloud',
    technologies: [
      { technology: 'AWS' },
      { technology: 'Docker' },
      { technology: 'Kubernetes' },
      { technology: 'Terraform' }
    ],
    featured: false,
    completedAt: '2023-10-15',
    challenge: 'PT Telkom needed to modernize their legacy infrastructure to support digital transformation initiatives while maintaining service continuity for millions of users.',
    solution: 'Implemented a phased migration approach using containerization with Docker and Kubernetes, automated deployment with Terraform, and comprehensive monitoring on AWS.',
    results: [
      { result: '70% reduction in infrastructure costs' },
      { result: '99.99% service availability' },
      { result: '10x faster deployment cycles' },
      { result: 'Auto-scaling capabilities implemented' }
    ],
    testimonial: {
      quote: 'The cloud migration project was executed flawlessly. Our infrastructure is now more reliable and cost-effective than ever.',
      author: 'Ahmad Rahman',
      position: 'CTO, PT Telkom Indonesia'
    }
  },
  {
    title: 'Healthcare Management System',
    slug: 'healthcare-management-system',
    description: 'Comprehensive hospital management system with patient portal',
    client: 'RS Siloam',
    category: 'web',
    technologies: [
      { technology: 'Next.js' },
      { technology: 'TypeScript' },
      { technology: 'PostgreSQL' },
      { technology: 'Redis' }
    ],
    featured: false,
    completedAt: '2023-09-15',
    challenge: 'RS Siloam required a unified system to manage patient records, appointments, billing, and staff scheduling across multiple hospital locations.',
    solution: 'Developed a comprehensive web-based platform using Next.js and TypeScript, with real-time synchronization across all hospital branches and a patient portal for appointment booking.',
    results: [
      { result: '60% reduction in appointment scheduling time' },
      { result: '40% improvement in patient satisfaction' },
      { result: '80% reduction in paperwork' },
      { result: 'Real-time data across all branches' }
    ],
    testimonial: {
      quote: 'This system has streamlined our operations significantly. Staff productivity and patient care quality have both improved dramatically.',
      author: 'Dr. Lisa Hartono',
      position: 'Director of Operations, RS Siloam'
    }
  }
]

export async function importPortfolioData() {
  try {
    const payload = await getPayload({ config })
    
    console.log('Starting portfolio data import...')
    
    for (const item of mockPortfolioData) {
      try {
        // Check if portfolio with this slug already exists
        const existingPortfolio = await payload.find({
          collection: 'portfolio',
          where: {
            slug: {
              equals: item.slug
            }
          },
          limit: 1
        })
        
        if (existingPortfolio.docs.length > 0) {
          console.log(`Portfolio "${item.title}" already exists, skipping...`)
          continue
        }
        
        // Create new portfolio entry
        const result = await payload.create({
          collection: 'portfolio',
          data: item
        })
        
        console.log(`✓ Created portfolio: ${item.title} (ID: ${result.id})`)
      } catch (error) {
        console.error(`✗ Error creating portfolio "${item.title}":`, error)
      }
    }
    
    console.log('Portfolio import completed!')
  } catch (error) {
    console.error('Error importing portfolio data:', error)
  }
}

// Run the import if this script is executed directly
if (require.main === module) {
  importPortfolioData()
    .then(() => {
      console.log('Import script finished')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Import script failed:', error)
      process.exit(1)
    })
}
