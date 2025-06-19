import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import FloatingCards from './components/3d/FloatingCard'
import Skills from './components/sections/Skills'

export default function Home() {
    return (
        <main className="relative">
            {/* Hero Section */}
            <section id="home">
                <Hero />
            </section>

            {/* Projects Section */}
            <section id="projects">
                <Projects />
            </section>

            {/* Other sections temporarily hidden */}
            {/* 
            <section id="floatingCards">
                <FloatingCards />
            </section>

            <section id="skills">
                <Skills />
            </section>

            <section id="contact" className="min-h-screen bg-card flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-6xl font-bold gradient-text mb-4">Contact</h2>
                    <p className="text-xl text-muted-foreground">Contact form with animations! 📧</p>
                </div>
            </section>
            */}
        </main>
    )
}