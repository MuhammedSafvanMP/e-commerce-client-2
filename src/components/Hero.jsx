"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload } from "@react-three/drei"
import Shirt from "@/components/shirt"
import { Customizer } from "@/components/customizer"

export default function Hero() {
  return (
    <section className="w-full h-screen">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 60 }}
        className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Shirt />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.5}
          />
          <Preload all />
        </Suspense>
      </Canvas>
      <Customizer />
    </section>
  )
}
