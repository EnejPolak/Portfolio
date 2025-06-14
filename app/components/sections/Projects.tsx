'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const Projects = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.3 })

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            {/* Main Title */}
            <div className="relative z-10 text-center">
                <motion.h1
                    className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide gradient-text"
                    style={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: 700,
                        letterSpacing: "0.05em"
                    }}
                    initial={{ opacity: 0, y: 100 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                        delay: 0.2,
                        duration: 1.5
                    }}
                >
                    {"My Work".split("").map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 100,
                                rotateX: -90
                            }}
                            animate={isInView ? {
                                opacity: 1,
                                y: 0,
                                rotateX: 0
                            } : {}}
                            transition={{
                                delay: 0.8 + index * 0.1,
                                duration: 0.8,
                                type: "spring",
                                stiffness: 100,
                                damping: 12
                            }}
                            className="inline-block"
                            whileHover={{
                                scale: 1.1,
                                rotateY: 15,
                                transition: { duration: 0.3 }
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Subtle underline animation */}
                <motion.div
                    className="mt-8 mx-auto bg-gradient-to-r from-primary via-accent to-primary h-0.5"
                    initial={{ width: 0, opacity: 0 }}
                    animate={isInView ? { width: "200px", opacity: 1 } : {}}
                    transition={{
                        delay: 2,
                        duration: 1,
                        ease: "easeOut"
                    }}
                />

                {/* Floating dots */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-primary/30 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.3, 1, 0.3],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects