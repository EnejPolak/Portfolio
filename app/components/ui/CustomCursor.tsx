'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        console.log('Fancy cursor loaded!')

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseEnter = () => setIsVisible(true)
        const handleMouseLeave = () => setIsVisible(false)

        document.addEventListener('mousemove', updatePosition)
        document.addEventListener('mouseenter', handleMouseEnter)
        document.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            document.removeEventListener('mousemove', updatePosition)
            document.removeEventListener('mouseenter', handleMouseEnter)
            document.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <>
            {/* Main Cursor */}
            <motion.div
                animate={{
                    x: position.x - 8,
                    y: position.y - 8,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28
                }}
                style={{
                    position: 'fixed',
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#6366f1',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    opacity: isVisible ? 1 : 0,
                }}
            />

            {/* Follower Ring */}
            <motion.div
                animate={{
                    x: position.x - 20,
                    y: position.y - 20,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                }}
                style={{
                    position: 'fixed',
                    width: '40px',
                    height: '40px',
                    border: '2px solid #6366f1',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    opacity: isVisible ? 0.5 : 0,
                }}
            />
        </>
    )
}

export default CustomCursor