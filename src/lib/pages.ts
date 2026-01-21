import { Page } from '@/types/pages'

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await fetch(`/api/pages?slug=${slug}`, {
      next: { revalidate: 60 } // Revalidate every minute
    })
    
    if (!response.ok) {
      console.warn(`Failed to fetch page with slug: ${slug}`)
      return null
    }
    
    const page = await response.json()
    return page || null
  } catch (error) {
    console.error(`Error fetching page ${slug}:`, error)
    return null
  }
}

export async function getNavigationPages(): Promise<Page[]> {
  try {
    const response = await fetch('/api/pages?status=published&showInMainMenu=true', {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    })
    
    if (!response.ok) {
      console.warn('Failed to fetch navigation pages')
      return []
    }
    
    const data = await response.json()
    return data.pages || []
  } catch (error) {
    console.error('Error fetching navigation pages:', error)
    return []
  }
}

export async function getAllPages(): Promise<Page[]> {
  try {
    const response = await fetch('/api/pages', {
      next: { revalidate: 60 }
    })
    
    if (!response.ok) {
      console.warn('Failed to fetch all pages')
      return []
    }
    
    const data = await response.json()
    return data.pages || []
  } catch (error) {
    console.error('Error fetching all pages:', error)
    return []
  }
}

export async function getPagesByType(pageType: string): Promise<Page[]> {
  try {
    const response = await fetch(`/api/pages?pageType=${pageType}&status=published`, {
      next: { revalidate: 300 }
    })
    
    if (!response.ok) {
      console.warn(`Failed to fetch pages of type: ${pageType}`)
      return []
    }
    
    const data = await response.json()
    return data.pages || []
  } catch (error) {
    console.error(`Error fetching pages of type ${pageType}:`, error)
    return []
  }
}

// SEO helper functions
export function getPageSEOData(page: Page) {
  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || page.description || '',
    keywords: page.seo?.keywords || '',
    ogImage: page.seo?.ogImage?.url || '',
    canonical: `/${page.slug}`,
  }
}

// Navigation helper functions
export function sortPagesByMenuOrder(pages: Page[]): Page[] {
  return [...pages].sort((a, b) => {
    const orderA = a.navigation.menuOrder || 999
    const orderB = b.navigation.menuOrder || 999
    return orderA - orderB
  })
}

export function getMainMenuPages(pages: Page[]): Page[] {
  return pages
    .filter(page => page.navigation.showInMainMenu && page.status === 'published')
    .sort((a, b) => (a.navigation.menuOrder || 999) - (b.navigation.menuOrder || 999))
}

export function getFooterMenuPages(pages: Page[]): Page[] {
  return pages
    .filter(page => page.navigation.showInFooter && page.status === 'published')
    .sort((a, b) => (a.navigation.menuOrder || 999) - (b.navigation.menuOrder || 999))
}
