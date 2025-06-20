// @ts-nocheck

'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import ThreeBackground from '../3d/ThreeBackground'

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement[]>([])
    const isInView = useInView(containerRef, { once: true, amount: 0.2 })

    const skills = [
        {
            name: "React",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            color: "from-cyan-400 via-blue-500 to-purple-600"
        },
        {
            name: "Next.js",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
            color: "from-gray-800 via-gray-600 to-white"
        },
        {
            name: "Tailwind CSS",
            icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
            color: "from-teal-400 via-cyan-500 to-blue-600"
        },
        {
            name: "TypeScript",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
            color: "from-blue-600 via-blue-700 to-blue-800"
        },
        {
            name: "Supabase",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
            color: "from-green-400 via-emerald-500 to-green-600"
        }
    ]

    useEffect(() => {
        if (isInView && typeof window !== 'undefined') {
            // Simulacija GSAP animacije z Framer Motion
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    // Inicial pozicija - kartice so skrite
                    card.style.transform = 'translateY(100px) rotateX(45deg) scale(0.8)'
                    card.style.opacity = '0'

                    // Animacija pojavitve
                    setTimeout(() => {
                        card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        card.style.transform = 'translateY(0) rotateX(0deg) scale(1)'
                        card.style.opacity = '1'
                    }, index * 200)
                }
            })
        }
    }, [isInView])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen py-20 overflow-hidden flex items-center justify-center"
            style={{
                background: 'linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%)',
                zIndex: 12
            }}
        >
            {/* Three.js 3D Background */}
            <ThreeBackground />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center"
                    style={{ marginBottom: '3rem', marginTop: '4rem' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.h2
                        className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                        style={{ marginBottom: '1.5rem' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3, duration: 1 }}
                    >
                        My Skills
                    </motion.h2>
                </motion.div>

                {/* 3D Skills Cards */}
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl perspective-1000">
                        {skills.map((skill, index) => (
                            <div
                                key={skill.name}
                                ref={(el) => {
                                    if (el) cardsRef.current[index] = el
                                }}
                                className="group cursor-pointer"
                                style={{
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                {/* 3D Card */}
                                <motion.div
                                    className="relative w-32 h-40 md:w-40 md:h-48"
                                    whileHover={{
                                        rotateY: index <= 1 ? 15 : index === 2 ? 0 : -15, // Levi +15, srednji 0, desni -15
                                        rotateX: index === 2 ? -15 : -10, // Srednji bolj naprej
                                        scale: 1.1,
                                        z: 50
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20
                                    }}
                                >
                                    {/* Card Front */}
                                    <div
                                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} p-1 shadow-2xl transform-gpu`}
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            backfaceVisibility: 'hidden'
                                        }}
                                    >
                                        <div className="w-full h-full bg-slate-900/95 rounded-2xl flex flex-col items-center justify-center p-6">
                                            {/* Icon Container */}
                                            <motion.div
                                                className="w-16 h-16 md:w-20 md:h-20 mb-4 relative"
                                                whileHover={{
                                                    rotateY: 360,
                                                    scale: 1.2
                                                }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <img
                                                    src={skill.icon}
                                                    alt={skill.name}
                                                    className="w-full h-full object-contain drop-shadow-lg"
                                                />

                                                {/* Glow Effect */}
                                                <motion.div
                                                    className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-full blur-xl opacity-0 group-hover:opacity-30`}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </motion.div>

                                            {/* Skill Name */}
                                            <motion.h3
                                                className="text-white font-semibold text-lg md:text-xl text-center leading-tight"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {skill.name}
                                            </motion.h3>
                                        </div>
                                    </div>

                                    {/* Card Shadow/Depth */}
                                    <div
                                        className="absolute inset-0 bg-black/50 rounded-2xl blur-xl transform translate-y-4 translate-x-2 -z-10"
                                        style={{ transform: 'translateZ(-20px) translateY(10px)' }}
                                    />
                                </motion.div>

                                {/* Floating Particles on Hover */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className={`absolute w-1 h-1 bg-gradient-to-r ${skill.color} rounded-full`}
                                            style={{
                                                left: `${Math.random() * 100}%`,
                                                top: `${Math.random() * 100}%`,
                                            }}
                                            animate={{
                                                y: [-10, -30, -10],
                                                opacity: [0, 1, 0],
                                                scale: [0, 1.5, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: Math.random() * 2,
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional CSS for 3D perspective */}
            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .transform-gpu {
                    transform: translateZ(0);
                    will-change: transform;
                }
            `}</style>
        </section>
    )
}

export default Skills