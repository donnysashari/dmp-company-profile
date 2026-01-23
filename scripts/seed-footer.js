// Simple script to create footer data via HTTP POST
const footerData = {
  companyName: 'PT. Digital Mahadata Prima',
  companyDescription: 'Kami membantu organisasi mentransformasikan bisnis mereka melalui perangkat lunak digital dan layanan TIK yang unggul.',
  navigationTitle: 'Perusahaan',
  navigationLinks: [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang', href: '/about' },
    { label: 'Portofolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' }
  ],
  contactTitle: 'Contact Us',
  address: 'No.10 Blok A3, Ruko Dewe Square\nJl. Raya, Bedrek, Siwalanpanji,\nKec. Buduran, Kabupaten Sidoarjo,\nJawa Timur 61252, Indonesia',
  phone: '021-22212552',
  email: 'info@digitalmahadata.com',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2291804495444!2d112.72694777603003!3d-7.439875473307659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e700258d7d87%3A0xc6079ab1e6e22364!2sPT%20DIGITAL%20MAHADATA%20PRIMA%20(CABANG)!5e0!3m2!1sid!2sid!4v1769160832621!5m2!1sid!2sid',
  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com/digitalmahadata' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/digital-mahadata-prima' },
  ],
  showLogo: true,
  logoOpacity: 20
}

async function seedFooter() {
  try {
    console.log('Creating footer data via API...')
    
    const response = await fetch('http://localhost:3000/api/footer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(footerData)
    })

    if (response.ok) {
      const result = await response.json()
      console.log('✅ Footer data created successfully!', result)
    } else {
      console.error('❌ Error creating footer data:', response.statusText)
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

// For Node.js usage
if (typeof window === 'undefined') {
  // Use fetch polyfill for Node.js
  global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
  seedFooter()
} else {
  // For browser usage
  console.log('Run seedFooter() in the browser console')
}

// Export for manual usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { seedFooter, footerData }
}
