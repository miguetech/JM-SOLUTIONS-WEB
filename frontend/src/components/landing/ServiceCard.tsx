'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconType } from 'react-icons'

interface ServiceCardProps {
  icon: IconType
  title: string
  description: string
}

export function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; angle: number }[]>([])

  const handleMouseEnter = () => {
    const newStars = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: 50,
      y: 50,
      angle: (i * 360) / 10,
    }))
    setStars(newStars)
    setTimeout(() => setStars([]), 800)
  }

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      className="relative bg-background-dark p-8 rounded-lg hover:border-2 hover:border-accent-blue transition overflow-hidden"
      whileHover={{ scale: 1.05 }}
    >
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-2 h-2 bg-white rounded-full pointer-events-none"
            initial={{ x: '50%', y: '50%', scale: 0, opacity: 1 }}
            animate={{
              x: `calc(50% + ${Math.cos((star.angle * Math.PI) / 180) * 100}px)`,
              y: `calc(50% + ${Math.sin((star.angle * Math.PI) / 180) * 100}px)`,
              scale: [0, 1, 0],
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
      
      <Icon className="text-5xl text-accent-blue mb-4" />
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-text-light">{description}</p>
    </motion.div>
  )
}
