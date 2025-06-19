'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface ScrollOverlayProps {
    children: ReactNode
}

const ScrollOverlay = ({ children }: ScrollOverlayProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const container = containerRef.current
        if (!container) return

        // Get all sections
        const heroSection = container.querySelector('.hero-section') as HTMLElement
        const overlaySections = container.querySelectorAll('.overlay-section') as NodeListOf<HTMLElement>

        if (!heroSection || overlaySections.length === 0) return

        // Set initial z-index values
        heroSection.style.zIndex = '1'
        
        // Set up overlay sections with better initial positioning
        overlaySections.forEach((section, index) => {
            section.style.zIndex = String(10 + index)
            section.style.position = 'relative'
            
            // Start with sections visible but positioned below
            gsap.set(section, {
                y: '60vh', // Less aggressive initial position
                opacity: 1 // Make sure they're visible
            })
        })

        // Create simpler scroll animations with better triggers
        overlaySections.forEach((section, index) => {
            // Each section slides up when the previous section reaches a certain point
            const startPosition = index === 0 ? 'bottom-=20%' : 'bottom center'
            
            ScrollTrigger.create({
                trigger: index === 0 ? heroSection : overlaySections[index - 1],
                start: startPosition,
                end: 'bottom+=100%',
                scrub: 1.5, // Smoother animation
                animation: gsap.to(section, {
                    y: 0,
                    ease: 'power2.out',
                    duration: 1
                }),
                onUpdate: (self) => {
                    // Add some visual feedback during scroll
                    const progress = self.progress
                    section.style.transform = `translateY(${60 * (1 - progress)}vh) scale(${0.95 + (0.05 * progress)})`
                }
            })
        })

        // Pin the hero section but with less aggressive settings
        ScrollTrigger.create({
            trigger: heroSection,
            start: 'top top',
            end: () => `+=${(overlaySections.length + 1) * window.innerHeight}`,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1
        })

        // Refresh ScrollTrigger after setup
        setTimeout(() => {
            ScrollTrigger.refresh()
        }, 100)

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <div 
            ref={containerRef} 
            className="scroll-overlay-container"
            style={{ 
                position: 'relative',
                scrollBehavior: 'smooth'
            }}
        >
            {children}
        </div>
    )
}

export default ScrollOverlay 