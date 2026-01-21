import { NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'

export async function GET(request: Request) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const { searchParams } = new URL(request.url)
    
    // Query parameters
    const pageType = searchParams.get('pageType')
    const status = searchParams.get('status')
    const showInMainMenu = searchParams.get('showInMainMenu')
    const slug = searchParams.get('slug')

    // Build query
    let whereClause = {}
    
    if (pageType) whereClause = { ...whereClause, pageType: { equals: pageType } }
    if (status) whereClause = { ...whereClause, status: { equals: status } }
    if (showInMainMenu === 'true') whereClause = { ...whereClause, 'navigation.showInMainMenu': { equals: true } }
    if (slug) whereClause = { ...whereClause, slug: { equals: slug } }

    const pages = await payload.find({
      collection: 'pages',
      where: whereClause,
      sort: 'navigation.menuOrder',
      limit: slug ? 1 : 100, // If slug provided, return single page
    })

    // If single page requested, return the page object
    if (slug && pages.docs.length > 0) {
      return NextResponse.json(pages.docs[0])
    }

    return NextResponse.json({
      pages: pages.docs,
      totalPages: pages.totalPages,
      totalDocs: pages.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch pages',
      pages: [],
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const data = await request.json()

    const page = await payload.create({
      collection: 'pages',
      data,
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json({ 
      error: 'Failed to create page' 
    }, { status: 500 })
  }
}
