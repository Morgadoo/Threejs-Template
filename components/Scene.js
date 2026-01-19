'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import RedCube from './RedCube'
import Lights from './Lights'

export default function Scene() {
  return (
    <Canvas
      camera={{
        fov: 75,
        position: [3, 3, 3],
        near: 0.1,
        far: 100,
      }}
      className="webgl"
    >
      <OrbitControls enableDamping />
      <Stats />
      <gridHelper args={[10, 20]} />
      <axesHelper args={[5]} />
      <RedCube />
      <Lights />
    </Canvas>
  )
}
