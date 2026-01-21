import { NextRequest, NextResponse } from 'next/server'

// Simple API route for testing
export const GET = async (): Promise<Response> => {
  return NextResponse.json({ 
    message: 'Digital Mahadata Prima API is running',
    timestamp: new Date().toISOString()
  })
}

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    const body = await req.json()
    return NextResponse.json({ 
      message: 'POST request received',
      data: body
    })
  } catch {
    return NextResponse.json({ 
      error: 'Invalid request body' 
    }, { status: 400 })
  }
}
