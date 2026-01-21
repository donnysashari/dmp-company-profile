import { NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    
    const aboutData = await payload.find({
      collection: 'about',
      limit: 1,
      sort: '-updatedAt'
    })

    if (!aboutData.docs.length) {
      return NextResponse.json({ 
        error: 'No about data found' 
      }, { status: 404 })
    }

    return NextResponse.json(aboutData.docs[0])
  } catch (error) {
    console.error('Error fetching about data:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch about data' 
    }, { status: 500 })
  }
}
