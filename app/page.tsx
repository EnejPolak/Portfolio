import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import FloatingCards from './components/3d/FloatingCard'
import Skills from './components/sections/Skills'
import PinnedScrollProvider from './components/animations/PinnedScrollProvider'

export default function Home() {
    return (
        <PinnedScrollProvider>
            <main className="relative">
                {/* Hero Section - Fiksiran */}
                <section id="hero" className="hero-section">
                    <Hero />
                </section>

                {/* Projects Section - Se premakne navzgor preko Hero */}
                <section id="projects" className="projects-section">
                    <Projects />
                </section>

                {/* Skills Section - Slide in from right */}
                <section id="skills" className="skills-section">
                    <Skills />
                </section>

                {/* Other sections temporarily hidden */}
                {/* 
                <section id="floatingCards">
                    <FloatingCards />
                </section>

                <section id="contact" className="min-h-screen bg-card flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-6xl font-bold gradient-text mb-4">Contact</h2>
                        <p className="text-xl text-muted-foreground">Contact form with animations! 📧</p>
                    </div>
                </section>
                */}
            </main>
        </PinnedScrollProvider>
    )
}