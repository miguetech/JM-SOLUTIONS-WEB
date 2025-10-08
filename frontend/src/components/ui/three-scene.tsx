'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { ReactNode } from 'react'

interface ThreeSceneProps {
  children: ReactNode
  className?: string
}

export function ThreeScene({ children, className = '' }: ThreeSceneProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {children}
        <OrbitControls />
      </Canvas>
    </div>
  )
}
