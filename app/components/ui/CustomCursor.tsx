'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        console.log('Pixelart cursor loaded!')

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
            {/* Normalen cursor dot */}
            <motion.div
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                }}
                transition={{
                    type: "spring",
                    stiffness: 1000,
                    damping: 35
                }}
                style={{
                    position: 'fixed',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    opacity: isVisible ? 1 : 0,
                    mixBlendMode: 'difference' as const,
                }}
            />

            {/* Pixelart Avatar Follower */}
            <motion.div
                animate={{
                    x: position.x - 12,
                    y: position.y - 16,
                }}
                transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20
                }}
                className="pixel-character-container"
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <div className="pixel-character" />
            </motion.div>

            <style jsx>{`
                .pixel-character {
                    width: 24px;
                    height: 32px;
                    background: 
                        /* Kodrastki rjavi lasje */
                        radial-gradient(circle at 8px 3px, #8B4513 2px, transparent 2px),
                        radial-gradient(circle at 12px 2px, #A0522D 2px, transparent 2px),
                        radial-gradient(circle at 16px 3px, #8B4513 2px, transparent 2px),
                        radial-gradient(circle at 10px 4px, #654321 1px, transparent 1px),
                        radial-gradient(circle at 14px 4px, #654321 1px, transparent 1px),
                        
                        /* Obraz - svetla polt */
                        radial-gradient(ellipse 8px 6px at 12px 8px, #FDBCB4 8px, transparent 8px),
                        
                        /* Oči */
                        radial-gradient(circle at 10px 7px, #000 0.8px, transparent 0.8px),
                        radial-gradient(circle at 14px 7px, #000 0.8px, transparent 0.8px),
                        
                        /* Nos */
                        radial-gradient(circle at 12px 9px, #F4A460 0.5px, transparent 0.5px),
                        
                        /* Kravata - modra */
                        linear-gradient(to bottom, 
                            transparent 12px, 
                            #1E3A8A 12px, 
                            #1E3A8A 13px, 
                            #3B82F6 13px, 
                            #3B82F6 14px,
                            #1E3A8A 14px,
                            #1E3A8A 24px, 
                            transparent 24px),
                        
                        /* Bela srajca */
                        linear-gradient(to bottom, 
                            transparent 11px, 
                            #FFFFFF 11px, 
                            #FFFFFF 13px, 
                            transparent 13px),
                        
                        /* Temno siv suit */
                        linear-gradient(to bottom, 
                            transparent 13px, 
                            #1F2937 13px, 
                            #1F2937 28px, 
                            transparent 28px),
                        
                        /* Suit gumbki */
                        radial-gradient(circle at 12px 18px, #374151 0.5px, transparent 0.5px),
                        radial-gradient(circle at 12px 22px, #374151 0.5px, transparent 0.5px),
                        
                        /* Roke */
                        radial-gradient(circle at 6px 20px, #1F2937 2px, transparent 2px),
                        radial-gradient(circle at 18px 20px, #1F2937 2px, transparent 2px),
                        radial-gradient(circle at 4px 18px, #FDBCB4 1.5px, transparent 1.5px),
                        radial-gradient(circle at 20px 18px, #FDBCB4 1.5px, transparent 1.5px),
                        
                        /* Noge */
                        radial-gradient(circle at 9px 30px, #1F2937 1.5px, transparent 1.5px),
                        radial-gradient(circle at 15px 30px, #1F2937 1.5px, transparent 1.5px),
                        
                        /* Čevlji */
                        radial-gradient(circle at 8px 31px, #000000 1px, transparent 1px),
                        radial-gradient(circle at 16px 31px, #000000 1px, transparent 1px);
                    
                    image-rendering: pixelated;
                    image-rendering: -moz-crisp-edges;
                    image-rendering: crisp-edges;
                    animation: elegantWalk 1.2s infinite ease-in-out;
                }

                @keyframes elegantWalk {
                    0% { 
                        transform: translateY(0px) rotate(-1deg);
                    }
                    25% { 
                        transform: translateY(-0.5px) rotate(0deg);
                    }
                    50% { 
                        transform: translateY(-1px) rotate(1deg);
                    }
                    75% { 
                        transform: translateY(-0.5px) rotate(0deg);
                    }
                    100% { 
                        transform: translateY(0px) rotate(-1deg);
                    }
                }

                /* Na hover preko elementov se figurica bow-a */
                .pixel-character-container:hover .pixel-character {
                    animation: professionalBow 0.6s ease-in-out;
                }

                @keyframes professionalBow {
                    0% { 
                        transform: rotate(0deg) translateY(0px);
                    }
                    50% { 
                        transform: rotate(15deg) translateY(2px);
                    }
                    100% { 
                        transform: rotate(0deg) translateY(0px);
                    }
                }

                /* Skrij na mobilnih napravah */
                @media (max-width: 768px) {
                    .pixel-character-container {
                        display: none;
                    }
                }
            `}</style>
        </>
    )
}

export default CustomCursor