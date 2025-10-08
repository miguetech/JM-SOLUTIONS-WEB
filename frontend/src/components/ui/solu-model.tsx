'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

interface SoluModelProps {
  autoRotate?: boolean
  scale?: number
}

export function SoluModel({ autoRotate = true, scale = 1 }: SoluModelProps) {
  const { scene } = useGLTF('/assets/model3D/SOLU.glb')
  const modelRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={modelRef} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/assets/model3D/SOLU.glb')