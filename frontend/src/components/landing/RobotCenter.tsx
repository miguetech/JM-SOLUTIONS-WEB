'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function RobotCenter() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/assets/model3D/SOLU.glb')
  const { viewport, pointer } = useThree()

  useFrame((state) => {
    if (groupRef.current) {
      // Flotación vertical
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      
      // Seguimiento suave del mouse (robot "mira" hacia el cursor)
      const targetRotationY = pointer.x * 0.8
      const targetRotationX = -pointer.y * 0.5
      
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.08
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene.clone()} scale={1.5} />
    </group>
  )
}
