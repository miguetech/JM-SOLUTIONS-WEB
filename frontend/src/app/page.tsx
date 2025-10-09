import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import ServicesWithRobot from "@/components/landing/ServicesWithRobot";
import { Model3DSection } from "@/components/landing/Model3DSection";
import Robot3DScene from "@/components/landing/Robot3DScene";
import Benefits from '@/components/landing/Benefits'
import Contact from '@/components/landing/Contact'
import Footer from '@/components/landing/Footer'
import Draggable3DCarousel from "@/components/landing/Draggable3DCarousel";


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* <ServicesWithRobot /> */}
        <Draggable3DCarousel />
        <Robot3DScene />
        <Model3DSection />
        <Benefits />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
