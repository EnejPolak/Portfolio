'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const Projects = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const projectsRef = useRef<HTMLDivElement>(null)
    const cardsRefs = useRef<(HTMLDivElement | null)[]>([])
    const titleInView = useInView(containerRef, { once: true, amount: 0.3 })
    const projectsInView = useInView(projectsRef, { once: true, amount: 0.1 })
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)

    const projectsData = [
        {
            name: "1of1",
            image: "/images/work/1of1.png",
            category: "E-commerce",
            technologies: ["Shopify", "HTML", "CSS", "JavaScript"],
            techIcons: [
                "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            ]
        },
        {
            name: "Cologne Room",
            image: "/images/work/cologne room.png",
            category: "E-commerce",
            technologies: ["Shopify", "HTML", "CSS", "JavaScript"],
            techIcons: [
                "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            ]
        },
        {
            name: "Nirvana",
            image: "/images/work/nirvana.png",
            category: "E-commerce",
            technologies: ["Shopify", "HTML", "CSS", "JavaScript"],
            techIcons: [
                "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            ]
        },
        {
            name: "Sweet Samples",
            image: "/images/work/sweet samples.png",
            category: "E-commerce",
            technologies: ["Shopify", "HTML", "CSS", "JavaScript"],
            techIcons: [
                "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            ]
        },
        {
            name: "TM Scent",
            image: "/images/work/tm scent.png",
            category: "E-commerce",
            technologies: ["Shopify", "HTML", "CSS", "JavaScript"],
            techIcons: [
                "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            ]
        },
        {
            name: "AK Žalec",
            image: "/images/work/ak zalec.png",
            category: "Presentation Site",
            technologies: ["HTML", "CSS", "JavaScript"],
            techIcons: [
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            ]
        },
        {
            name: "Schedulizer",
            image: "/images/work/schedulizer.png",
            category: "Web Application",
            technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "GSAP"],
            techIcons: [
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/greensock/greensock-original.svg"
            ]
        }
    ]

    // GSAP-style animations using Framer Motion
    useEffect(() => {
        if (projectsInView && cardsRefs.current) {
            cardsRefs.current.forEach((card, index) => {
                if (card) {
                    // Initial state
                    card.style.transform = 'translateY(120px) rotateX(45deg) scale(0.8)'
                    card.style.opacity = '0'

                    // GSAP-style staggered animation
                    setTimeout(() => {
                        card.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                        card.style.transform = 'translateY(0px) rotateX(0deg) scale(1)'
                        card.style.opacity = '1'
                    }, index * 150 + 300)
                }
            })
        }
    }, [projectsInView])

    const handleMouseEnter = (index: number, card: HTMLDivElement) => {
        setHoveredProject(index)
        // GSAP-style 3D hover effect
        card.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        card.style.transform = `translateY(-20px) scale(1.05) rotateX(-8deg) rotateY(${index % 3 === 0 ? '8deg' : index % 3 === 2 ? '-8deg' : '0deg'}) translateZ(50px)`
        card.style.boxShadow = '0 25px 50px -12px rgba(147, 51, 234, 0.25), 0 0 30px rgba(147, 51, 234, 0.1)'
    }

    const handleMouseLeave = (index: number, card: HTMLDivElement) => {
        setHoveredProject(null)
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        card.style.transform = 'translateY(0px) scale(1) rotateX(0deg) rotateY(0deg) translateZ(0px)'
        card.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }

    return (
        <div style={{ perspective: '1000px' }}>
            {/* Title Section */}
            <section
                ref={containerRef}
                className="relative h-auto flex items-center justify-center bg-black overflow-hidden"
                style={{ paddingTop: '3rem', paddingBottom: '2rem' }}
            >
                {/* Background Stars */}
                <div className="absolute inset-0">
                    {Array.from({ length: 60 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}

                    {Array.from({ length: 10 }).map((_, i) => (
                        <motion.div
                            key={`title-accent-${i}`}
                            className="absolute w-1 h-1 bg-purple-400/60 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0.2, 0.8, 0.2],
                                scale: [0.8, 1.5, 0.8],
                            }}
                            transition={{
                                duration: Math.random() * 4 + 3,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                            }}
                        />
                    ))}
                </div>

                {/* Main Title */}
                <div className="relative z-10 text-center">
                    <motion.h1
                        className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                        style={{
                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                            fontWeight: 700,
                            letterSpacing: "0.05em"
                        }}
                        initial={{ opacity: 0, y: 100 }}
                        animate={titleInView ? { opacity: 1, y: 0 } : {}}
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
                                animate={titleInView ? {
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

                    <motion.div
                        className="mt-8 mx-auto bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 h-0.5"
                        initial={{ width: 0, opacity: 0 }}
                        animate={titleInView ? { width: "200px", opacity: 1 } : {}}
                        transition={{
                            delay: 2,
                            duration: 1,
                            ease: "easeOut"
                        }}
                    />

                    <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
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

            {/* Projects Gallery Section */}
            <section ref={projectsRef} className="relative bg-black overflow-hidden">
                {/* Background Stars */}
                <div className="absolute inset-0">
                    {Array.from({ length: 60 }).map((_, i) => (
                        <motion.div
                            key={`projects-star-${i}`}
                            className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}

                    {Array.from({ length: 10 }).map((_, i) => (
                        <motion.div
                            key={`projects-accent-${i}`}
                            className="absolute w-1 h-1 bg-purple-400/60 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0.2, 0.8, 0.2],
                                scale: [0.8, 1.5, 0.8],
                            }}
                            transition={{
                                duration: Math.random() * 4 + 3,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                            }}
                        />
                    ))}
                </div>

                <div className="mx-auto px-4 relative z-10">
                    <div
                        className="w-full flex flex-col items-center"
                        style={{
                            paddingTop: '2rem',
                            paddingBottom: '4rem',
                            perspective: '1200px'
                        }}
                    >
                        {/* First Row - 3 projects (1, 2, 3) */}
                        <div
                            className="flex flex-wrap justify-center"
                            style={{
                                gap: '3rem',
                                marginBottom: '4rem',
                                maxWidth: '1200px'
                            }}
                        >
                            {projectsData.slice(0, 3).map((project, index) => (
                                <div
                                    key={project.name}
                                    ref={(el) => { cardsRefs.current[index] = el }}
                                    className="cursor-pointer"
                                    onMouseEnter={(e) => handleMouseEnter(index, e.currentTarget)}
                                    onMouseLeave={(e) => handleMouseLeave(index, e.currentTarget)}
                                    style={{
                                        width: '288px',
                                        height: '320px',
                                        transformStyle: 'preserve-3d',
                                        transform: 'translateY(120px) rotateX(45deg) scale(0.8)',
                                        opacity: 0
                                    }}
                                >
                                    <div className="relative bg-gray-900/90 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm w-full h-full">
                                        <div className="relative h-40 overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="w-full h-full object-cover transition-transform duration-700"
                                                style={{
                                                    transform: hoveredProject === index ? 'scale(1.1)' : 'scale(1)'
                                                }}
                                            />
                                        </div>

                                        <div className="px-6 py-5 h-40 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
                                                <p className="text-purple-300 text-sm mb-3">{project.category}</p>
                                            </div>

                                            <div className="flex justify-center gap-2 mb-3">
                                                {project.techIcons.map((icon: string, i: number) => (
                                                    <div
                                                        key={i}
                                                        className="w-8 h-8 p-1.5 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300"
                                                        style={{
                                                            transform: hoveredProject === index ? 'scale(1.1) rotateY(360deg)' : 'scale(1)',
                                                            transitionDelay: hoveredProject === index ? `${i * 50}ms` : '0ms'
                                                        }}
                                                    >
                                                        <img
                                                            src={icon}
                                                            alt={project.technologies[i]}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Second Row - 3 projects (4, 5, 6) */}
                        <div
                            className="flex flex-wrap justify-center"
                            style={{
                                gap: '3rem',
                                marginBottom: '4rem',
                                maxWidth: '1200px'
                            }}
                        >
                            {projectsData.slice(3, 6).map((project, index) => {
                                const realIndex = index + 3;
                                return (
                                    <div
                                        key={project.name}
                                        ref={(el) => { cardsRefs.current[realIndex] = el }}
                                        className="cursor-pointer"
                                        onMouseEnter={(e) => handleMouseEnter(realIndex, e.currentTarget)}
                                        onMouseLeave={(e) => handleMouseLeave(realIndex, e.currentTarget)}
                                        style={{
                                            width: '288px',
                                            height: '320px',
                                            transformStyle: 'preserve-3d',
                                            transform: 'translateY(120px) rotateX(45deg) scale(0.8)',
                                            opacity: 0
                                        }}
                                    >
                                        <div className="relative bg-gray-900/90 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm w-full h-full">
                                            <div className="relative h-40 overflow-hidden">
                                                <img
                                                    src={project.image}
                                                    alt={project.name}
                                                    className="w-full h-full object-cover transition-transform duration-700"
                                                    style={{
                                                        transform: hoveredProject === realIndex ? 'scale(1.1)' : 'scale(1)'
                                                    }}
                                                />
                                            </div>

                                            <div className="p-5 h-40 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
                                                    <p className="text-purple-300 text-sm mb-3">{project.category}</p>
                                                </div>

                                                <div className="flex justify-center gap-2">
                                                    {project.techIcons.map((icon: string, i: number) => (
                                                        <div
                                                            key={i}
                                                            className="w-8 h-8 p-1.5 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300"
                                                            style={{
                                                                transform: hoveredProject === realIndex ? 'scale(1.1) rotateY(360deg)' : 'scale(1)',
                                                                transitionDelay: hoveredProject === realIndex ? `${i * 50}ms` : '0ms'
                                                            }}
                                                        >
                                                            <img
                                                                src={icon}
                                                                alt={project.technologies[i]}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Third Row - 1 project centered (7) */}
                        <div className="flex justify-center">
                            <div
                                ref={(el) => { cardsRefs.current[6] = el }}
                                className="cursor-pointer"
                                onMouseEnter={(e) => handleMouseEnter(6, e.currentTarget)}
                                onMouseLeave={(e) => handleMouseLeave(6, e.currentTarget)}
                                style={{
                                    width: '288px',
                                    height: '320px',
                                    transformStyle: 'preserve-3d',
                                    transform: 'translateY(120px) rotateX(45deg) scale(0.8)',
                                    opacity: 0
                                }}
                            >
                                <div className="relative bg-gray-900/90 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm w-full h-full">
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={projectsData[6].image}
                                            alt={projectsData[6].name}
                                            className="w-full h-full object-cover transition-transform duration-700"
                                            style={{
                                                transform: hoveredProject === 6 ? 'scale(1.1)' : 'scale(1)'
                                            }}
                                        />
                                    </div>

                                    <div className="p-5 h-40 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">{projectsData[6].name}</h3>
                                            <p className="text-purple-300 text-sm mb-3">{projectsData[6].category}</p>
                                        </div>

                                        <div className="flex justify-center gap-2">
                                            {projectsData[6].techIcons.map((icon: string, i: number) => (
                                                <div
                                                    key={i}
                                                    className="w-8 h-8 p-1.5 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300"
                                                    style={{
                                                        transform: hoveredProject === 6 ? 'scale(1.1) rotateY(360deg)' : 'scale(1)',
                                                        transitionDelay: hoveredProject === 6 ? `${i * 50}ms` : '0ms'
                                                    }}
                                                >
                                                    <img
                                                        src={icon}
                                                        alt={projectsData[6].technologies[i]}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Projects