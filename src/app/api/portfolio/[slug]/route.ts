import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const payload = await getPayload({
      config,
    })

    const portfolioData = await payload.find({
      collection: 'portfolio',
      where: {
        slug: {
          equals: slug
        }
      },
      limit: 1,
    })

    if (portfolioData.docs.length === 0) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(portfolioData.docs[0])
  } catch (error) {
    console.error('Error fetching portfolio item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio item' },
      { status: 500 }
    )
  }
}
