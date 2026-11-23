import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { About } from '@/components/About'
import { Apartments } from '@/components/Apartments'
import { Classes } from '@/components/Classes'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { StackLayers } from '@/components/StackLayers'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Capas: el servicio se fija y «Sobre Lexa» sube por encima; luego
            «Sobre Lexa» se fija y el resto de la página sube por encima */}
        <StackLayers>
          <Services />
          <About />
          <div className="bg-nieve">
            <Apartments />
            <Classes />
            <Contact />
            <Footer />
          </div>
        </StackLayers>
      </main>
    </>
  )
}
