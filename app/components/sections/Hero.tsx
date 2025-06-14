// @ts-nocheck
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        }
    }

    const textVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: 0.5
            }
        }
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                    animate={{
                        x: mousePosition.x * 50,
                        y: mousePosition.y * 50,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        x: { type: "spring", stiffness: 50, damping: 30 },
                        y: { type: "spring", stiffness: 50, damping: 30 },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    } as any}
                />

                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
                    animate={{
                        x: mousePosition.x * -30,
                        y: mousePosition.y * -30,
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{
                        x: { type: "spring", stiffness: 50, damping: 30 },
                        y: { type: "spring", stiffness: 50, damping: 30 },
                        scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    } as any}
                />

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        } as any}
                    />
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 text-center px-4 max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
            >
                {/* Greeting */}
                <motion.div
                    variants={itemVariants}
                    className="mb-12"
                >
                    <span className="text-primary font-mono text-lg">Hello, I'm</span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    variants={textVariants}
                    className="text-hero font-bold mb-12 gradient-text"
                >
                    Enej Polak
                </motion.h1>

                {/* Animated Subtitle */}
                <motion.div
                    variants={itemVariants}
                    className="mb-16"
                >
                    <h2 className="text-section text-muted-foreground mb-4">
                        I create{' '}
                        <motion.span
                            className="text-primary"
                            animate={{
                                color: ['#6366f1', '#8b5cf6', '#ec4899', '#6366f1'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            } as any}
                        >
                            digital experiences
                        </motion.span>
                    </h2>

                    <TypewriterText
                        texts={[
                            "Full Stack Developer",
                            "UI/UX Designer",
                            "Creative Problem Solver",
                            "Tech Enthusiast"
                        ]}
                    />
                </motion.div>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-48 px-4"
                >
                    Passionate about creating beautiful, functional, and user-centered digital
                    experiences. I bring ideas to life through clean code and stunning design.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center my-128"
                >
                    <motion.button
                        className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 } as any}
                        />
                        <span className="relative z-10">View My Work</span>
                    </motion.button>

                    <motion.button
                        className="group px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get In Touch
                    </motion.button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center gap-8 mb-32"
                >
                    {[
                        { icon: Github, href: "#", label: "GitHub" },
                        { icon: Linkedin, href: "#", label: "LinkedIn" },
                        { icon: Mail, href: "#", label: "Email" }
                    ].map(({ icon: Icon, href, label }) => (
                        <motion.a
                            key={label}
                            href={href}
                            className="p-4 bg-card rounded-full border border-border hover:border-primary transition-colors group"
                            whileHover={{
                                scale: 1.1,
                                rotateY: 180
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity } as any}
            >
                <div className="flex flex-col items-center text-muted-foreground">
                    <span className="text-sm mb-2 rotate-90 whitespace-nowrap">Scroll down</span>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </motion.div>
        </section>
    )
}

// Typewriter Effect Component
const TypewriterText = ({ texts }: { texts: string[] }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [currentText, setCurrentText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fullText = texts[currentTextIndex]

            if (isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length - 1))
            } else {
                setCurrentText(fullText.substring(0, currentText.length + 1))
            }

            if (!isDeleting && currentText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000)
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false)
                setCurrentTextIndex((prev) => (prev + 1) % texts.length)
            }
        }, isDeleting ? 50 : 150)

        return () => clearTimeout(timeout)
    }, [currentText, isDeleting, currentTextIndex, texts])

    return (
        <div className="text-2xl font-mono text-accent h-8">
            {currentText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity } as any}
                className="text-primary"
            >
                |
            </motion.span>
        </div>
    )
}

export default Hero