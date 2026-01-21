import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio - Digital Mahadata Prima',
  description: 'Explore our successful digital transformation projects and innovative solutions.',
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
