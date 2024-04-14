import { useRef } from 'react'
import * as THREE from 'three'
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';
import { useModifyData } from '../../useChangeData';
import { useSelector } from "react-redux";

const BasePlane = () => {
    const stepPageJsonData = useSelector(state => state.data.stepPageJsonData)
    const modifyData = useModifyData();
    const meshRef = useRef()
    const worldWidth = stepPageJsonData['worldWidth']
    const worldDepth = stepPageJsonData['worldDepth']
    
    const data = generateHeight(worldWidth, worldDepth)
    console.log(data)

    const geometry = new THREE.PlaneGeometry(worldWidth, worldDepth, worldWidth - 1, worldDepth - 1)
    const vertices = geometry.attributes.position.array

    for (let i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3) {
        vertices[j + 2] = data[i] * 0.1
    }



    const texture = new THREE.CanvasTexture( generateTexture( data, worldWidth, worldDepth ) );
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    

    function generateHeight( width, height ) {
        const size = width * height;
        const data = new Uint8Array( size )
        if (!stepPageJsonData['flatWorld']) {
            const perlin = new ImprovedNoise()
            const z = Math.random() * 10;

            let quality = 1;
            for ( let j = 0; j < 4; j ++ ) {
                for ( let i = 0; i < size; i ++ ) {
                    const x = i % width, y = ~ ~ ( i / width );
                    data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75);
                }
                quality *= 5;
            }

            return data;
        } else {
            for ( let i = 0; i < size; i ++ ) {
                data[i] = 0
            }
            return data
        }
    }

    function generateTexture( data, width, height ) {
        // bake lighting into texture
        let context, image, imageData, shade;

        const vector3 = new THREE.Vector3( 0, 0, 0 );

        const sun = new THREE.Vector3( 1, 1, 1 );
        sun.normalize();

        const canvas = document.createElement( 'canvas' );
        canvas.width = width;
        canvas.height = height;

        context = canvas.getContext( '2d' );
        context.fillStyle = '#000';
        context.fillRect( 0, 0, width, height );

        image = context.getImageData( 0, 0, canvas.width, canvas.height );
        imageData = image.data;

        for ( let i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {
            vector3.x = data[ j - 2 ] - data[ j + 2 ];
            vector3.y = 2;
            vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
            vector3.normalize();

            shade = vector3.dot( sun );

            imageData[ i ] = ( shade * 96 ) * 0.5 + 30;
            imageData[ i + 1 ] = ( 100 + shade * 128 ) * 0.5 + 30;
            imageData[ i + 2 ] = ( shade * 96 ) * 0.5 + 30;
        }
        context.putImageData( image, 0, 0 );

        // Scaled 4x
        const canvasScaled = document.createElement( 'canvas' );
        canvasScaled.width = width * 4;
        canvasScaled.height = height * 4;

        context = canvasScaled.getContext( '2d' );
        context.scale( 4, 4 );
        context.drawImage( canvas, 0, 0 );

        image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
        imageData = image.data;

        for ( let i = 0, l = imageData.length; i < l; i += 4 ) {
            const v = ~ ~ ( Math.random() * 5 );
            imageData[ i ] += v;
            imageData[ i + 1 ] += v;
            imageData[ i + 2 ] += v;
        }
        context.putImageData( image, 0, 0 );
        return canvasScaled;
    }
    

    return (
        <>
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
            <primitive object={geometry}/>
            <meshStandardMaterial attach='material' color='gray' side={THREE.DoubleSide} map={texture}/>
        </mesh>
        </>
    )
}

export default BasePlane