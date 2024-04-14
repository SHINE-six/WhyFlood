import { useSelector } from "react-redux";

const EmptyPlane = () => {    
    const stepPageJsonData = useSelector(state => state.data.stepPageJsonData)
    const worldWidth = stepPageJsonData['worldWidth']
    const worldDepth = stepPageJsonData['worldDepth']
    
    return (
        <>
            <mesh rotation={[-Math.PI / 2, 0, 0]} >
                <planeGeometry args={[worldWidth, worldDepth]} />
                <meshStandardMaterial color='#990000' />
            </mesh>
            <gridHelper args={[1000, 1000]} />
        </>
    )
}

export default EmptyPlane;