import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useSelector } from "react-redux";

import BasePlane from './ThreeComponent/BasePlane.jsx'
import EmptyPlane from './ThreeComponent/EmptyPlace.jsx'

const SceneBackground = () => {
    const { scene } = useThree();
    scene.background = new THREE.Color(0xc0c0c0); // Set the background color
    return null;
}

const Viewport = () => {
    const stepPageJsonData = useSelector(state => state.data.stepPageJsonData)


    return (
        <div className='bg-black w-full h-full'>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 125, 125]} />
                <ambientLight intensity={10} color='white'/>
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color='#aa0000' />
                </mesh>
                { (stepPageJsonData['leftPanelStepAt'] === 'projectSetup') ? <EmptyPlane />: <BasePlane />}
                <OrbitControls maxPolarAngle={90} zoomSpeed={3}/>
                <SceneBackground />
            </Canvas>
        </div>
    )
}

export default Viewport;