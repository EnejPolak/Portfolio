import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import CustomCursor from './components/ui/CustomCursor'
// import Navigation from './components/layout/Navigation'
// import SmoothScrolling from './components/animations/SmoothScrolling'

export default function Home() {
    return (
        // <SmoothScrolling>
        <main className="relative">
            <CustomCursor />
            {/* <Navigation /> */}

            <section id="home">
                <Hero />
            </section>

            <section id="projects">
                <Projects />
            </section>

            {/* Skills Section Placeholder */}
            <section id="skills" className="min-h-screen bg-muted flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-6xl font-bold gradient-text mb-4">Skills</h2>
                    <p className="text-xl text-muted-foreground">Interactive skill animations! ⚡</p>
                </div>
            </section>

            {/* Contact Section Placeholder */}
            <section id="contact" className="min-h-screen bg-card flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-6xl font-bold gradient-text mb-4">Contact</h2>
                    <p className="text-xl text-muted-foreground">Contact form with animations! 📧</p>
                </div>
            </section>
        </main>
        // </SmoothScrolling>
    )
}