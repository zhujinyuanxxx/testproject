import React, {ReactElement, useEffect, useRef, useState} from "react";
import useVideoUrlStore from "../zustandstore/UrlStore";

import styles from "../scss/Home/bill.module.scss";
import * as THREE from "three";

import { createRoot } from 'react-dom/client'

import BillComponent from "../components/BillComponent";


import { Canvas, useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei';


const Bill: React.FC = () => {


    // useEffect(() => {
    //     const scene = new THREE.Scene();
    //     const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //
    //     const renderer = new THREE.WebGLRenderer();
    //     renderer.setSize( window.innerWidth, window.innerHeight );
    //     document.body.appendChild( renderer.domElement );
    //
    //     const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //     const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //     const cube = new THREE.Mesh( geometry, material );
    //     scene.add( cube );
    //
    //     camera.position.z = 5;
    //
    //     function animate() {
    //         requestAnimationFrame( animate );
    //
    //         cube.rotation.x += 0.01;
    //         cube.rotation.y += 0.01;
    //
    //         renderer.render( scene, camera );
    //     }
    //     animate();
    // }, []);

    const AA:React.FC<{n:number}> = ({n})=>{

        let divs:ReactElement[]=[];

        for (let i = 0; i < n; i++) {
            divs.push(

                <div className={styles.topItems}>
                    {i}
                </div>

            )
        }

        return <div>{divs}</div>
    }


    // const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //
    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );

    interface ThreeCubeProps{
        containerRef:React.RefObject<HTMLDivElement>;
    }

    const TestCube : React.FC<ThreeCubeProps> = ({containerRef}) =>{
        useEffect(() => {
            const scene = new THREE.Scene();
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({
                color:0xf0000,
            })

            const mesh = new THREE.Mesh(geometry,material);

            scene.add(mesh);

            const  width = 800;
            const height = 500;

            //camera相机
            const camera = new THREE.PerspectiveCamera(30,width/height,0.1,3000);
            //相机位置
            camera.position.set(200,200,200);
            //相机视线

            camera.lookAt(mesh.position);

            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(width,height);
            renderer.render(scene,camera);
            // document.body.appendChild(renderer.domElement);

            function animate() {
                requestAnimationFrame( animate );

                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.01;

                renderer.render( scene, camera );
            }
            animate();
            return()=>{
                containerRef.current?.removeChild(renderer.domElement);


            }

        }, [containerRef]);

        return null;

    }

    useEffect(() => {
        // const scene = new THREE.Scene();
        // const geometry = new THREE.BoxGeometry();
        // const material = new THREE.MeshBasicMaterial({
        //     color:0xf0000,
        // })
        //
        // const mesh = new THREE.Mesh(geometry,material);
        //
        // scene.add(mesh);
        //
        // const  width = 800;
        // const height = 500;
        //
        // //camera相机
        // const camera = new THREE.PerspectiveCamera(30,width/height,0.1,3000);
        // //相机位置
        // camera.position.set(200,200,200);
        // //相机视线
        //
        // camera.lookAt(mesh.position);
        //
        // const renderer = new THREE.WebGLRenderer();
        // renderer.setSize(width,height);
        // renderer.render(scene,camera);
        // // document.body.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry( );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame( animate );

            // mesh.rotation.x += 0.01;
            // mesh.rotation.y += 0.01;
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render( scene, camera );
        }
        animate();
    }, []);

    interface DivElement extends HTMLDivElement{};

    const containerRef = useRef<DivElement>(null)

    return (


        <>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[0, 0, 0]} />
            </Canvas>
            <div ref={containerRef}>
                111
                {/*<TestCube containerRef={containerRef}/>*/}
            </div>
            {/*<div>*/}
            {/*    /!*<BillComponent/>*!/*/}
            {/*    <Canvas>*/}
            {/*        <ambientLight intensity={0.1} />*/}
            {/*        <directionalLight color="blue" position={[0, 0, 5]} />*/}
            {/*        <mesh>*/}
            {/*            /!*<boxGeometry />*!/*/}
            {/*            <boxGeometry args={[20, 20, 2]} />*/}
            {/*            <meshStandardMaterial />*/}
            {/*        </mesh>*/}
            {/*    </Canvas>*/}
            {/*</div>*/}

        </>
        // <div className={styles.container}>
        //     {/*<div className={styles.top}>*/}
        //     {/*    top*/}
        //     {/*    <AA n={6}/>*/}
        //     {/*</div>*/}
        //     {/*<div className={styles.bottom}>*/}
        //     {/*    bottom*/}
        //     {/*</div>*/}
        //
        // </div>

        // <div id="canvas-container">
        //     <Canvas  children={}/>
        // </div>
    );



};

export default Bill;