'use client'

import { useCMSConnection } from '@/lib/cms-connection'

interface CMSStatusIndicatorProps {
  showDetails?: boolean
  className?: string
}

export default function CMSStatusIndicator({ 
  showDetails = false, 
  className = '' 
}: CMSStatusIndicatorProps) {
  const status = useCMSConnection()

  if (!showDetails) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div 
          className={`w-3 h-3 rounded-full ${
            status.isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
          title={status.isConnected ? 'CMS Connected' : 'CMS Disconnected'}
        />
        {status.isConnected ? (
          <span className="text-sm text-green-600 font-medium">Live</span>
        ) : (
          <span className="text-sm text-red-600 font-medium">Offline</span>
        )}
      </div>
    )
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900 font-figtree">
          CMS Status
        </h3>
        <div className={`flex items-center space-x-2`}>
          <div 
            className={`w-3 h-3 rounded-full ${
              status.isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className={`text-sm font-medium ${
            status.isConnected ? 'text-green-600' : 'text-red-600'
          }`}>
            {status.isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 font-plus-jakarta">
        <div className="flex justify-between">
          <span>Latency:</span>
          <span className={`font-medium ${
            status.latency > 1000 ? 'text-red-600' : 
            status.latency > 500 ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {Math.round(status.latency)}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Last Check:</span>
          <span className="font-medium">
            {status.lastChecked.toLocaleTimeString()}
          </span>
        </div>
        
        {status.error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <span className="text-red-700 text-xs">
              {status.error}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// Data source indicator for development
export function DataSourceBadge({ 
  isFromCMS, 
  className = '' 
}: { 
  isFromCMS: boolean
  className?: string 
}) {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      isFromCMS 
        ? 'bg-green-100 text-green-800 border border-green-200' 
        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    } ${className}`}>
      {isFromCMS ? '📡 CMS' : '💾 Cache'}
    </div>
  )
}
