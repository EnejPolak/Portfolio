// @ts-nocheck

'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.2 })
    const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

    const skills = [
        {
            name: "HTML",
            level: 95,
            color: "from-orange-500 to-red-500",
            icon: "🌐"
        },
        {
            name: "CSS",
            level: 90,
            color: "from-blue-500 to-cyan-500",
            icon: "🎨"
        },
        {
            name: "JavaScript",
            level: 88,
            color: "from-yellow-500 to-orange-500",
            icon: "⚡"
        },
        {
            name: "React",
            level: 85,
            color: "from-cyan-500 to-blue-500",
            icon: "⚛️"
        },
        {
            name: "Next.js",
            level: 82,
            color: "from-gray-500 to-gray-800",
            icon: "🚀"
        },
        {
            name: "TypeScript",
            level: 80,
            color: "from-blue-600 to-blue-800",
            icon: "📘"
        },
        {
            name: "Tailwind CSS",
            level: 92,
            color: "from-teal-500 to-cyan-500",
            icon: "💨"
        },
        {
            name: "Figma",
            level: 85,
            color: "from-purple-500 to-pink-500",
            icon: "🎭"
        },
        {
            name: "Photoshop",
            level: 78,
            color: "from-blue-500 to-purple-600",
            icon: "🖼️"
        },
        {
            name: "Shopify",
            level: 75,
            color: "from-green-500 to-emerald-500",
            icon: "🛒"
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    const skillVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        }
    }

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen py-20 bg-gradient-to-br from-muted via-background to-muted overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
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
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
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

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 100 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.span
                        className="text-primary font-mono text-lg mb-4 block"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        What I know
                    </motion.span>

                    <motion.h2
                        className="text-section gradient-text mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Skills & Technologies
                    </motion.h2>

                    <motion.p
                        className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Technologies I use to bring ideas to life 🛠️
                    </motion.p>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    className="max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                variants={skillVariants}
                                className="relative group"
                                onHoverStart={() => setHoveredSkill(index)}
                                onHoverEnd={() => setHoveredSkill(null)}
                            >
                                {/* Skill Card */}
                                <motion.div
                                    className="p-6 rounded-xl glass backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300"
                                    whileHover={{
                                        scale: 1.02,
                                        y: -5,
                                        boxShadow: "0 20px 40px rgba(99, 102, 241, 0.1)"
                                    }}
                                >
                                    {/* Skill Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <motion.span
                                                className="text-2xl"
                                                animate={{
                                                    scale: hoveredSkill === index ? 1.2 : 1,
                                                    rotate: hoveredSkill === index ? 360 : 0,
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {skill.icon}
                                            </motion.span>
                                            <h3 className="text-xl font-semibold">{skill.name}</h3>
                                        </div>
                                        <motion.span
                                            className="text-primary font-bold text-lg"
                                            animate={{
                                                scale: hoveredSkill === index ? 1.1 : 1,
                                            }}
                                        >
                                            {skill.level}%
                                        </motion.span>
                                    </div>

                                    {/* Progress Bar Background */}
                                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden relative">
                                        {/* Animated Progress Bar */}
                                        <motion.div
                                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                                            initial={{ width: 0 }}
                                            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                                            transition={{
                                                delay: 0.5 + index * 0.1,
                                                duration: 1.5,
                                                ease: "easeOut"
                                            }}
                                        >
                                            {/* Shimmer Effect */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                                                animate={{
                                                    x: ["-100%", "100%"]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: 1 + index * 0.1,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        </motion.div>

                                        {/* Pulse Effect on Hover */}
                                        <motion.div
                                            className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-full opacity-0`}
                                            animate={{
                                                opacity: hoveredSkill === index ? [0, 0.3, 0] : 0,
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: hoveredSkill === index ? Infinity : 0,
                                            }}
                                        />
                                    </div>

                                    {/* Floating Particles */}
                                    {hoveredSkill === index && (
                                        <div className="absolute inset-0 pointer-events-none">
                                            {Array.from({ length: 6 }).map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute w-1 h-1 bg-primary rounded-full"
                                                    style={{
                                                        left: `${Math.random() * 100}%`,
                                                        top: `${Math.random() * 100}%`,
                                                    }}
                                                    animate={{
                                                        y: [-20, -40, -20],
                                                        opacity: [0, 1, 0],
                                                        scale: [0, 1, 0],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: Math.random() * 2,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Fun Stats */}
                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                        {[
                            { number: "10+", label: "Technologies" },
                            { number: "50+", label: "Projects" },
                            { number: "3+", label: "Years Experience" },
                            { number: "∞", label: "Learning" }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="p-4 rounded-lg glass"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <motion.div
                                    className="text-2xl font-bold gradient-text mb-1"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.5,
                                    }}
                                >
                                    {stat.number}
                                </motion.div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Skills