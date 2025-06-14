'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [cursorVariant, setCursorVariant] = useState('default')
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            })
        }

        const mouseEnter = () => setIsVisible(true)
        const mouseLeave = () => setIsVisible(false)

        // Add event listeners for hoverable elements
        const addHoverListeners = () => {
            const hoverElements = document.querySelectorAll('a, button, [data-cursor-hover]')

            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => setCursorVariant('hover'))
                el.addEventListener('mouseleave', () => setCursorVariant('default'))
            })

            const textElements = document.querySelectorAll('h1, h2, h3, p, span')
            textElements.forEach(el => {
                el.addEventListener('mouseenter', () => setCursorVariant('text'))
                el.addEventListener('mouseleave', () => setCursorVariant('default'))
            })
        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseenter', mouseEnter)
        window.addEventListener('mouseleave', mouseLeave)

        // Add listeners after component mounts
        setTimeout(addHoverListeners, 100)

        return () => {
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseenter', mouseEnter)
            window.removeEventListener('mouseleave', mouseLeave)
        }
    }, [])

    const variants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            scale: 1,
            backgroundColor: '#6366f1',
            mixBlendMode: 'difference' as const,
        },
        hover: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 2,
            backgroundColor: '#8b5cf6',
            mixBlendMode: 'difference' as const,
        },
        text: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: 1.5,
            backgroundColor: '#ec4899',
            mixBlendMode: 'difference' as const,
        }
    }

    const followerVariants = {
        default: {
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            scale: 1,
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            scale: 1.5,
        },
        text: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 1.2,
        }
    }

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return null // Hide cursor on mobile devices
    }

    return (
        <>
            {/* Main Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999]"
                variants={variants}
                animate={cursorVariant}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
                style={{
                    opacity: isVisible ? 1 : 0,
                }}
            />

            {/* Cursor Follower */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border-2 border-primary rounded-full pointer-events-none z-[9998]"
                variants={followerVariants}
                animate={cursorVariant}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1
                }}
                style={{
                    opacity: isVisible ? 0.5 : 0,
                }}
            />

            {/* Cursor Trail */}
            <CursorTrail mousePosition={mousePosition} isVisible={isVisible} />
        </>
    )
}

// Cursor Trail Component
const CursorTrail = ({
    mousePosition,
    isVisible
}: {
    mousePosition: { x: number; y: number }
    isVisible: boolean
}) => {
    const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])

    useEffect(() => {
        if (!isVisible) return

        const addTrailPoint = () => {
            setTrail(prev => [
                ...prev.slice(-15), // Keep only last 15 points
                {
                    x: mousePosition.x,
                    y: mousePosition.y,
                    id: Date.now()
                }
            ])
        }

        const interval = setInterval(addTrailPoint, 16) // ~60fps
        return () => clearInterval(interval)
    }, [mousePosition, isVisible])

    return (
        <>
            {trail.map((point, index) => (
                <motion.div
                    key={point.id}
                    className="fixed w-1 h-1 bg-primary rounded-full pointer-events-none z-[9997]"
                    style={{
                        left: point.x - 2,
                        top: point.y - 2,
                    }}
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{
                        opacity: 0,
                        scale: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                />
            ))}
        </>
    )
}

export default CustomCursor