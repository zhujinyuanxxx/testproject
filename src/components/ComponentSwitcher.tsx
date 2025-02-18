import React, { useState } from 'react';
import PDFViewerList from "./PDFViewerList";

const pdfFilePath = '/doc/SVN.pdf';

// 假设这是你的三个组件
const ComponentOne = () => <PDFViewerList fileUrl={pdfFilePath} width={380} height={600}/>;
const ComponentTwo = () => <div>组件二的内容</div>;
const ComponentThree = () => <div>组件三的内容</div>;

type ComponentType = typeof ComponentOne | typeof ComponentTwo | typeof ComponentThree;

const ComponentSwitcher: React.FC = () => {
    const [activeComponentIndex, setActiveComponentIndex] = useState(0);
    const components: ComponentType[] = [ComponentOne, ComponentTwo, ComponentThree];

    // 确保索引在有效范围内
    const nextComponentIndex = () =>
        activeComponentIndex + 1 < components.length ? activeComponentIndex + 1 : 0;

    const handleClick = () => {
        setActiveComponentIndex(nextComponentIndex());
    };

    // 根据索引获取并渲染当前组件
    const CurrentComponent = components[activeComponentIndex];

    return (
        <div>
            <CurrentComponent />
            <button onClick={handleClick}>下一步</button>
        </div>
    );
};

export default ComponentSwitcher;
