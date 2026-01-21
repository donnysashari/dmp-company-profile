import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayload({
      config,
    })

    const portfolioData = await payload.find({
      collection: 'portfolio',
      sort: '-createdAt',
      limit: 50,
    })

    return NextResponse.json(portfolioData)
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    )
  }
}
