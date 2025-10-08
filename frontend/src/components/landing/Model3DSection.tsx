'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { SoluModel } from '../ui/solu-model'
import { Suspense } from 'react'

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
}

export function Model3DSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Nuestras Soluciones
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubre cómo JM Solutions transforma tu negocio con tecnología innovadora
          </p>
        </div>
        
        <div className="h-96 w-full rounded-lg overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Environment preset="city" />
            
            <Suspense fallback={null}>
              <SoluModel scale={2} autoRotate={true} />
            </Suspense>
            
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              maxDistance={10}
              minDistance={2}
            />
          </Canvas>
        </div>
      </div>
    </section>
  )
}