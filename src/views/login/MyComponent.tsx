import React, { useState, useRef, useReducer } from 'react';
import { Stage, Container, Sprite, PixiRef, useTick } from '@pixi/react';
import { render } from 'react-dom';

// @ts-ignore
const reducer = (_, { data }) => data;

const Bunny = () => {
    // @ts-ignore
    const [motion, update] = useReducer(reducer);
    const iter = useRef(0);

    useTick((delta) => {
        const i = (iter.current += 0.05 * delta);

        // @ts-ignore
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

    return <Sprite image="/pixi-react/img/bunny.png" {...motion} />;
};

// @ts-ignore
render(
    <Stage width={300} height={300} options={{ backgroundAlpha: 0 }}>
        <Container x={150} y={150}>
            <Bunny />
        </Container>
    </Stage>,
);