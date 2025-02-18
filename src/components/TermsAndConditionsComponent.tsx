import React from 'react';
import { Stage, Layer, Text } from 'react-konva';

const TermsAndConditionsComponent: React.FC = () => {
    const termsText = '这是一段很长的文本，需要自动换行11111111111111111111111111111111111111好。';

    // 计算文本宽度
    const measureText = (text: string, fontSize: number): number => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Canvas context is null.');
        }
        context.font = `${fontSize}px Arial`;

        console.log("文本总宽度为"+context.measureText(text).width);

        return context.measureText(text).width;
    };

    // 根据容器宽度进行换行
    const wrapText = (text: string, maxWidth: number, fontSize: number): string => {
        const words = text.split(' ');
        let line = '';
        const lines = [];

        words.forEach((word) => {
            const testLine = `${line} ${word}`;
            const testWidth = measureText(testLine, fontSize);
            if (testWidth > maxWidth) {
                lines.push(line);
                line = word;
            } else {
                line = testLine;
            }
        });

        lines.push(line);
        return lines.join('\n');
    };

    const wrappedText = wrapText(termsText, 50, 14); // 假设容器宽度为 200px

    return (
        <Stage width={400} height={400}>
            <Layer>
                <Text text={wrappedText} fontSize={14} x={50} y={50} fontFamily="Arial" />
            </Layer>
        </Stage>
    );
};

export default TermsAndConditionsComponent;
