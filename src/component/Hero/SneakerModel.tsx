'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { DragRotate, CameraRig, CameraZoom } from './SneakerAnimation';
import { useFrame, useThree } from '@react-three/fiber';


useGLTF.preload('/models/nike_air_jordan_opt.glb');

function Sneaker() {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/nike_air_jordan_opt.glb');

  useEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.material.transparent = true;
        obj.material.opacity = 0;
      }
    });
  }, [scene]);

  useFrame(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.material.opacity = THREE.MathUtils.lerp(obj.material.opacity, 1, 0.04);
      }
    });
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.9}
      position={[0.5, 0.7, 0]}
      rotation={[0.05, -Math.PI / 3.2, 0]}
    />
  );
}

export default function SneakerModel() {
  return (
    <div className="relative w-full h-full">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <PerspectiveCamera makeDefault position={[4, 2, 7.8]} fov={55} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-4, 3, -3]} intensity={0.6} />
        <Environment preset="city" />

        <CameraRig />
        <CameraZoom />

        <Suspense fallback={null}>
          <DragRotate>
            <Sneaker />
          </DragRotate>
        </Suspense>
      </Canvas>
    </div>
  );
}
