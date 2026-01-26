import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Floating saffron thread component
const SaffronThread = ({ position, rotation, scale, delay }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  delay: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      // Slow, elegant floating motion
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.15;
      meshRef.current.rotation.z += 0.001;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 + delay) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <capsuleGeometry args={[0.02, 0.4, 4, 16]} />
      <meshStandardMaterial
        color="#D4A642"
        emissive="#B8860B"
        emissiveIntensity={0.3}
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  );
};

// Floating golden particle
const GoldenParticle = ({ position, size, delay }: {
  position: [number, number, number];
  size: number;
  delay: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = useMemo(() => [...position], [position]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * 0.4 + delay;
      meshRef.current.position.y = initialPos[1] + Math.sin(time) * 0.3;
      meshRef.current.position.x = initialPos[0] + Math.cos(time * 0.7) * 0.1;
      meshRef.current.scale.setScalar(size * (1 + Math.sin(time * 2) * 0.1));
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color="#D4A642"
        emissive="#FFD700"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// Abstract crown/royal shape
const RoyalCrown = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[0, 0, -2]} scale={0.8}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#D4A642"
          emissive="#B8860B"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

// Central saffron flower abstract
const SaffronFlowerAbstract = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  const petals = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      rotation: (i * Math.PI * 2) / 6,
    }));
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {petals.map((petal, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(petal.rotation) * 0.8,
            Math.sin(petal.rotation) * 0.8,
            0,
          ]}
          rotation={[0, 0, petal.rotation + Math.PI / 2]}
        >
          <capsuleGeometry args={[0.08, 0.5, 4, 16]} />
          <MeshDistortMaterial
            color="#4A2570"
            emissive="#3D1A5C"
            emissiveIntensity={0.2}
            metalness={0.3}
            roughness={0.6}
            distort={0.1}
            speed={0.5}
          />
        </mesh>
      ))}
      {/* Center stigmas (saffron threads) */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={`stigma-${i}`}
          position={[
            Math.cos((i * Math.PI * 2) / 3 + Math.PI / 6) * 0.15,
            Math.sin((i * Math.PI * 2) / 3 + Math.PI / 6) * 0.15,
            0.1,
          ]}
          rotation={[0, 0, (i * Math.PI * 2) / 3]}
        >
          <capsuleGeometry args={[0.03, 0.35, 4, 16]} />
          <meshStandardMaterial
            color="#D4A642"
            emissive="#FFD700"
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

// Ambient floating dust particles
const DustParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
      scales[i] = Math.random();
    }

    return { positions, scales };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#D4A642"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

// Scene component
const Scene = () => {
  const saffronThreads = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 3 - 2,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.5,
      delay: Math.random() * Math.PI * 2,
    }));
  }, []);

  const goldenParticles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4 - 3,
      ] as [number, number, number],
      size: 0.02 + Math.random() * 0.04,
      delay: Math.random() * Math.PI * 2,
    }));
  }, []);

  return (
    <>
      {/* Ambient lighting - royal purple tint */}
      <ambientLight intensity={0.3} color="#4A2570" />
      
      {/* Main directional light - warm gold */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#D4A642"
      />
      
      {/* Fill light - soft purple */}
      <pointLight
        position={[-5, -5, 3]}
        intensity={0.4}
        color="#6B3FA0"
      />
      
      {/* Accent light */}
      <pointLight
        position={[0, 3, 2]}
        intensity={0.3}
        color="#FFD700"
      />

      {/* Central abstract flower */}
      <SaffronFlowerAbstract />

      {/* Royal crown ring */}
      <RoyalCrown />

      {/* Floating saffron threads */}
      {saffronThreads.map((thread, i) => (
        <SaffronThread key={i} {...thread} />
      ))}

      {/* Golden particles */}
      {goldenParticles.map((particle, i) => (
        <GoldenParticle key={i} {...particle} />
      ))}

      {/* Ambient dust */}
      <DustParticles />
    </>
  );
};

const SaffronBackground3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
      {/* Gradient overlay for blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-royal-purple-dark/60 via-royal-purple/40 to-royal-purple-dark/70 pointer-events-none" />
    </div>
  );
};

export default SaffronBackground3D;
