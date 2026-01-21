// Simple API route untuk testing - Payload akan handle admin UI secara otomatis
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Payload CMS API is ready',
    adminUrl: '/admin',
    timestamp: new Date().toISOString()
  })
}
