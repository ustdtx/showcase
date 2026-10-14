import type { ModelKind } from '../config/products';

interface ModelProps {
  color: string;
}

function Finish({ color, emissive = false }: { color: string; emissive?: boolean }) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={0.65}
      roughness={0.28}
      emissive={emissive ? color : '#000000'}
      emissiveIntensity={emissive ? 0.9 : 0}
    />
  );
}

function Dark() {
  return <meshStandardMaterial color="#131318" metalness={0.3} roughness={0.85} />;
}

/** Procedural over-ear headphones: torus headband + twin earcup cylinders. */
export function HeadphonesModel({ color }: ModelProps) {
  return (
    <group>
      <mesh position={[0, 0.75, 0]}>
        <torusGeometry args={[1.05, 0.11, 24, 72, Math.PI]} />
        <Finish color={color} />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <torusGeometry args={[1.05, 0.05, 16, 72, Math.PI]} />
        <Finish color={color} emissive />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 1.04, -0.15, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.44, 0.44, 0.34, 48]} />
            <Finish color={color} />
          </mesh>
          <mesh position={[s * -0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.42, 48]} />
            <Dark />
          </mesh>
          <mesh position={[s * 0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.3, 0.035, 12, 48]} />
            <Finish color={color} emissive />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Procedural smartwatch: round case + face + crown + straps. */
export function WatchModel({ color }: ModelProps) {
  return (
    <group>
      {/* straps */}
      <mesh position={[0, 1.15, -0.08]} rotation={[0.18, 0, 0]}>
        <boxGeometry args={[0.62, 1.1, 0.14]} />
        <Dark />
      </mesh>
      <mesh position={[0, -1.15, -0.08]} rotation={[-0.18, 0, 0]}>
        <boxGeometry args={[0.62, 1.1, 0.14]} />
        <Dark />
      </mesh>
      {/* case */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.3, 64]} />
        <Finish color={color} />
      </mesh>
      {/* face */}
      <mesh position={[0, 0, 0.16]}>
        <circleGeometry args={[0.68, 64]} />
        <meshStandardMaterial color="#050507" roughness={0.25} metalness={0.1} />
      </mesh>
      {/* glowing dial ring */}
      <mesh position={[0, 0, 0.165]}>
        <ringGeometry args={[0.56, 0.62, 64]} />
        <Finish color={color} emissive />
      </mesh>
      {/* hands */}
      <mesh position={[0, 0.18, 0.17]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.05, 0.5, 0.01]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.14, 0, 0.17]} rotation={[0, 0, -Math.PI / 2.4]}>
        <boxGeometry args={[0.05, 0.36, 0.01]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
      </mesh>
      {/* crown */}
      <mesh position={[0.92, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.16, 24]} />
        <Finish color={color} />
      </mesh>
    </group>
  );
}

/** Procedural 360 speaker: body + breathing light ring + grille. */
export function SpeakerModel({ color }: ModelProps) {
  return (
    <group>
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.95, 1.0, 0.18, 64]} />
        <Dark />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.85, 0.9, 1.9, 64]} />
        <Finish color={color} />
      </mesh>
      {/* grille */}
      <mesh position={[0, 0.1, 0.78]} rotation={[0.08, 0, 0]}>
        <circleGeometry args={[0.58, 48]} />
        <Dark />
      </mesh>
      <mesh position={[0, 0.1, 0.79]} rotation={[0.08, 0, 0]}>
        <ringGeometry args={[0.5, 0.58, 48]} />
        <Finish color={color} emissive />
      </mesh>
      {/* light ring */}
      <mesh position={[0, 0.99, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.06, 16, 64]} />
        <Finish color={color} emissive />
      </mesh>
      <mesh position={[0, -0.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.88, 0.035, 12, 64]} />
        <Finish color={color} emissive />
      </mesh>
      {/* top cap */}
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.7, 0.72, 0.1, 64]} />
        <Dark />
      </mesh>
    </group>
  );
}

/** Procedural lounge chair: seat + reclined back + four legs. */
export function ChairModel({ color }: ModelProps) {
  return (
    <group>
      {/* seat */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.7, 0.18, 1.6]} />
        <Finish color={color} />
      </mesh>
      <mesh position={[0, 0.47, 0]}>
        <boxGeometry args={[1.55, 0.1, 1.45]} />
        <Dark />
      </mesh>
      {/* backrest */}
      <group position={[0, 1.25, -0.85]} rotation={[-0.22, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.7, 1.5, 0.16]} />
          <Finish color={color} />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[1.5, 1.3, 0.06]} />
          <Dark />
        </mesh>
      </group>
      {/* legs */}
      {[
        [-0.72, -0.68],
        [0.72, -0.68],
        [-0.72, 0.68],
        [0.72, 0.68],
      ].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, -0.35, z]}>
          <cylinderGeometry args={[0.06, 0.05, 1.3, 16]} />
          <meshStandardMaterial color="#2a2a31" metalness={0.8} roughness={0.35} />
        </mesh>
      ))}
      {/* accent bar */}
      <mesh position={[0, -0.15, 0.78]}>
        <boxGeometry args={[1.5, 0.06, 0.06]} />
        <Finish color={color} emissive />
      </mesh>
    </group>
  );
}

export function ModelByKind({ kind, color }: { kind: ModelKind; color: string }) {
  switch (kind) {
    case 'headphones':
      return <HeadphonesModel color={color} />;
    case 'watch':
      return <WatchModel color={color} />;
    case 'speaker':
      return <SpeakerModel color={color} />;
    case 'chair':
      return <ChairModel color={color} />;
  }
}
