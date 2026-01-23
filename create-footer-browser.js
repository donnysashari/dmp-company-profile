// Buka browser ke http://localhost:3000 dan jalankan script ini di console

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

fetch('/api/footer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(footerData)
})
.then(response => response.json())
.then(result => console.log('✅ Footer created:', result))
.catch(error => console.error('❌ Error:', error))
