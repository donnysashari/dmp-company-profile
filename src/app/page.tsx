import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import OurClients from '../components/OurClients'
import OurPartners from '../components/OurPartners'
import ClientWrapper from '../components/ClientWrapper'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

interface MediaItem {
  id: string
  filename: string
  alt?: string
  url: string
  width?: number
  height?: number
  mimeType?: string
}

// Function to get client and partner images from Payload CMS
async function getClientAndPartnerData() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // Get all media files
    const mediaResponse = await payload.find({
      collection: 'media',
      limit: 100,
    })

    const allMedia = mediaResponse.docs as MediaItem[]

    // Filter clients (files with "Our Client" in filename)
    const clients = allMedia
      .filter((media: MediaItem) => 
        media.filename && 
        media.filename.toLowerCase().includes('our client')
      )
      .map((media: MediaItem) => ({
        id: media.id,
        filename: media.filename,
        alt: media.alt || media.filename,
        url: media.url || `/api/media/file/${encodeURIComponent(media.filename)}`,
        width: media.width || 200,
        height: media.height || 100,
      }))

    // Filter partners (files without "Our Client" in filename, assuming they are partners)
    const partners = allMedia
      .filter((media: MediaItem) => 
        media.filename && 
        !media.filename.toLowerCase().includes('our client') &&
        (media.filename.toLowerCase().includes('partner') || 
         media.filename.toLowerCase().includes('logo') ||
         media.filename.toLowerCase().includes('property') ||
         media.mimeType?.startsWith('image/'))
      )
      .map((media: MediaItem) => ({
        id: media.id,
        filename: media.filename,
        alt: media.alt || media.filename,
        url: media.url || `/api/media/file/${encodeURIComponent(media.filename)}`,
        width: media.width || 200,
        height: media.height || 100,
      }))

    return { clients, partners }
  } catch (error) {
    console.error('Error fetching media:', error)
    return { clients: [], partners: [] }
  }
}

export default async function Home() {
  // Get client and partner data from CMS
  const { clients, partners } = await getClientAndPartnerData()

  return (
    <ClientWrapper>
      <main className="relative">
        <Header />
        <Hero />
        <About />
        <Services />

        {/* Our Clients Section */}
        <OurClients clients={clients} />
        
        {/* Our Partners Section */}
        <OurPartners partners={partners} />
        
        {/* Placeholder for Team section */}
        <section id="team" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Team</h2>
            <p className="text-gray-600 text-lg">Meet the experts behind Digital Mahadata Prima</p>
            <div className="mt-12 text-gray-500">
              <p>Team section will be populated with data from Payload CMS</p>
            </div>
          </div>
        </section>

        {/* Placeholder for Contact section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h2>
            <p className="text-gray-600 text-lg mb-12">
              Ready to start your digital transformation journey? Let&apos;s talk!
            </p>
            
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📧</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">info@digitalmahadata.com</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📞</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">+62 123 456 789</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📍</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DMP</span>
                </div>
                <span className="font-bold text-xl">Digital Mahadata Prima</span>
              </div>
              <p className="text-gray-400">
                © 2024 Digital Mahadata Prima. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </ClientWrapper>
  )
}
