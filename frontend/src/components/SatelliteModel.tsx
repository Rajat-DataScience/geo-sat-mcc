"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Cylinder, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function SatelliteModel() {
  const groupRef = useRef<THREE.Group>(null);

  // This hook rotates the entire satellite slowly on every frame
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Bus (Body) */}
      <Box args={[1.5, 1.5, 2]} castShadow receiveShadow>
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} wireframe={false} />
      </Box>

      {/* Golden Thermal Blankets (Top & Bottom) */}
      <Box args={[1.55, 0.1, 2.05]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.4} />
      </Box>
      <Box args={[1.55, 0.1, 2.05]} position={[0, -0.75, 0]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.4} />
      </Box>

      {/* Comm Dish Antenna */}
      <Sphere args={[0.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.5} side={THREE.DoubleSide} />
      </Sphere>
      <Cylinder args={[0.05, 0.05, 0.6]} position={[0, 0, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ef4444" />
      </Cylinder>

      {/* Left Solar Array */}
      <group position={[-3, 0, 0]}>
        <Cylinder args={[0.1, 0.1, 2]} position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#475569" />
        </Cylinder>
        <Box args={[3, 0.05, 1.2]} castShadow>
          <meshStandardMaterial color="#0ea5e9" metalness={0.9} roughness={0.1} />
        </Box>
        {/* Solar Panel Grid Lines */}
        <Box args={[3.01, 0.06, 1.21]}>
          <meshBasicMaterial color="#0284c7" wireframe={true} />
        </Box>
      </group>

      {/* Right Solar Array */}
      <group position={[3, 0, 0]}>
        <Cylinder args={[0.1, 0.1, 2]} position={[-1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#475569" />
        </Cylinder>
        <Box args={[3, 0.05, 1.2]} castShadow>
          <meshStandardMaterial color="#0ea5e9" metalness={0.9} roughness={0.1} />
        </Box>
        {/* Solar Panel Grid Lines */}
        <Box args={[3.01, 0.06, 1.21]}>
          <meshBasicMaterial color="#0284c7" wireframe={true} />
        </Box>
      </group>
    </group>
  );
}