'use client'

import { useEffect, useRef, useState } from 'react'
import { FaSearch, FaCogs, FaCode, FaRobot, FaCloud, FaShieldAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

const services = [
  {
    icon: FaSearch,
    title: 'Auditoría Digital',
    description: 'Análisis profundo de presencia web, SEO y seguridad',
    angle: 0,
  },
  {
    icon: FaCogs,
    title: 'Automatizaciones',
    description: 'Flujos inteligentes que aumentan eficiencia',
    angle: 60,
  },
  {
    icon: FaCode,
    title: 'Desarrollo Web',
    description: 'Aplicaciones optimizadas para conversión',
    angle: 120,
  },
  {
    icon: FaRobot,
    title: 'Agentes IA',
    description: 'Asistentes inteligentes personalizados',
    angle: 180,
  },
  {
    icon: FaCloud,
    title: 'SaaS',
    description: 'Plataformas para gestión y análisis',
    angle: 240,
  },
  {
    icon: FaShieldAlt,
    title: 'Ciberseguridad',
    description: 'Protección integral de datos y sistemas',
    angle: 300,
  },
]

export function FloatingPanels() {
  const panelsRef = useRef<HTMLDivElement[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const animatePanel = (element: HTMLDivElement, delay: number) => {
      let time = delay
      const animate = () => {
        time += 0.01
        const offset = Math.sin(time) * 10
        element.style.transform = `translate(-50%, calc(-50% + ${offset}px))`
        requestAnimationFrame(animate)
      }
      animate()
    }

    panelsRef.current.forEach((panel, index) => {
      if (panel) animatePanel(panel, index * 0.5)
    })
  }, [])

  return (
    <div className="absolute inset-0">
      {services.map((service, index) => {
        const radius = 35
        const angleRad = (service.angle * Math.PI) / 180
        const x = 50 + radius * Math.cos(angleRad)
        const y = 50 + radius * Math.sin(angleRad)

        return (
          <div
            key={service.title}
            ref={(el) => {
              if (el) panelsRef.current[index] = el
            }}
            className="absolute pointer-events-auto"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="w-64 bg-background-dark/90 backdrop-blur-sm p-6 rounded-lg border border-accent-blue/30 transition-all duration-300"
              animate={{
                boxShadow: hoveredIndex === index
                  ? [
                      '0 0 20px rgba(0, 191, 255, 0.6), 0 0 40px rgba(0, 191, 255, 0.8)',
                      '0 0 40px rgba(0, 191, 255, 0.9), 0 0 80px rgba(0, 191, 255, 1)',
                      '0 0 20px rgba(0, 191, 255, 0.6), 0 0 40px rgba(0, 191, 255, 0.8)',
                    ]
                  : '0 0 10px rgba(0, 191, 255, 0.2)',
              }}
              transition={{ duration: 1, repeat: hoveredIndex === index ? Infinity : 0 }}
            >
              <service.icon className="text-4xl text-accent-blue mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-text-light text-sm">{service.description}</p>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
