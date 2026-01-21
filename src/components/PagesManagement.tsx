'use client'

import { useEffect, useState, useCallback } from 'react'
import { Page } from '@/types/pages'

export default function PagesManagement() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const params = new URLSearchParams()
        if (filter !== 'all') {
          if (filter === 'menu') {
            params.append('showInMainMenu', 'true')
          } else {
            params.append('status', filter)
          }
        }
        
        const response = await fetch(`/api/pages?${params.toString()}`)
        const data = await response.json()
        setPages(data.pages || [])
      } catch (error) {
        console.error('Error fetching pages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPages()
  }, [filter])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return '🟢'
      case 'draft': return '🟡'
      case 'maintenance': return '🔧'
      case 'coming-soon': return '⏳'
      default: return '⚪'
    }
  }

  const getPageTypeIcon = (pageType: string) => {
    switch (pageType) {
      case 'home': return '🏠'
      case 'about': return '📖'
      case 'services': return '🔧'
      case 'portfolio': return '💼'
      case 'contact': return '📧'
      default: return '📄'
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pages Management</h1>
        <p className="text-gray-600">Manage all website pages, their status, and navigation settings.</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { value: 'all', label: 'All Pages', count: pages.length },
          { value: 'published', label: 'Published', count: pages.filter(p => p.status === 'published').length },
          { value: 'draft', label: 'Draft', count: pages.filter(p => p.status === 'draft').length },
          { value: 'menu', label: 'In Menu', count: pages.filter(p => p.navigation.showInMainMenu).length },
        ].map((filterOption) => (
          <button
            key={filterOption.value}
            onClick={() => setFilter(filterOption.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === filterOption.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filterOption.label} ({filterOption.count})
          </button>
        ))}
      </div>

      {/* Pages List */}
      <div className="space-y-4">
        {pages.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No pages found with current filter.</p>
          </div>
        ) : (
          pages.map((page) => (
            <div
              key={page.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{getPageTypeIcon(page.pageType)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{page.title}</h3>
                      <p className="text-sm text-gray-500">/{page.slug}</p>
                    </div>
                  </div>
                  
                  {page.description && (
                    <p className="text-gray-600 mb-3">{page.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className={`px-2 py-1 rounded-full ${
                      page.status === 'published' ? 'bg-green-100 text-green-800' :
                      page.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      page.status === 'maintenance' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {getStatusIcon(page.status)} {page.status}
                    </span>
                    
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {page.pageType}
                    </span>
                    
                    {page.navigation.showInMainMenu && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        📋 In Menu (#{page.navigation.menuOrder})
                      </span>
                    )}
                    
                    {page.navigation.showInFooter && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        📄 In Footer
                      </span>
                    )}
                    
                    {page.content.hasContactForm && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        📧 Has Contact Form
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <a
                    href={`/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    View Page
                  </a>
                  <a
                    href={`/admin/collections/pages/${page.id}`}
                    className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    Edit
                  </a>
                </div>
              </div>
              
              {/* SEO Info */}
              {page.seo && (page.seo.metaTitle || page.seo.metaDescription) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">SEO Information:</h4>
                  {page.seo.metaTitle && (
                    <p className="text-sm text-gray-600">
                      <strong>Title:</strong> {page.seo.metaTitle}
                    </p>
                  )}
                  {page.seo.metaDescription && (
                    <p className="text-sm text-gray-600">
                      <strong>Description:</strong> {page.seo.metaDescription}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pages Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{pages.length}</div>
            <div className="text-sm text-gray-600">Total Pages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {pages.filter(p => p.status === 'published').length}
            </div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {pages.filter(p => p.navigation.showInMainMenu).length}
            </div>
            <div className="text-sm text-gray-600">In Main Menu</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {pages.filter(p => p.content.hasContactForm).length}
            </div>
            <div className="text-sm text-gray-600">With Contact Form</div>
          </div>
        </div>
      </div>
    </div>
  )
}
