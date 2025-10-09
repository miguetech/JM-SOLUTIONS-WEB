'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { RobotCenter } from './RobotCenter'
import { ServiceCard } from './ServiceCard'
import { FaSearch, FaCogs, FaCode, FaRobot, FaCloud, FaShieldAlt } from 'react-icons/fa'

const services = [
  {
    icon: FaSearch,
    title: 'Auditoría Digital',
    description: 'Análisis profundo de presencia web, SEO, seguridad y oportunidades de mejora',
    angle: 0,
  },
  {
    icon: FaCogs,
    title: 'Automatizaciones',
    description: 'Flujos de trabajo inteligentes que reducen tareas manuales y aumentan eficiencia',
    angle: 60,
  },
  {
    icon: FaCode,
    title: 'Desarrollo Web',
    description: 'Sitios y aplicaciones optimizadas para conversión y experiencia de usuario',
    angle: 120,
  },
  {
    icon: FaRobot,
    title: 'Agentes IA',
    description: 'Asistentes inteligentes personalizados para atención al cliente y procesos internos',
    angle: 180,
  },
  {
    icon: FaCloud,
    title: 'Software as a Service',
    description: 'Plataformas especializadas para gestión de leads y análisis de mercado',
    angle: 240,
  },
  {
    icon: FaShieldAlt,
    title: 'Ciberseguridad',
    description: 'Protección integral de datos y sistemas contra amenazas digitales',
    angle: 300,
  },
]

export default function ServicesWithRobot() {
  return (
    <section id="servicios" className="relative w-full min-h-screen bg-secondary-dark py-20 overflow-hidden">
      {/* Canvas 3D de fondo */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <RobotCenter />
        </Suspense>
      </Canvas>

      {/* Contenido HTML overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          Nuestros Servicios
        </h2>
        <p className="text-center text-text-light mb-16 text-lg">
          Soluciones digitales que transforman tu negocio
        </p>

        {/* Tarjetas posicionadas en círculo */}
        <div className="relative w-full h-[600px]">
          {services.map((service, index) => {
            const radius = 40 // porcentaje desde el centro
            const angleRad = (service.angle * Math.PI) / 180
            const x = 50 + radius * Math.cos(angleRad)
            const y = 50 + radius * Math.sin(angleRad)

            return (
              <div
                key={service.title}
                className="absolute w-64"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
