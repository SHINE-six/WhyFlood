import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Helper, useHelper } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

import BasePlane from './ThreeComponent/BasePlane.jsx'

const SceneBackground = () => {
    const { scene } = useThree();
    scene.background = new THREE.Color(0xc0c0c0); // Set the background color
    return null;
}

const Viewport = () => {


    return (
        <div className='bg-black w-full h-full'>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 125, 125]} />
                <ambientLight intensity={10}/>
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color='red' />
                </mesh>
                <BasePlane />
                <OrbitControls maxPolarAngle={90}/>
                <SceneBackground />
            </Canvas>
        </div>
    )
}

export default Viewport;