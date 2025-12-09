'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';

/* DRAG + MOMENTUM + AUTO-ROTATE */
export function DragRotate({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const targetRotation = useRef(0);
  const AUTO_ROTATE_SPEED = 0.03;

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotation.current, 0.12);

    if (!isDragging.current) {
      targetRotation.current += velocity.current + AUTO_ROTATE_SPEED;
      velocity.current *= 0.94;
    }
  });

  function start(e: ThreeEvent<PointerEvent>) {
    isDragging.current = true;
    velocity.current = 0;
    lastX.current = e.clientX;
  }

  function move(e: ThreeEvent<PointerEvent>) {
    if (!isDragging.current) return;
    const delta = (e.clientX - lastX.current) * 0.01;
    targetRotation.current += delta;
    velocity.current = delta;
    lastX.current = e.clientX;
  }

  function end() {
    isDragging.current = false;
  }

  return (
    <group
      ref={ref}
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={end}
      onPointerLeave={end}
      onPointerCancel={end}
    >
      {children}
    </group>
  );
}

/* CAMERA PARALLAX */
export function CameraRig() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.6, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.4, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* SCROLL ZOOM */
export function CameraZoom() {
  const { camera } = useThree();

  useFrame(() => {
    const scroll = window.scrollY || 0;
    const scrollZoom = THREE.MathUtils.clamp(7.8 - scroll * 0.002, 6.5, 8);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, scrollZoom, 0.05);
  });

  return null;
}
