import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'


// export default function Model(props) {
export default function Model() {
    const groupRef = useRef()
    const { nodes, materials } = useGLTF('/Poimandres.gltf')
    return (
        // <group ref={groupRef} {...props} dispose={null}>
        //     <mesh castShadow receiveShadow geometry={nodes.Curve007_1.geometry} material={materials['Material.001']} />
        //     <mesh castShadow receiveShadow geometry={nodes.Curve007_2.geometry} material={materials['Material.002']} />
        // </group>
        <div>123</div>

    )
}

useGLTF.preload('/Poimandres.gltf')