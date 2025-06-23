'use client'

import { useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'

interface PinnedScrollProviderProps {
    children: ReactNode
}

const PinnedScrollProvider = ({ children }: PinnedScrollProviderProps) => {
    useEffect(() => {
        if (typeof window === 'undefined') return

        // Dinamičen import ScrollTrigger plugin-a
        const loadScrollTrigger = async () => {
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)

            // Počakamo, da se komponente naložijo
            const timer = setTimeout(() => {
                // Počistimo prejšnje scroll trigger-je
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

                const heroSection = document.querySelector('.hero-section') as HTMLElement
                const projectsSection = document.querySelector('.projects-section') as HTMLElement
                const skillsSection = document.querySelector('.skills-section') as HTMLElement

                if (!heroSection || !projectsSection || !skillsSection) return

                // Nastavimo CSS za pinned scrolling
                gsap.set('body', { 
                    overflow: 'auto',
                    height: 'auto'
                })

                gsap.set('main', {
                    position: 'relative'
                })

                // Hero sekcija ostane fiksirana na vrhu
                gsap.set(heroSection, {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 1
                })

                // Projects sekcija se začne pod Hero sekcijo
                gsap.set(projectsSection, {
                    position: 'relative',
                    zIndex: 10,
                    marginTop: '100vh',
                    backgroundColor: '#000000',
                    minHeight: '100vh'
                })

                // Skills sekcija se začne pod Projects sekcijo
                gsap.set(skillsSection, {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 20,
                    x: window.innerWidth,
                    backgroundColor: '#111111'
                })

                // Animacija, kjer se Projects sekcija pomika navzgor preko Hero sekcije
                gsap.timeline({
                    scrollTrigger: {
                        trigger: projectsSection,
                        start: 'top bottom',
                        end: 'top top',
                        scrub: 1,
                        pin: false,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            // Hero sekcija popolnoma izgine hitro
                            const progress = self.progress
                            gsap.set(heroSection, {
                                opacity: Math.max(0, 1 - progress * 3), // Hitreje izgine
                                scale: 1 + progress * 0.1
                            })
                        }
                    }
                })

                // Horizontalna animacija - postopna in dolga
                ScrollTrigger.create({
                    trigger: projectsSection,
                    start: 'bottom bottom',
                    end: '+=500vh', // Veliko daljša razdalja - potrebuje več scrollov
                    scrub: 3, // Še bolj smooth scrub
                    pin: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const progress = self.progress
                        
                        // Postopno easing - počasni začetek, počasen konec
                        const easeInOutCubic = (t: number): number => {
                            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
                        }
                        const easedProgress = easeInOutCubic(progress)
                        
                        // Projects se postopno premika v levo
                        gsap.set(projectsSection, {
                            x: -easedProgress * window.innerWidth,
                            ease: "power3.out"
                        })
                        
                        // Skills postopno pride iz desne strani
                        gsap.set(skillsSection, {
                            x: window.innerWidth * (1 - easedProgress),
                            ease: "power3.out"
                        })
                    }
                })

                // Refresh ScrollTrigger
                ScrollTrigger.refresh()

            }, 500)

            return () => {
                clearTimeout(timer)
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
            }
        }

        loadScrollTrigger()

    }, [])

    return <>{children}</>
}

export default PinnedScrollProvider 