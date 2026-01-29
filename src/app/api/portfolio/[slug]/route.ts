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

    // Check if the slug parameter is actually an ID (ObjectId format)
    const isId = /^[0-9a-fA-F]{24}$/.test(slug)
    
    let portfolioData
    
    if (isId) {
      // If it's an ID, use findByID
      portfolioData = await payload.findByID({
        collection: 'portfolio',
        id: slug,
      })
      return NextResponse.json(portfolioData)
    } else {
      // If it's a slug, use find with slug query
      portfolioData = await payload.find({
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
    }
  } catch (error) {
    console.error('Error fetching portfolio item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio item' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const payload = await getPayload({
      config,
    })

    const body = await request.json()

    // Find the portfolio item by slug first
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

    const portfolioId = portfolioData.docs[0].id

    // If slug is being changed, check if new slug already exists
    if (body.slug && body.slug !== slug) {
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
    }

    const updatedPortfolio = await payload.update({
      collection: 'portfolio',
      id: portfolioId,
      data: body,
    })

    return NextResponse.json(updatedPortfolio)
  } catch (error) {
    console.error('Error updating portfolio item:', error)
    return NextResponse.json(
      { error: 'Failed to update portfolio item' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const payload = await getPayload({
      config,
    })

    console.log('PATCH request for portfolio slug/id:', slug)
    
    // Log request details before parsing
    const contentType = request.headers.get('content-type')
    console.log('Content-Type:', contentType)
    
    let body
    try {
      if (contentType?.includes('multipart/form-data')) {
        // Handle multipart form data (from Payload CMS admin)
        const formData = await request.formData()
        const payloadData = formData.get('_payload') as string
        
        console.log('Payload form data:', payloadData)
        
        if (payloadData) {
          body = JSON.parse(payloadData)
        } else {
          body = {}
        }
      } else {
        // Handle regular JSON requests
        const rawBody = await request.text()
        console.log('Raw request body:', rawBody)
        
        if (rawBody.trim() === '') {
          body = {}
        } else {
          body = JSON.parse(rawBody)
        }
      }
    } catch (error) {
      console.error('Request parsing error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error'
      return NextResponse.json(
        { error: 'Invalid request data', details: errorMessage },
        { status: 400 }
      )
    }
    
    console.log('Parsed request body:', body)

    // Check if the slug parameter is actually an ID (ObjectId format)
    const isId = /^[0-9a-fA-F]{24}$/.test(slug)
    
    let portfolioItem
    let portfolioId
    
    if (isId) {
      // If it's an ID, use findByID
      try {
        portfolioItem = await payload.findByID({
          collection: 'portfolio',
          id: slug,
        })
        portfolioId = slug
      } catch (error) {
        console.error('Portfolio not found by ID:', error)
        return NextResponse.json(
          { error: 'Portfolio item not found' },
          { status: 404 }
        )
      }
    } else {
      // If it's a slug, find by slug
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

      portfolioItem = portfolioData.docs[0]
      portfolioId = portfolioItem.id
    }

    // Check if new slug already exists (if slug is being updated)
    if (body.slug && body.slug !== portfolioItem.slug) {
      const existingPortfolio = await payload.find({
        collection: 'portfolio',
        where: {
          slug: {
            equals: body.slug
          },
          id: {
            not_equals: portfolioId
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
    }

    const updatedPortfolio = await payload.update({
      collection: 'portfolio',
      id: portfolioId,
      data: body,
    })

    console.log('Portfolio updated successfully:', updatedPortfolio)
    return NextResponse.json(updatedPortfolio)
  } catch (error) {
    console.error('Error updating portfolio item:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to update portfolio item', details: errorMessage },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const payload = await getPayload({
      config,
    })
    
    console.log('DELETE request for portfolio slug/id:', slug)

    // Check if the slug parameter is actually an ID (ObjectId format)
    const isId = /^[0-9a-fA-F]{24}$/.test(slug)
    
    let portfolioId
    
    if (isId) {
      // If it's an ID, use it directly
      try {
        await payload.findByID({
          collection: 'portfolio',
          id: slug,
        })
        portfolioId = slug
      } catch (error) {
        console.error('Portfolio not found by ID:', error)
        return NextResponse.json(
          { error: 'Portfolio item not found' },
          { status: 404 }
        )
      }
    } else {
      // If it's a slug, find by slug first
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

      portfolioId = portfolioData.docs[0].id
    }

    await payload.delete({
      collection: 'portfolio',
      id: portfolioId,
    })

    console.log('Portfolio deleted successfully')
    return NextResponse.json(
      { message: 'Portfolio item deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting portfolio item:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to delete portfolio item', details: errorMessage },
      { status: 500 }
    )
  }
}
