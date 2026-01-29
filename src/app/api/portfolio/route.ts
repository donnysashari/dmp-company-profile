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

export async function POST(request: Request) {
  try {
    const payload = await getPayload({
      config,
    })

    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'slug', 'description', 'client', 'category']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Check if slug already exists
    const existingPortfolio = await payload.find({
      collection: 'portfolio',
      where: {
        slug: {
          equals: body.slug
        }
      },
      limit: 1,
    })

    if (existingPortfolio.docs.length > 0) {
      return NextResponse.json(
        { error: 'Portfolio item with this slug already exists' },
        { status: 409 }
      )
    }

    const newPortfolio = await payload.create({
      collection: 'portfolio',
      data: body,
    })

    return NextResponse.json(newPortfolio, { status: 201 })
  } catch (error) {
    console.error('Error creating portfolio item:', error)
    return NextResponse.json(
      { error: 'Failed to create portfolio item' },
      { status: 500 }
    )
  }
}
