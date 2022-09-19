import {
  Canvas,
  useLoader,
  useFrame,
  useSpring,
  useThree,
  extend,
} from "@react-three/fiber";
import React, { Suspense, useRef, useState, useEffect } from "react";
import {
  CubeCamera,
  Environment,
  Html,
  MeshReflectorMaterial,
  PerspectiveCamera,
  useGLTF,
  useAnimations,
  Effects,
} from "@react-three/drei";
import { Section } from "./section";
import * as THREE from "three";
import {UnrealBloomPass,  EffectComposer, RenderPass} from 'three-stdlib'
import { gsap, Expo } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useControls } from 'leva'
import $ from "jquery";
extend({ EffectComposer, RenderPass, UnrealBloomPass })

gsap.registerPlugin(ScrollTrigger);
const color = new THREE.Color();
const tl = gsap.timeline({
  defaults: { ease: "power3.out" },
});
const round = (n) => Math.round(n * 100) / 100;
const Lights = () => {
  const { viewport } = useThree();
  const groupL = useRef();
  const groupR = useRef();
  const front = useRef();
  return (
    <>
      <ambientLight intensity={0.1} />
      {/* Diretion light */}
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <directionalLight position={[-100, 10, 5]} intensity={1.5} />
      <directionalLight
        castShadow
        position={[0, 0, 0]}
        intensity={12.2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={10}
        shadow-camera-bottom={-20}
      />
      {/* Spotlight Large overhead light */}
      <spotLight intensity={0.5} position={[1000, 0, 0]} />
      <group ref={groupL}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <group ref={groupR}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <spotLight
        castShadow
        ref={front}
        penumbra={0.75}
        angle={Math.PI / 4}
        position={[0, 0, 10]}
        distance={10}
        intensity={15}
        shadow-mapSize={[2048, 2048]}
      />
    </>
  );
};


function Green( UnrealBloomPass) {
  const { nodes, materials } = useGLTF("/scene.glb");
  const moon = useRef();
  const cam = useRef();
  const { viewport } = useThree();
  useEffect((state) => {
    ScrollTrigger.create({
      trigger: ".wrap",
      scrub: 5,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // cup.current.rotation.x = -2 * Math.PI * self.progress;
        // cup.current.rotation.y = -1 * Math.PI * self.progress;
        cam.current.position.z = -15 * self.progress;
        cam.current.position.y = 3 * self.progress;
        // cam.current.rotation.x = -0.22 * self.progress;
        // mark.current.position.x = -1.5 * self.progress;
        // mark.current.position.z = -1.5 * self.progress;
        // cup.current.rotation.z = -2 * Math.PI * self.progress;
        // cup.current.position.y = -17 * self.progress;
        // cup.current.position.y = -2 * self.progress;
      },
    });
  });


  ScrollTrigger.clearScrollMemory();
// Rotate 360
  // useFrame ((state) => (moon.current.rotation.z = state.clock.getElapsedTime() / 10));
  useFrame((state) => (moon.current.rotation.z = Math.sin(state.clock.getElapsedTime() / -5) * Math.PI))
  return (
    <>
      <group
        ref={moon}
        rotation={[1.6, 0, 0]}
        position={[0, -17, -30]}
        dispose={null}
      >
        <group
          position={[0, 0, 0]}
        >
      <mesh geometry={nodes.Le_Transi_De_Rene_De_Chalon001.geometry} material={materials['Default OBJ.001']} rotation={[0,0,0]} scale={0.01}    position={[0, 0, 0]}    />
       </group>
      </group>
      <group ref={cam} name="Camera" position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <PerspectiveCamera makeDefault fov={25} position={[0, 0, 0]}>
          <directionalLight
            position={[300, 130, 15]}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-left={-8}
            shadow-camera-bottom={-8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            intensity={0.5}
            shadow-bias={-0.0001}
          />
        </PerspectiveCamera>
      </group>
    </>
  );
}



const HTMLContent = () => {
  return (
    <Section factor={1.5} offset={1}>
      <Green />
      <Html fullscreen></Html>
    </Section>
  );
};

export default function Hero() {
  return (
    <>
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
        }}
        id="main-canvas"
        linear
        colorManagment
        shadows
      >
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent  />
        </Suspense>
      </Canvas>
    </>
  );
}

useGLTF.preload("/mark.glb");
