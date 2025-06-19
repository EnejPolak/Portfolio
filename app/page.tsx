import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import FloatingCards from './components/3d/FloatingCard'
import Skills from './components/sections/Skills'
import ScrollOverlay from './components/animations/ScrollOverlay'

export default function Home() {
    return (
        <ScrollOverlay>
            <main className="relative">
                {/* <Navigation /> */}

                {/* Hero Section - will be fixed during scroll */}
                <section id="home" className="hero-section">
                    <Hero />
                </section>

                {/* Projects Section - will slide up and overlay */}
                <section id="projects" className="overlay-section">
                    <Projects />
                </section>

                <section id="floatingCards" className="overlay-section">
                    <FloatingCards />
                </section>

                {/* Skills Section */}
                <section id="skills" className="overlay-section">
                    <Skills />
                </section>

                {/* Contact Section Placeholder */}
                <section id="contact" className="overlay-section min-h-screen bg-card flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-6xl font-bold gradient-text mb-4">Contact</h2>
                        <p className="text-xl text-muted-foreground">Contact form with animations! 📧</p>
                    </div>
                </section>
            </main>
        </ScrollOverlay>
    )
}