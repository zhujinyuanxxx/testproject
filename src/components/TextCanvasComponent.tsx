// LongTextCanvas.tsx

import React, { useRef, useEffect } from 'react';

interface LongTextCanvasProps {
    text: string; // 需要展示的文本
    width: number; // Canvas 宽度
    height: number; // Canvas 高度
    className?: string; // 添加 className 属性
}

const LongTextCanvas: React.FC<LongTextCanvasProps> = ({ text, width, height ,className}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (ctx) {
            // 设置字体和行高
            ctx.font = '16px Arial';
            const lineHeight = 20; // 每行文本的行高

            // 将文本分割成段落
            const words = text.split(' ');
            let line = '';
            let y = 30; // 初始 y 坐标

            words.forEach((word) => {
                const testLine = line + word + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;

                if (testWidth > width - 20) {
                    ctx.fillText(line, 10, y);
                    y += lineHeight;
                    line = word + ' ';
                } else {
                    line = testLine;
                }
            });

            ctx.fillText(line, 10, y);
        }
    }, [text, width]);


    return <canvas className={`image-container ${className}`} ref={canvasRef} width={width} height={height} />;
};

export default LongTextCanvas;
