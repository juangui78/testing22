"use client"
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



const Models = ({modelRendering}) => {
  const gltf = useLoader(GLTFLoader, `/modelers${modelRendering}/scene.gltf`);
  return (
    <>
      <primitive object={gltf.scene} scale={0.4} />
    </>
  );
}

const canvasComponent = ({model}) => {
  return (
  <Canvas className="rounded-lg">
      <ambientLight intensity={1} />
      <directionalLight color="white" position={[0, 2, 50]} />
      <Models modelRendering={model} />
      <OrbitControls />
      <Environment preset="city" background blur backgroundBlurriness />
  </Canvas>
  );
};

export default canvasComponent ;