import React, { useState } from 'react';
// import LazyLoad from 'react-lazyload';



interface ImageSwitcherProps {
    originalImageSrc: string;
    hoverImageSrc: string;
    className?: string; // 添加 className 属性
}

const ImageSwitcher: React.FC<ImageSwitcherProps> = ({
                                                         originalImageSrc,
                                                         hoverImageSrc,
                                                         className, // 接收 className 属性
                                                     }) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleClick = () => {
        setHovered(!hovered);
    };

    return (
        <div
            className={`image-container ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {hovered ? (
                <img src={hoverImageSrc} alt="Hover Image" />
            ) : (
                <img src={originalImageSrc} alt="Original Image" />
            )}
        </div>
    );
};

export default ImageSwitcher;
