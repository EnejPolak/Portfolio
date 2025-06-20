// @ts-nocheck
'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

const SmoothScrolling = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Initialize Lenis with optimized settings
        const lenis = new Lenis({
            duration: 0.8, // Reduced from 1.2
            easing: (t: number) => t, // Linear easing for better performance
            smooth: true,
            mouseMultiplier: 0.8, // Reduced for less lag
            touchMultiplier: 1.5,
            infinite: false,
        } as any)

        // Optimized raf with throttling
        let rafId: number
        function raf(time: number) {
            lenis.raf(time)
            rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)

        // Cleanup
        return () => {
            cancelAnimationFrame(rafId)
            lenis.destroy()
        }
    }, [])

    return <>{children}</>
}

export default SmoothScrolling

