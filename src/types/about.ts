export interface AboutData {
  id: string
  title: string
  heroTitle: string
  heroDescription: string
  ourStory: {
    title: string
    content: unknown[] // Rich text content
  }
  values: Array<{
    icon: string
    title: string
    description: string
  }>
  timeline: Array<{
    year: string
    title: string
    description: string
  }>
  team: Array<{
    name: string
    position: string
    bio: string
    image?: {
      url: string
      alt?: string
    }
  }>
  statistics: {
    title: string
    stats: Array<{
      number: string
      label: string
    }>
  }
  cta: {
    title: string
    description: string
    primaryButtonText: string
    secondaryButtonText: string
  }
  createdAt: string
  updatedAt: string
}
