'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Html, Stats } from '@react-three/drei'

export default function Scene() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[3, 3, 3]} fov={75} />
      <OrbitControls enableDamping={true} />
      
      <pointLight position={[3, 5, 2]} intensity={1} distance={100} />
      <ambientLight intensity={0.1} />
      
      <gridHelper args={[10, 20]} />
      <axesHelper args={[5]} />
      
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="#ff0000" reflectivity={0.8} />
        <Html position={[0, 1, 0]} center distanceFactor={10}>
          <div className="label">Red Cube</div>
        </Html>
      </mesh>
      
      <Stats />
    </Canvas>
  )
}
