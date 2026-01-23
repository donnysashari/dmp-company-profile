import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import CTAAbout from '../components/CTAAbout'
import Portfolio from '../components/Portfolio'
import OurClients from '../components/OurClients'
import OurPartners from '../components/OurPartners'
import CTAContact from '../components/CTAContact'
import Footer from '../components/Footer'
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
        <CTAAbout />
        <Portfolio />

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

        {/* CTA Contact Section */}
        <CTAContact />

        {/* Footer */}
        <Footer />
      </main>
    </ClientWrapper>
  )
}
