// @ts-nocheck
'use client'

import { useEffect, useState, useRef } from 'react'

interface SplineBackgroundProps {
  scene: string
  className?: string
}

const SplineBackground = ({ scene, className = "" }: SplineBackgroundProps) => {
  const [isClient, setIsClient] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Intersection Observer za lazy loading
    if (typeof window !== 'undefined' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        },
        { rootMargin: '100px' }
      )
      
      observer.observe(containerRef.current)
      
      return () => observer.disconnect()
    }
  }, [])

  if (!isClient) {
    return (
      <div ref={containerRef} className={`absolute inset-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 animate-pulse" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      {shouldLoad ? (
        <iframe
          src={scene}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0
          }}
          loading="lazy"
          title="3D Background"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 animate-pulse" />
      )}
    </div>
  )
}

export default SplineBackground 