import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '../../../payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // Get footer data from Payload CMS
    const footerResponse = await payload.find({
      collection: 'footer',
      limit: 1,
    })

    if (footerResponse.docs.length > 0) {
      return NextResponse.json({
        success: true,
        data: footerResponse.docs[0]
      })
    } else {
      // Return default footer data if none exists in CMS
      return NextResponse.json({
        success: true,
        data: {
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
          mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2291804495444!2d112.72694777603003!3d-7.439875473307659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e700258d7d87%3A0xc6079ab1e6e22364!2sPT%20DIGITAL%20MAHADATA%20PRIMA%20(CABANG)!5e0!3m2!1sid!2sid!4v1769160832621!5m2!1sid!2sid',
          showLogo: true,
          logoOpacity: 20,
          socialLinks: []
        }
      })
    }
  } catch (error) {
    console.error('Error fetching footer data:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch footer data'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const payload = await getPayload({ config: configPromise })
    
    // Check if footer already exists
    const existingFooter = await payload.find({
      collection: 'footer',
      limit: 1,
    })

    if (existingFooter.docs.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Footer data already exists. Use PUT to update.'
      }, { status: 400 })
    }

    // Create new footer data
    const result = await payload.create({
      collection: 'footer',
      data: data,
    })

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error creating footer data:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create footer data'
    }, { status: 500 })
  }
}
