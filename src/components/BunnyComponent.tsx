// import styles from "../scss/test.module.scss";
// import {Button} from "antd";
// import {useSelector} from "react-redux";
// import {RootState} from "../store";
// import React, {useEffect, useMemo, useReducer, useRef, useState} from "react";
// import {useTick} from "@pixi/react";
//
// const BunnyComponent: React.FC = () => {
//
//
//     const reducer = (_, { data }) => data;
//
//     const [motion, update] = useReducer(reducer);
//     const iter = useRef(0);
//
//     useTick((delta) => {
//         const i = (iter.current += 0.05 * delta);
//
//         update({
//             type: 'update',
//             data: {
//                 x: Math.sin(i) * 100,
//                 y: Math.sin(i / 1.5) * 100,
//                 rotation: Math.sin(i) * Math.PI,
//                 anchor: Math.sin(i / 2),
//             },
//         });
//     });
//
//
//     return(
//         <div className={styles.test}>
//
//         </div>
//
//     )
// }
//
// export default BunnyComponent;

// 导入 React 和 pixi-react 的类型和组件
import React, { useReducer, useRef } from 'react';
import {useTick, Sprite, Stage, Container, _ReactPixi} from '@pixi/react';
import {render} from "react-dom";
// import '@types/pixi.js';


// 定义 motion 的类型
type Motion = {
    x: number;
    y: number;
    rotation: number;
    anchor: number;
};

// 定义 reducer 函数
const reducer = (state: Motion, action: { type: string; data: Motion }) => action.data;

// 定义 Bunny 组件
const Bunny: React.FC<React.PropsWithChildren<_ReactPixi.IContainer>> = () => {
    // 使用 useReducer 钩子
    const [motion, update] = useReducer(reducer, { x: 0, y: 0, rotation: 0, anchor: 0 });
    // 使用 useRef 钩子
    const iter = useRef(0);

    // 使用 useTick 钩子
    useTick((delta) => {
        const i = (iter.current += 0.05 * delta);

        update({
            type: 'update',
            data: {
                x: Math.sin(i) * 100,
                y: Math.sin(i / 1.5) * 100,
                rotation: Math.sin(i) * Math.PI,
                anchor: Math.sin(i / 2),
            },
        });
    });

    // 返回 Sprite 组件
    return <Sprite image="/pixi-react/img/bunny.png" {...motion} />;
};

// 渲染 Stage 组件

// render(
//     <Stage width={300} height={300} options={{ backgroundAlpha: 0 }}>
//         <Container x={150} y={150}>
//             <Bunny />
//         </Container>
//     </Stage>
// );

// export default Bunny;
export default Bunny;