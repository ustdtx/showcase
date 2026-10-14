import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, OrbitControls } from '@react-three/drei';
import type { Group } from 'three';
import type { ModelKind } from '../config/products';
import { ModelByKind } from './ProductModels';

function Spin({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.35;
  });
  return <group ref={ref}>{children}</group>;
}

interface ViewerProps {
  model: ModelKind;
  color: string;
}

/**
 * Reusable 3D stage. Swap `model`/`color` per product.
 * Later: render <GLTFModel url={product.modelUrl}/> here for AI-generated meshes.
 */
export function ProductViewer({ model, color }: ViewerProps) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.7, 6.2], fov: 42 }}>
      <ambientLight intensity={0.55} />
      <spotLight position={[5, 7, 4]} angle={0.45} intensity={1.4} />
      <directionalLight position={[-5, 3, -4]} intensity={0.45} />
      <pointLight position={[0, -2, 3]} intensity={0.35} color={color} />
      <Suspense fallback={null}>
        <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.9}>
          <Spin>
            <group key={model}>
              <ModelByKind kind={model} color={color} />
            </group>
          </Spin>
        </Float>
        <ContactShadows position={[0, -1.7, 0]} opacity={0.6} scale={11} blur={2.6} far={4} />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.9}
        maxPolarAngle={Math.PI / 1.55}
        minPolarAngle={Math.PI / 3.2}
      />
    </Canvas>
  );
}
