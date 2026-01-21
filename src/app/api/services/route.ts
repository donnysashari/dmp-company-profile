import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

// GET /api/services - Get all services
export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const status = searchParams.get('status') || 'active'
    const limit = searchParams.get('limit')
    
    const where = {
      status: {
        equals: status
      },
      ...(featured === 'true' && {
        featured: {
          equals: true
        }
      })
    }
    
    const services = await payload.find({
      collection: 'services',
      where,
      sort: 'order',
      ...(limit && { limit: parseInt(limit) })
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

// POST /api/services - Create new service
export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await request.json()
    
    const service = await payload.create({
      collection: 'services',
      data: body,
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
