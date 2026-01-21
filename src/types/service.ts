export interface Service {
  id: string
  title: string
  description: string
  icon: string
  category: 'ai' | 'automation' | 'edtech' | 'fintech' | 'software' | 'other'
  features: Array<{
    feature: string
  }>
  benefits: Array<{
    benefit: string
  }>
  technologies: Array<{
    technology: string
  }>
  serviceImage?: {
    url: string
    alt?: string
  }
  featured: boolean
  order: number
  status: 'active' | 'coming-soon' | 'inactive'
  content?: string
  createdAt: string
  updatedAt: string
}
