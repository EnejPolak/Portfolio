// @ts-nocheck
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { ChevronDown, Github, Linkedin, Mail, ArrowRight, Sparkles } from 'lucide-react'
import ContactModal from '../ContactModal'
import CVSelectionModal from '../CVSelectionModal'

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isLoaded, setIsLoaded] = useState(false)
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)
    const [isCVModalOpen, setIsCVModalOpen] = useState(false)
    const backgroundRef = useRef(null)
    const gridRef = useRef(null)

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

    // Force CSS animations with higher specificity
    useEffect(() => {
        const createSubtleAnimations = () => {
            // Remove existing styles first
            const existingStyle = document.getElementById('hero-animations')
            if (existingStyle) {
                existingStyle.remove()
            }

            const style = document.createElement('style')
            style.id = 'hero-animations'
            style.textContent = `
                .hero-gentle-float {
                    animation: hero-gentle-float 4s ease-in-out infinite !important;
                }
                
                .hero-subtle-pulse {
                    animation: hero-subtle-pulse 3s ease-in-out infinite !important;
                }
                
                .hero-grid-shift {
                    animation: hero-grid-shift 8s ease-in-out infinite !important;
                }
                
                .hero-orb-drift {
                    animation: hero-orb-drift 12s ease-in-out infinite !important;
                }
                
                @keyframes hero-gentle-float {
                    0%, 100% { 
                        transform: translateY(0px) scale(1) !important; 
                        opacity: 0.3 !important; 
                    }
                    50% { 
                        transform: translateY(-8px) scale(1.02) !important; 
                        opacity: 0.6 !important; 
                    }
                }
                
                @keyframes hero-subtle-pulse {
                    0%, 100% { opacity: 0.1 !important; }
                    50% { opacity: 0.25 !important; }
                }
                
                @keyframes hero-grid-shift {
                    0% { transform: translate(0, 0) !important; }
                    100% { transform: translate(2px, 2px) !important; }
                }
                
                @keyframes hero-orb-drift {
                    0%, 100% { 
                        transform: translate(0, 0) scale(1) !important; 
                    }
                    50% { 
                        transform: translate(20px, -15px) scale(1.05) !important; 
                    }
                }
            `
            document.head.appendChild(style)
            return () => {
                const styleToRemove = document.getElementById('hero-animations')
                if (styleToRemove) {
                    styleToRemove.remove()
                }
            }
        }

        const cleanup = createSubtleAnimations()
        return cleanup
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 60, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 120
            }
        }
    }

    const textVariants = {
        hidden: { x: -60, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 120,
                delay: 0.3
            }
        }
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Clean Professional Background */}
            <div
                ref={backgroundRef}
                className="absolute inset-0"
                style={{
                    background: `
                        linear-gradient(135deg, 
                            hsl(var(--background)) 0%, 
                            hsl(var(--background)) 60%,
                            hsl(var(--muted)) 100%
                        )
                    `
                }}
            >
                {/* Subtle Animated Grid */}
                <div
                    ref={gridRef}
                    className="absolute inset-0 opacity-[0.03] hero-grid-shift pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(99, 102, 241, 0.4) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99, 102, 241, 0.4) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px'
                    }}
                />

                {/* Single Subtle Orb */}
                <div
                    className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.15] hero-orb-drift pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
                        transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
                    }}
                />

                {/* Minimal Accent Line */}
                <div
                    className="absolute top-1/2 left-0 w-32 h-px opacity-20 hero-subtle-pulse pointer-events-none"
                    style={{
                        background: 'linear-gradient(to right, transparent, rgba(99, 102, 241, 0.8), transparent)'
                    }}
                />

                {/* Floating Minimal Particles */}
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full hero-gentle-float pointer-events-none`}
                        style={{
                            left: `${20 + i * 30}%`,
                            top: `${30 + i * 20}%`,
                            background: 'rgba(99, 102, 241, 0.6)',
                            animationDelay: `${i * 1.5}s`
                        }}
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
                    className="mb-8"
                >
                    <span className="text-primary font-mono text-sm tracking-wider">HELLO, I'M</span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    variants={textVariants}
                    className="text-hero font-bold mb-10 gradient-text"
                >
                    Enej Polak
                </motion.h1>

                {/* Animated Subtitle */}
                <motion.div
                    variants={itemVariants}
                    className="mb-12"
                >
                    <h2 className="text-section text-muted-foreground mb-8">
                        I create{' '}
                        <motion.span
                            className="text-primary"
                            animate={{
                                color: ['#6366f1', '#8b5cf6', '#6366f1'],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            digital experiences
                        </motion.span>
                    </h2>

                    <TypewriterText
                        texts={[
                            "Frontend Developer",
                            "UI/UX Designer",
                            "Full Stack Developer"
                        ]}
                    />
                </motion.div>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    style={{ marginBottom: '4rem' }}
                >
                    Crafting performant and user-centered web applications with modern technologies and clean, maintainable code.
                </motion.p>

                {/* Enhanced CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row justify-center items-center"
                    style={{
                        gap: '2rem',
                        marginBottom: '5rem',
                        marginTop: '4rem'
                    }}
                >
                    {/* Primary Button with Magic Effect */}
                    <motion.button
                        onClick={() => setIsCVModalOpen(true)}
                        className="group relative bg-primary text-primary-foreground rounded-full font-medium text-base overflow-hidden border border-primary/20"
                        style={{ padding: '0.5rem 2rem' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Magic Background */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{
                                x: { duration: 0.6, ease: "easeInOut" },
                                opacity: { duration: 0.2 }
                            }}
                        />

                        {/* Sparkle Effect */}
                        <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                        >
                            <Sparkles className="absolute top-2 right-2 w-3 h-3 text-white/60" />
                            <Sparkles className="absolute bottom-2 left-2 w-2 h-2 text-white/40" />
                        </motion.div>

                        <span className="relative z-10 flex items-center gap-2">
                            Download CV
                            <motion.div
                                className="group-hover:translate-x-1 transition-transform duration-200"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </span>
                    </motion.button>

                    {/* Secondary Button with Morphing Border */}
                    <motion.button
                        onClick={() => setIsContactModalOpen(true)}
                        className="group relative bg-transparent text-primary rounded-full font-medium text-base overflow-hidden"
                        style={{ padding: '0.5rem 2rem' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Morphing Border */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary/30"
                            whileHover={{
                                scale: [1, 1.05, 1],
                                borderWidth: ['2px', '3px', '2px'],
                                borderColor: ['rgba(99, 102, 241, 0.3)', 'rgba(99, 102, 241, 1)', 'rgba(99, 102, 241, 0.3)']
                            }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Gradient Fill on Hover */}
                        <motion.div
                            className="absolute inset-0 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                        />

                        <span className="relative z-10">Get In Touch</span>
                    </motion.button>
                </motion.div>

                {/* Enhanced Social Links */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center"
                    style={{ gap: '2rem' }}
                >
                    {[
                        { icon: Github, href: "https://github.com/EnejPolak", label: "GitHub", color: "hover:text-white hover:bg-black" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/enej-polak-095655276/", label: "LinkedIn", color: "hover:text-white hover:bg-blue-600" },
                        { icon: Mail, href: "mailto:enej.polak@gmail.com", label: "Email", color: "hover:text-white hover:bg-green-600" }
                    ].map(({ icon: Icon, href, label, color }) => (
                        <motion.a
                            key={label}
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`group relative p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 transition-all duration-300 ${color}`}
                            whileHover={{
                                scale: 1.1,
                                y: -5
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Glow Effect */}
                            <motion.div
                                className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.3 }}
                            />

                            {/* Icon Rotation */}
                            <motion.div
                                whileHover={{ rotateY: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Icon className="w-7 h-7 relative z-10 transition-colors duration-300" />
                            </motion.div>

                            {/* Tooltip */}
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-primary text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                {label}
                            </span>
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="flex flex-col items-center text-muted-foreground group cursor-pointer">
                    <span className="text-xs mb-3 font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                        SCROLL
                    </span>
                    <motion.div
                        className="p-2 rounded-full border border-muted-foreground/20 group-hover:border-primary/50 transition-colors"
                        whileHover={{ scale: 1.1 }}
                    >
                        <ChevronDown className="w-4 h-4 group-hover:text-primary transition-colors" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Contact Modal */}
            <ContactModal 
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
            
            {/* CV Selection Modal */}
            <CVSelectionModal 
                isOpen={isCVModalOpen}
                onClose={() => setIsCVModalOpen(false)}
            />
            
            {/* CV Selection Modal */}
            <CVSelectionModal 
                isOpen={isCVModalOpen}
                onClose={() => setIsCVModalOpen(false)}
            />
        </section>
    )
}

// Enhanced Typewriter Effect
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
                setTimeout(() => setIsDeleting(true), 1500)
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false)
                setCurrentTextIndex((prev) => (prev + 1) % texts.length)
            }
        }, isDeleting ? 20 : 50)

        return () => clearTimeout(timeout)
    }, [currentText, isDeleting, currentTextIndex, texts])

    return (
        <div className="text-xl font-mono text-accent h-8 flex items-center justify-center">
            <span className="min-w-0">{currentText}</span>
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="text-primary ml-1"
            >
                |
            </motion.span>
        </div>
    )
}

export default Hero