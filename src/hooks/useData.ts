'use client'

import { useState, useEffect, useRef } from 'react'

export interface UseDataResult<T> {
  data: T | null
  isLoading: boolean
  isFromCMS: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function usePortfolioData(): UseDataResult<any> {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFromCMS, setIsFromCMS] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasLoadedRef = useRef(false)

  const fallbackData = {
    docs: [
      {
        id: 'mock-1',
        title: 'Dashboard Analytics E-Commerce',
        slug: 'ecommerce-analytics-dashboard',
        description: 'Dashboard analytics real-time untuk jaringan retail besar dengan 500+ toko',
        client: 'RetailMax Indonesia',
        category: 'analytics',
        technologies: [
          { technology: 'React' },
          { technology: 'Node.js' },
          { technology: 'PostgreSQL' }
        ],
        featured: true,
        thumbnail: null,
        completedAt: '2023-12-15',
        createdAt: '2023-12-15',
        updatedAt: '2023-12-15'
      },
      {
        id: 'mock-2',
        title: 'Aplikasi Mobile Banking',
        slug: 'banking-mobile-app',
        description: 'Aplikasi mobile banking aman dengan autentikasi biometrik',
        client: 'Bank Mandiri',
        category: 'mobile',
        technologies: [
          { technology: 'React Native' },
          { technology: 'Node.js' },
          { technology: 'MongoDB' }
        ],
        featured: true,
        thumbnail: null,
        completedAt: '2024-01-10',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-10'
      }
    ]
  }

  const fetchData = async () => {
    if (hasLoadedRef.current) return
    hasLoadedRef.current = true

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/portfolio', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (response.ok) {
        const result = await response.json()
        setData(result)
        setIsFromCMS(true)
        setError(null)
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (err) {
      console.warn('Using fallback portfolio data:', err)
      setData(fallbackData)
      setIsFromCMS(false)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = async () => {
    hasLoadedRef.current = false
    await fetchData()
  }

  useEffect(() => {
    if (!hasLoadedRef.current) {
      fetchData()
    }
  }, [])

  return {
    data,
    isLoading,
    isFromCMS,
    error,
    refetch
  }
}

export function useAboutData(): UseDataResult<any> {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFromCMS, setIsFromCMS] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasLoadedRef = useRef(false)

  const fallbackData = {
    heroTitle: 'Tentang Digital Mahadata Prima',
    heroDescription: 'Kami adalah perusahaan teknologi yang berfokus pada transformasi digital untuk bisnis modern.',
    ourStory: {
      title: 'Cerita Kami',
      content: 'Digital Mahadata Prima didirikan dengan visi untuk membantu perusahaan berkembang melalui teknologi digital yang inovatif.'
    },
    ourMission: {
      title: 'Misi Kami',
      content: 'Menghadirkan solusi teknologi yang mudah digunakan, scalable, dan memberikan value nyata bagi klien kami.'
    },
    ourValues: [
      { title: 'Innovation', description: 'Selalu mencari cara baru dan lebih baik' },
      { title: 'Quality', description: 'Mengutamakan kualitas dalam setiap project' },
      { title: 'Collaboration', description: 'Bekerja sama untuk mencapai tujuan bersama' }
    ]
  }

  const fetchData = async () => {
    if (hasLoadedRef.current) return
    hasLoadedRef.current = true

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/about', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (response.ok) {
        const result = await response.json()
        setData(result)
        setIsFromCMS(true)
        setError(null)
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (err) {
      console.warn('Using fallback about data:', err)
      setData(fallbackData)
      setIsFromCMS(false)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = async () => {
    hasLoadedRef.current = false
    await fetchData()
  }

  useEffect(() => {
    if (!hasLoadedRef.current) {
      fetchData()
    }
  }, [])

  return {
    data,
    isLoading,
    isFromCMS,
    error,
    refetch
  }
}

export function useServicesData(): UseDataResult<any> {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFromCMS, setIsFromCMS] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasLoadedRef = useRef(false)

  const fallbackData = {
    docs: [
      {
        id: 'web-development',
        title: 'Web Development',
        description: 'Pengembangan aplikasi web modern dengan teknologi terdepan',
        icon: 'web',
        features: ['React/Next.js', 'Node.js Backend', 'Database Integration', 'API Development']
      },
      {
        id: 'mobile-development',
        title: 'Mobile Development',
        description: 'Aplikasi mobile native dan cross-platform untuk iOS dan Android',
        icon: 'mobile',
        features: ['React Native', 'Flutter', 'iOS/Android Native', 'Cross-platform']
      }
    ]
  }

  const fetchData = async () => {
    if (hasLoadedRef.current) return
    hasLoadedRef.current = true

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/services', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (response.ok) {
        const result = await response.json()
        setData(result)
        setIsFromCMS(true)
        setError(null)
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (err) {
      console.warn('Using fallback services data:', err)
      setData(fallbackData)
      setIsFromCMS(false)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = async () => {
    hasLoadedRef.current = false
    await fetchData()
  }

  useEffect(() => {
    if (!hasLoadedRef.current) {
      fetchData()
    }
  }, [])

  return {
    data,
    isLoading,
    isFromCMS,
    error,
    refetch
  }
}
