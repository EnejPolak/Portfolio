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
                ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())

                const heroSection = document.querySelector('.hero-section') as HTMLElement
                const projectsSection = document.querySelector('.projects-section') as HTMLElement

                if (!heroSection || !projectsSection) return

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
                    marginTop: '100vh', // Začne se po polni višini Hero sekcije
                    backgroundColor: '#000000', // Črno ozadje
                    minHeight: '100vh'
                })



                // Animacija, kjer se Projects sekcija pomika navzgor preko Hero sekcije
                gsap.timeline({
                    scrollTrigger: {
                        trigger: projectsSection,
                        start: 'top bottom', // Ko Projects sekcija pride na dno viewporta
                        end: 'top top', // Ko Projects sekcija pride na vrh viewporta
                        scrub: 1, // Smooth scrolling animacija
                        pin: false,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            // Hero sekcija izginava med scrollom
                            const progress = self.progress
                            gsap.set(heroSection, {
                                opacity: 1 - progress * 0.3, // Rahlo zatemnitev
                                scale: 1 + progress * 0.05 // Rahlo povečanje
                            })
                        }
                    }
                })



                // Refresh ScrollTrigger
                ScrollTrigger.refresh()

            }, 500) // Povečam timeout za boljše nalaganje

            return () => {
                clearTimeout(timer)
                ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
            }
        }

        loadScrollTrigger()

    }, [])

    return <>{children}</>
}

export default PinnedScrollProvider 