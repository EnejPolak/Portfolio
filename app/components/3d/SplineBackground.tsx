'use client'

import { useEffect, useState } from 'react'

interface SplineBackgroundProps {
  scene: string
  className?: string
}

const SplineBackground = ({ scene, className = "" }: SplineBackgroundProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 animate-pulse" />
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
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
    </div>
  )
}

export default SplineBackground 