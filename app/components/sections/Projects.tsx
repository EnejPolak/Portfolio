'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const projectsRef = useRef<HTMLDivElement>(null)
    const cardsRefs = useRef<(HTMLDivElement | null)[]>([])
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const titleInView = useInView(containerRef, { once: true, amount: 0.3 })
    const projectsInView = useInView(projectsRef, { once: true, amount: 0.1 })
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)

    // Links mapping za projekte
    const projectLinks = {
        "1of1": "https://1of1suppliers.com/",
        "Cologne Room": "https://thecologneroom.co.uk/",
        "Nirvana": "https://nirvana-perfume.com/",
        "Sweet Samples": "https://sweetsamplesuk.com/",
        "TM Scent": "",
        "AK Žalec": "https://www.atletski-klub-zalec.si/",
        "Schedulizer": ""
    }

    const projectsData = [
        {
            name: "1of1",
            image: "/images/work/1of1.png",
            category: "E-commerce",
            categoryColor: "from-emerald-400 via-cyan-500 to-blue-500",
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
            categoryColor: "from-purple-400 via-pink-500 to-red-500",
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
            categoryColor: "from-indigo-400 via-purple-500 to-pink-500",
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
            categoryColor: "from-orange-400 via-red-500 to-pink-500",
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
            categoryColor: "from-teal-400 via-green-500 to-blue-500",
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
            categoryColor: "from-yellow-400 via-orange-500 to-red-500",
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
            categoryColor: "from-cyan-400 via-blue-500 to-purple-600",
            technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "GSAP"],
            techIcons: [
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
                "/images/GSAP.png"
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

    // Interactive Topographic Canvas Animation
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Configuration options for topography
        const config = {
            linesCount: 40,
            baseAmplitude: 50,
            interactionRadius: 150,
            interactionStrength: 30,
            lineWidth: 1.8,
            speed: 0.003,
            elasticity: 0.012,
            flowSpeed: 0.8,
            damping: 0.99
        }

        let time = 0
        let animationId: number

        // Set canvas dimensions
        const resizeCanvas = () => {
            const parent = canvas.parentElement
            if (parent) {
                canvas.width = parent.offsetWidth
                canvas.height = Math.max(parent.offsetHeight, window.innerHeight) + 100
            } else {
                canvas.width = canvas.offsetWidth
                canvas.height = Math.max(canvas.offsetHeight, window.innerHeight) + 100
            }
        }

        // Track mouse position and movement
        let mouseX = 0
        let mouseY = 0
        let lastMouseX = -1
        let lastMouseY = -1
        let mouseOnCanvas = false
        // let isMoving = false
        const moveTimeout: NodeJS.Timeout | null = null
        // let lastInteractionTime = 0

        // Track state for each line with flow properties
        const linesState: Array<{
            baseY: number
            flowCenter: number | null
            flowStartTime: number
            flowStrength: number
            currentOffset: number
            targetOffset: number
            velocity: number
        }> = []

        // Initialize the line states
        const initLines = () => {
            linesState.length = 0
            
            for (let i = 0; i < config.linesCount; i++) {
                const baseY = canvas.height / (config.linesCount - 1) * i
                
                linesState.push({
                    baseY: baseY,
                    flowCenter: null,
                    flowStartTime: 0,
                    flowStrength: 0,
                    currentOffset: 0,
                    targetOffset: 0,
                    velocity: 0
                })
            }
        }

        // Initialize
        resizeCanvas()
        initLines()
        
        console.log('Canvas initialized:', canvas.width, canvas.height)
        console.log('Lines count:', linesState.length)

        // Throttled mouse movement handling
        // let lastInteractionX = 0
        // let lastInteractionY = 0
        // let movementAccumulator = 0

        // Mouse event handlers
        const handleMouseMove = (e: MouseEvent) => {
            // For fixed positioned canvas, use clientX/Y directly
            mouseX = e.clientX
            mouseY = e.clientY
            mouseOnCanvas = true
            
            console.log('Mouse move:', mouseX, mouseY) // Debug
            
            // Always create interaction effects when mouse moves
            const now = performance.now()
            
            // Check which lines are within interaction range and create effects
            for (let i = 0; i < linesState.length; i++) {
                const line = linesState[i]
                
                const dy = line.baseY - mouseY
                const distance = Math.abs(dy)
                
                if (distance < config.interactionRadius) {
                    const effect = (1 - distance / config.interactionRadius) * config.interactionStrength
                    
                    line.flowCenter = mouseX
                    line.flowStartTime = now
                    line.flowStrength = effect
                    
                    console.log('Creating effect for line', i, 'with strength', effect) // Debug
                }
            }
            
            lastMouseX = mouseX
            lastMouseY = mouseY
        }

        const handleMouseOut = () => {
            mouseOnCanvas = false
        }

        // Create more realistic topography noise
        const noise = (x: number, y: number, time: number) => {
            const layer1 = Math.sin(x * 0.008 + time) * Math.cos(y * 0.008 + time * 0.7)
            const layer2 = Math.sin(x * 0.02 + time * 0.5) * Math.cos(y * 0.02 + time * 0.3) * 0.5
            const layer3 = Math.sin(x * 0.05 + time * 0.2) * Math.cos(y * 0.05 + time * 0.1) * 0.25
            
            return layer1 + layer2 + layer3
        }

        // Calculate flow effect at a specific point
        const calculateFlowEffect = (line: typeof linesState[0], x: number, now: number) => {
            if (!line.flowCenter || now - line.flowStartTime > 6000) {
                return 0
            }
            
            const distance = Math.abs(x - line.flowCenter)
            const flowTime = now - line.flowStartTime
            const flowRadius = flowTime * config.flowSpeed
            const flowDist = Math.abs(distance - flowRadius)
            
            if (flowDist < 200) {
                const effect = line.flowStrength * Math.cos(flowDist * 0.015) * (1 - flowDist / 200)
                return effect
            }
            
            return 0
        }

        // Soft, muted white and gray tones - less contrasting
                    const colors = ['rgba(99, 102, 241, 0.6)', 'rgba(99, 102, 241, 0.5)', 'rgba(99, 102, 241, 0.4)', 'rgba(99, 102, 241, 0.3)', 'rgba(99, 102, 241, 0.2)']

        // Animation loop
        const animate = () => {
            const now = performance.now()
            
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            
            for (let i = 0; i < linesState.length; i++) {
                const line = linesState[i]
                
                ctx.beginPath()
                
                // Set topographic color based on elevation
                const colorPosition = i / config.linesCount
                let colorIndex = Math.floor(colorPosition * colors.length)
                if (colorIndex >= colors.length) colorIndex = colors.length - 1
                
                ctx.strokeStyle = colors[colorIndex]
                ctx.lineWidth = config.lineWidth
                
                for (let x = 0; x <= canvas.width; x += 3) {
                    const terrainFrequency = 0.3 + (i / config.linesCount) * 0.7
                    
                    const naturalY = line.baseY + 
                                   (noise(x * terrainFrequency, line.baseY * terrainFrequency, time) * 
                                   config.baseAmplitude)
                    
                    const flowEffect = calculateFlowEffect(line, x, now)
                    const y = naturalY + flowEffect
                    
                    if (x === 0) {
                        ctx.moveTo(x, y)
                    } else {
                        ctx.lineTo(x, y)
                    }
                }
                
                ctx.stroke()
            }
            
            time += config.speed
            animationId = requestAnimationFrame(animate)
        }

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseout', handleMouseOut)
        window.addEventListener('resize', () => {
            resizeCanvas()
            initLines()
        })

        // Start animation
        animate()

        // Cleanup
        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId)
            }
            document.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseout', handleMouseOut)
            if (moveTimeout) {
                clearTimeout(moveTimeout)
            }
        }
    }, [])

    const handleMouseEnter = (index: number, card: HTMLDivElement) => {
        setHoveredProject(index)
        // GSAP-style 3D hover effect
        card.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        card.style.transform = `translateY(-20px) scale(1.05) rotateX(-8deg) rotateY(${index % 3 === 0 ? '8deg' : index % 3 === 2 ? '-8deg' : '0deg'}) translateZ(50px)`
        card.style.boxShadow = '0 25px 50px -12px rgba(147, 51, 234, 0.4), 0 0 30px rgba(147, 51, 234, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)'
    }

    const handleMouseLeave = (index: number, card: HTMLDivElement) => {
        setHoveredProject(null)
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        card.style.transform = 'translateY(0px) scale(1) rotateX(0deg) rotateY(0deg) translateZ(0px)'
        card.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }

    // Handle project click za odpiranje linkov
    const handleProjectClick = (projectName: string) => {
        const link = projectLinks[projectName as keyof typeof projectLinks]
        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer')
        }
    }

    return (
        <div className="relative" style={{ 
            perspective: '1000px',
            background: 'linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%)',
            minHeight: '100vh',
            overflow: 'hidden'
        }}>
            {/* Parallax Background Layer */}
            <div className="parallax-bg absolute inset-0 w-full h-full">
                {/* Interactive Topographic Canvas Background */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-auto"
                    style={{
                        zIndex: 0,
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)',
                        opacity: 0.8,
                        minHeight: '100%'
                    }}
                />
            </div>

            {/* Content Container with proper z-index */}
            <div ref={containerRef} className="relative z-10">
                {/* Title Section */}
            <section
                className="relative h-auto flex items-center justify-center overflow-hidden"
                style={{ 
                    paddingTop: '1.5rem', 
                    paddingBottom: '1rem',
                    zIndex: 10
                }}
            >
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
                        className="mt-4 mx-auto bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 h-0.5"
                        initial={{ width: 0, opacity: 0 }}
                        animate={titleInView ? { width: "200px", opacity: 1 } : {}}
                        transition={{
                            delay: 2,
                            duration: 1,
                            ease: "easeOut"
                        }}
                    />
                </div>
            </section>

            {/* Projects Gallery Section */}
            <section ref={projectsRef} className="relative overflow-hidden" style={{ zIndex: 10 }}>
                <div className="mx-auto px-4 relative z-10">
                    <div
                        className="w-full flex flex-col items-center"
                        style={{
                            paddingTop: '1rem',
                            paddingBottom: '5rem',
                            perspective: '1200px'
                        }}
                    >
                        {/* First Row - 3 projects (1, 2, 3) */}
                        <div
                            className="flex flex-wrap justify-center"
                            style={{
                                gap: '2rem',
                                marginBottom: '2rem',
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
                                    onClick={() => handleProjectClick(project.name)}
                                    style={{
                                        width: '288px',
                                        height: '320px',
                                        transformStyle: 'preserve-3d',
                                        transform: 'translateY(120px) rotateX(45deg) scale(0.8)',
                                        opacity: 0
                                    }}
                                >
                                    <div className="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm w-full h-full" style={{backgroundColor: '#0e1111'}}>
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

                                        <div className="px-6 py-5 h-40 flex flex-col">
                                            <div className="text-center">
                                                <h3 className="text-2xl font-semibold text-white mb-2">{project.name}</h3>
                                                <p className={`text-sm mb-4 bg-gradient-to-r ${project.categoryColor} bg-clip-text text-transparent font-medium`}>
                                                    {project.category}
                                                </p>
                                            </div>

                                            <div className="flex justify-center gap-2 mt-6">
                                                {project.techIcons.map((icon: string, i: number) => (
                                                    <div
                                                        key={i}
                                                        className={`w-10 h-10 ${icon.includes('GSAP.png') ? 'p-0' : 'p-2'} bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300`}
                                                        style={{
                                                            transform: hoveredProject === index ? 'scale(1.1) rotateY(360deg)' : 'scale(1)',
                                                            transitionDelay: hoveredProject === index ? `${i * 50}ms` : '0ms'
                                                        }}
                                                    >
                                                        <img
                                                            src={icon}
                                                            alt={project.technologies[i]}
                                                            className="w-full h-full object-contain"
                                                            style={icon.includes('GSAP.png') ? { 
                                                                transform: 'scale(1.3)',
                                                                filter: 'brightness(1.2) contrast(1.2)'
                                                            } : {}}
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
                                gap: '2rem',
                                marginBottom: '1.5rem',
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
                                        onClick={() => handleProjectClick(project.name)}
                                        style={{
                                            width: '288px',
                                            height: '320px',
                                            transformStyle: 'preserve-3d',
                                            transform: 'translateY(120px) rotateX(45deg) scale(0.8)',
                                            opacity: 0
                                        }}
                                    >
                                        <div className="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm w-full h-full" style={{backgroundColor: '#0e1111'}}>
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

                                            <div className="px-6 py-5 h-40 flex flex-col">
                                                                                            <div className="text-center">
                                                <h3 className="text-2xl font-semibold text-white mb-2">{project.name}</h3>
                                                <p className={`text-sm mb-4 bg-gradient-to-r ${project.categoryColor} bg-clip-text text-transparent font-medium`}>
                                                    {project.category}
                                                </p>
                                            </div>

                                                <div className="flex justify-center gap-2 mt-6">
                                                    {project.techIcons.map((icon: string, i: number) => (
                                                        <div
                                                            key={i}
                                                            className={`w-10 h-10 ${icon.includes('GSAP.png') ? 'p-0' : 'p-2'} bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300`}
                                                            style={{
                                                                transform: hoveredProject === realIndex ? 'scale(1.1) rotateY(360deg)' : 'scale(1)',
                                                                transitionDelay: hoveredProject === realIndex ? `${i * 50}ms` : '0ms'
                                                            }}
                                                        >
                                                            <img
                                                                src={icon}
                                                                alt={project.technologies[i]}
                                                                className="w-full h-full object-contain"
                                                                style={icon.includes('GSAP.png') ? { 
                                                                    transform: 'scale(1.3)',
                                                                    filter: 'brightness(1.2) contrast(1.2)'
                                                                } : {}}
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
                                onClick={() => handleProjectClick(projectsData[6].name)}
                                style={{
                                    width: '288px',
                                    height: '320px',
                                    transformStyle: 'preserve-3d',
                                    transform: 'translateY(120px) rotateX(45deg) scale(0.8)',
                                    opacity: 0
                                }}
                            >
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm w-full h-full" style={{backgroundColor: '#0e1111'}}>
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

                                    <div className="px-6 py-5 h-40 flex flex-col">
                                        <div className="text-center">
                                            <h3 className="text-2xl font-semibold text-white mb-2">{projectsData[6].name}</h3>
                                            <p className={`text-sm mb-4 bg-gradient-to-r ${projectsData[6].categoryColor} bg-clip-text text-transparent font-medium`}>
                                                {projectsData[6].category}
                                            </p>
                                        </div>

                                        <div className="flex justify-center gap-2 mt-6">
                                            {projectsData[6].techIcons.map((icon: string, i: number) => (
                                                <div
                                                    key={i}
                                                    className={`w-10 h-10 ${icon.includes('GSAP.png') ? 'p-0' : 'p-2'} bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300`}
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
        </div>
    )
}

export default Projects
