// @ts-nocheck

'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, MouseEvent } from 'react'

interface FloatingCardProps {
    children: React.ReactNode
    delay?: number
}

const FloatingCard = ({ children, delay = 0 }: FloatingCardProps) => {
    const ref = useRef<HTMLDivElement>(null)

    // Mouse position values
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Spring configuration for smooth animations
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

    // Transform mouse position to rotation values
    const rotateX = useTransform(
        mouseYSpring,
        [-0.5, 0.5],
        ["17.5deg", "-17.5deg"]
    )
    const rotateY = useTransform(
        mouseXSpring,
        [-0.5, 0.5],
        ["-17.5deg", "17.5deg"]
    )

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            className="relative"
            style={{
                rotateY: rotateY,
                rotateX: rotateX,
                transformStyle: "preserve-3d",
            }}
            initial={{
                opacity: 0,
                y: 100,
                rotateX: -15,
                rotateY: 15
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                rotateY: 0
            }}
            transition={{
                delay,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 15
            }}
            whileHover={{
                z: 50,
                transition: { duration: 0.3 }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Card Shadow */}
            <motion.div
                className="absolute inset-0 bg-black/20 rounded-xl blur-xl"
                style={{
                    translateZ: -50,
                    rotateX: rotateX,
                    rotateY: rotateY,
                }}
                animate={{
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Main Card */}
            <motion.div
                className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
                style={{
                    transformStyle: "preserve-3d",
                }}
                whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)",
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Gradient Overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div
                    className="relative z-10"
                    style={{ transform: "translateZ(50px)" }}
                >
                    {children}
                </div>

                {/* Shine Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%]"
                    whileHover={{
                        translateX: "200%",
                        transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                />

                {/* Border Glow */}
                <motion.div
                    className="absolute inset-0 rounded-xl opacity-0"
                    style={{
                        background: "linear-gradient(45deg, transparent 30%, rgba(99, 102, 241, 0.5), transparent 70%)",
                        backgroundSize: "200% 200%",
                    }}
                    whileHover={{
                        opacity: 1,
                        backgroundPosition: "100% 100%",
                    }}
                    transition={{ duration: 0.5 }}
                />
            </motion.div>

            {/* Floating Particles */}
            <FloatingParticles />
        </motion.div>
    )
}

// Floating Particles Component
const FloatingParticles = () => {
    const particles = Array.from({ length: 5 }, (_, i) => i)

    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle}
                    className="absolute w-1 h-1 bg-primary/40 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    )
}

export default FloatingCard