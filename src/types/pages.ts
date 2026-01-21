export interface ConversionGoal {
  goalName: string
  goalType: 'contact' | 'download' | 'newsletter' | 'service'
}

export interface PageNavigation {
  showInMainMenu: boolean
  showInFooter: boolean
  menuOrder: number
  menuLabel?: string
}

export interface PageContent {
  hasHeroSection: boolean
  hasContactForm: boolean
  enableComments: boolean
  customCSS?: string
}

export interface PageSEO {
  metaTitle?: string
  metaDescription?: string
  keywords?: string
  ogImage?: {
    url: string
    alt?: string
  }
}

export interface PageAnalytics {
  trackPageViews: boolean
  conversionGoals?: ConversionGoal[]
}

export interface Page {
  id: string
  title: string
  slug: string
  pageType: 'home' | 'about' | 'services' | 'portfolio' | 'contact' | 'custom'
  status: 'published' | 'draft' | 'maintenance' | 'coming-soon'
  description?: string
  seo?: PageSEO
  navigation: PageNavigation
  content: PageContent
  analytics?: PageAnalytics
  createdAt: string
  updatedAt: string
}

export interface PagesResponse {
  pages: Page[]
  totalPages: number
  totalDocs: number
}

export interface PageQueryParams {
  pageType?: string
  status?: string
  showInMainMenu?: string
  slug?: string
}
