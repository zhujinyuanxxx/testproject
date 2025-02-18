import React, { useState, useRef } from 'react';
import HomeViewMainPageRightSideForMobileComponent from "./HomeViewMainPageRightSideForMobileComponent";

const Sidebar = () => {
    const [leftPercent, setLeftPercent] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const startLeft = useRef(0);

    const handleMouseDown = (e:any) => {
        setIsDragging(true);
        startX.current = e.clientX;
        startLeft.current = leftPercent;
    };

    const handleMouseMove = (e:any) => {
        if (isDragging) {
            console.log("e.clientX:"+e.clientX);
            console.log("startX.current:"+startX.current);


            const deltaX = e.clientX - startX.current;
            console.log("deltaX:"+deltaX);

            const deltaPercent = (deltaX / window.innerWidth) * 100;
            console.log("deltaPercent:"+deltaPercent);

            const newLeftPercent = startLeft.current + deltaPercent;
            console.log("newLeftPercent:"+newLeftPercent);

            if(newLeftPercent>0){
                setLeftPercent(0);
            }else{
                setLeftPercent(newLeftPercent);
            }

        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        const sidebarWidthPercent = 50; // 动态宽度 50vw
        if (leftPercent >= sidebarWidthPercent) {
            setLeftPercent(sidebarWidthPercent);
        } else {
            setLeftPercent(-sidebarWidthPercent);
        }
    };

    React.useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        // document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            // document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove]);
    // leftPercent

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: `${leftPercent}vw`,
                width: '50vw',
                maxWidth: '50vw',
                height: '100%',
                background: '#f0f0f0',
                transition: 'left 0.3s',
                cursor: 'ew-resize',
            }}
            onMouseDown={handleMouseDown}
        >
            <h3>侧边菜单</h3>
            <p>拖拽菜单栏来改变位置!</p>
            <div
                style={{
                    width: '10px',
                    height: '100%',
                    background: '#ccc',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    cursor: 'ew-resize',
                }}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};

export default Sidebar;