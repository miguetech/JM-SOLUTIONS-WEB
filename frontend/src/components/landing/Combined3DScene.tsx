'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { OrbitControls, Environment, Stars } from '@react-three/drei'
import { RobotCenter } from './RobotCenter'
import { SoluModel } from '../ui/solu-model'
import { StarField } from './StarField'
import { FloatingPanels } from './FloatingPanels'

type SceneMode = 'robot' | 'model'

export default function Combined3DScene() {
  const [sceneMode, setSceneMode] = useState<SceneMode>('robot')

  const switchToRobot = () => setSceneMode('robot')
  const switchToModel = () => setSceneMode('model')

  return (
    <>
      {/* Scene Mode Toggle Buttons */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={switchToRobot}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            sceneMode === 'robot'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Robot Scene
        </button>
        <button
          onClick={switchToModel}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            sceneMode === 'model'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          SOLU Model
        </button>
      </div>

      {/* Main 3D Canvas */}
      <div className="relative w-full h-screen bg-black overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          className="absolute inset-0"
        >
          <Suspense fallback={null}>
            {/* Common Lighting */}
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {/* Robot Scene */}
            {sceneMode === 'robot' && (
              <>
                <StarField />
                <RobotCenter />
              </>
            )}

            {/* SOLU Model Scene */}
            {sceneMode === 'model' && (
              <>
                <Environment preset="city" />
                <SoluModel scale={2} autoRotate={true} />
                <OrbitControls
                  enablePan={false}
                  enableZoom={true}
                  maxDistance={10}
                  minDistance={2}
                />
              </>
            )}
          </Suspense>
        </Canvas>

        {/* Floating Panels (only for robot scene) */}
        {sceneMode === 'robot' && <FloatingPanels />}
      </div>

      {/* Scene Description */}
      <div className="absolute bottom-4 right-4 z-10 bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-gray-600">
        <h3 className="text-white font-medium mb-2">
          {sceneMode === 'robot' ? 'Robot Scene' : 'SOLU Model'}
        </h3>
        <p className="text-gray-300 text-sm">
          {sceneMode === 'robot'
            ? 'Interactive 3D robot with floating service panels'
            : '3D SOLU model with orbit controls and city environment'
          }
        </p>
      </div>
    </>
  )
}