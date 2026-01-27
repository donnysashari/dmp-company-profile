// API connection utility for checking CMS connectivity and providing fallbacks

export interface ApiConnectionStatus {
  isConnected: boolean
  latency: number
  lastChecked: Date
  error?: string
}

export class CMSConnectionManager {
  private static instance: CMSConnectionManager
  public connectionStatus: ApiConnectionStatus = {
    isConnected: false,
    latency: 0,
    lastChecked: new Date()
  }
  private checkInterval: NodeJS.Timeout | null = null

  static getInstance(): CMSConnectionManager {
    if (!CMSConnectionManager.instance) {
      CMSConnectionManager.instance = new CMSConnectionManager()
    }
    return CMSConnectionManager.instance
  }

  async checkConnection(): Promise<ApiConnectionStatus> {
    const startTime = performance.now()
    
    try {
      const response = await fetch('/api/health-check', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      })

      const endTime = performance.now()
      const latency = endTime - startTime

      if (response.ok) {
        this.connectionStatus = {
          isConnected: true,
          latency,
          lastChecked: new Date(),
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      const endTime = performance.now()
      this.connectionStatus = {
        isConnected: false,
        latency: endTime - startTime,
        lastChecked: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }

    return this.connectionStatus
  }

  getStatus(): ApiConnectionStatus {
    return this.connectionStatus
  }

  startMonitoring(interval: number = 30000): void { // Check every 30 seconds
    if (this.checkInterval) {
      clearInterval(this.checkInterval)
    }

    this.checkInterval = setInterval(() => {
      this.checkConnection()
    }, interval)

    // Initial check
    this.checkConnection()
  }

  stopMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval)
      this.checkInterval = null
    }
  }
}

// Data fetcher with fallback mechanism
export async function fetchWithFallback<T>(
  endpoint: string,
  fallbackData: T,
  options: RequestInit = {}
): Promise<{ data: T; isFromCMS: boolean; error?: string }> {
  const connectionManager = CMSConnectionManager.getInstance()
  
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json()
    
    // Update connection status on successful fetch
    connectionManager.connectionStatus.isConnected = true
    connectionManager.connectionStatus.lastChecked = new Date()

    return {
      data: result.data || result.docs?.[0] || result,
      isFromCMS: true
    }
  } catch (error) {
    console.warn(`Failed to fetch from ${endpoint}, using fallback data:`, error)
    
    // Update connection status on failure
    connectionManager.connectionStatus.isConnected = false
    connectionManager.connectionStatus.error = error instanceof Error ? error.message : 'Unknown error'
    connectionManager.connectionStatus.lastChecked = new Date()

    return {
      data: fallbackData,
      isFromCMS: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Hook for React components to use CMS connection status
export function useCMSConnection() {
  const [status, setStatus] = React.useState<ApiConnectionStatus>({
    isConnected: false,
    latency: 0,
    lastChecked: new Date()
  })

  React.useEffect(() => {
    const connectionManager = CMSConnectionManager.getInstance()
    
    // Start monitoring with longer interval
    connectionManager.startMonitoring(60000) // Check every 60 seconds instead of 30
    
    // Update status less frequently
    const updateStatus = () => {
      const currentStatus = connectionManager.getStatus()
      setStatus(prev => {
        // Only update if there's a meaningful change
        if (prev.isConnected !== currentStatus.isConnected || 
            Math.abs(prev.latency - currentStatus.latency) > 100) {
          return currentStatus
        }
        return prev
      })
    }
    
    updateStatus()
    // Update UI every 10 seconds instead of 1 second
    const interval = setInterval(updateStatus, 10000)

    return () => {
      clearInterval(interval)
      connectionManager.stopMonitoring()
    }
  }, [])

  return status
}

// React import (add this if not using in a React context file)
import React from 'react'
