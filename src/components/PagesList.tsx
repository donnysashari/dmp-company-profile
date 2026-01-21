'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Page } from '@/types/pages'

interface PagesListProps {
  showStatus?: boolean
  filterByStatus?: 'published' | 'draft' | 'maintenance' | 'coming-soon'
  showInMenu?: boolean
  limit?: number
  className?: string
}

export default function PagesList({ 
  showStatus = false, 
  filterByStatus = 'published',
  showInMenu = true,
  limit,
  className = '' 
}: PagesListProps) {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const params = new URLSearchParams()
        if (filterByStatus) params.append('status', filterByStatus)
        if (showInMenu) params.append('showInMainMenu', 'true')
        
        const response = await fetch(`/api/pages?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch pages')
        }
        
        const data = await response.json()
        let pagesData = data.pages || []
        
        // Apply limit if specified
        if (limit) {
          pagesData = pagesData.slice(0, limit)
        }
        
        setPages(pagesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pages')
        console.error('Error fetching pages:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPages()
  }, [filterByStatus, showInMenu, limit])

  if (loading) {
    return (
      <div className={`${className} animate-pulse`}>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${className} text-red-600`}>
        <p>Error loading pages: {error}</p>
      </div>
    )
  }

  if (pages.length === 0) {
    return (
      <div className={className}>
        <p className="text-gray-500">No pages found.</p>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return '🟢'
      case 'draft': return '🟡'
      case 'maintenance': return '🔧'
      case 'coming-soon': return '⏳'
      default: return '⚪'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100'
      case 'draft': return 'text-yellow-600 bg-yellow-100'
      case 'maintenance': return 'text-orange-600 bg-orange-100'
      case 'coming-soon': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className={className}>
      <div className="space-y-2">
        {pages.map((page) => (
          <div key={page.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              {showStatus && (
                <span className="text-lg">{getStatusIcon(page.status)}</span>
              )}
              <div>
                <Link 
                  href={`/${page.slug}`}
                  className="font-medium text-gray-900 hover:text-blue-600"
                >
                  {page.navigation.menuLabel || page.title}
                </Link>
                {page.description && (
                  <p className="text-sm text-gray-500 mt-1">{page.description}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {showStatus && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(page.status)}`}>
                  {page.status}
                </span>
              )}
              <span className="text-xs text-gray-400">
                /{page.slug}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {pages.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          Showing {pages.length} page{pages.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
