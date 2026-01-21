import configPromise from '../src/payload.config'
import { getPayload } from 'payload'

const seedServices = async () => {
  const payload = await getPayload({ config: configPromise })

  console.log('Seeding services data...')

  const servicesData = [
    {
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
      status: 'active'
    },
    {
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
      status: 'active'
    },
    {
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
      status: 'active'
    },
    {
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
      status: 'active'
    },
    {
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
      status: 'active'
    }
  ]

  try {
    // Clear existing services (optional)
    // await payload.delete({
    //   collection: 'services',
    //   where: {}
    // })

    // Insert services
    for (const serviceData of servicesData) {
      const result = await payload.create({
        collection: 'services',
        data: serviceData
      })
      console.log(`✅ Created service: ${result.title}`)
    }

    console.log('🎉 Services seeding completed!')
  } catch (error) {
    console.error('Error seeding services:', error)
  }

  process.exit(0)
}

// Run the seeding function
if (require.main === module) {
  seedServices()
}
