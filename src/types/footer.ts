export interface NavigationLink {
  label: string
  href: string
}

export interface SocialLink {
  platform: 'facebook' | 'linkedin' | 'instagram' | 'twitter' | 'youtube'
  url: string
}

export interface Footer {
  id: string
  companyName: string
  companyDescription: string
  navigationTitle: string
  navigationLinks: NavigationLink[]
  contactTitle: string
  address: string
  phone: string
  email?: string
  mapsEmbedUrl: string
  socialLinks?: SocialLink[]
  showLogo: boolean
  logoOpacity: number
  createdAt: string
  updatedAt: string
}
