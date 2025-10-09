'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { RobotCenter } from './RobotCenter'
import { StarField } from './StarField'
import { FloatingPanels } from './FloatingPanels'

export default function Robot3DScene() {
  return (
    <section id="servicios" className="relative w-full h-screen bg-black overflow-hidden">
      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <StarField />
          <RobotCenter />
        </Suspense>
      </Canvas>

      {/* Tarjetas de servicios flotantes (HTML overlay) */}
      <FloatingPanels />
    </section>
  )
}
