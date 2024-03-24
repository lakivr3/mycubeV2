"use client";
import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Loader from "./Loader";
import * as THREE from "three";

const Cube = () => {
  const cube = useGLTF("./FinalCube/scene.gltf");
  const cubeRef = useRef<any>();

  // Create an AnimationMixer
  const mixer = useRef<any>();

  useEffect(() => {
    mixer.current = new THREE.AnimationMixer(cube.scene);
    const animations = cube.animations; // Access animations from glTF
    animations.forEach((clip) => {
      mixer.current.clipAction(clip).play(); // Play animations
    });
  }, [cube.animations]);

  // Update animations

  const clock = new THREE.Clock();
  useFrame(() => {
    const delta = clock.getDelta();
    mixer.current.update(delta);
  });

  return (
    <group ref={cubeRef as any} dispose={null}>
      <primitive object={cube.scene} scale={1} position-y={0} rotation-y={-1} />
    </group>
  );
};

const BigCubeCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 20,
        near: 10,
        far: 200,
        position: [-4, 30, 6],
      }}
    >
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, 10, -5]} intensity={2} />
      <directionalLight position={[0, 5, 10]} intensity={2.5} />
      <Suspense fallback={<Loader />}>
        <OrbitControls
          enableRotate
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 3}
          minPolarAngle={Math.PI / 3}
        />
        <Cube />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BigCubeCanvas;
