import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Services from '@/components/landing/Services'
import { Model3DSection } from '@/components/landing/Model3DSection'
import Benefits from '@/components/landing/Benefits'
import Contact from '@/components/landing/Contact'
import Footer from '@/components/landing/Footer'


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Model3DSection />
        <Benefits />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
