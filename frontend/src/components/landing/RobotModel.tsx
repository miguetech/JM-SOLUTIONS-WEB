'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function RobotModel() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/assets/model3D/SOLU.glb')

  // Animación de flotación
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={2} />
    </group>
  )
}
