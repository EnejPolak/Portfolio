import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import FloatingCards from './components/3d/FloatingCard'
import Skills from './components/sections/Skills'
import PinnedScrollProvider from './components/animations/PinnedScrollProvider'

export default function Home() {
    return (
        <main className="relative overflow-hidden">
            {/* PinnedScrollProvider z vsemi sekcijami */}
            <PinnedScrollProvider>
                {/* Hero Section */}
                <section id="hero" className="hero-section w-full h-screen">
                    <Hero />
                </section>

                {/* Projects Section */}
                <section id="projects" className="projects-section w-full min-h-screen">
                    <Projects />
                </section>

                {/* Skills Section */}
                <section id="skills" className="skills-section w-full h-screen">
                    <Skills />
                </section>
            </PinnedScrollProvider>
        </main>
    )
}