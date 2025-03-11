import React, { useState, useRef, useEffect, ReactNode, forwardRef } from 'react';

interface SidebarProps {
    position?: 'left' | 'right';
    children: ReactNode;
    onClick?: () => void;
    showSidebar: boolean;
    setShowSidebar: (show: boolean) => void;
    className?: string;
    childElementStatus?: boolean;
    setChildElementStatus?: (show: boolean) => void;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ position = 'left', children, onClick, showSidebar, setShowSidebar, className,childElementStatus,setChildElementStatus }, ref) => {
    const [leftPercent, setLeftPercent] = useState(position === 'left' ? 0 : 50);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const startLeft = useRef(0);
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (showSidebar) {
            setLeftPercent(position === 'left' ? 0 : 50);
        } else {
            setLeftPercent(position === 'left' ? -50 : 100);
        }
    }, [showSidebar, position]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        startX.current = e.clientX;
        startLeft.current = leftPercent;

        if (sidebarRef.current) {
            sidebarRef.current.style.transition = 'none';
        }

        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setIsDragging(true);
        startX.current = e.touches[0].clientX;
        startLeft.current = leftPercent;

        if (sidebarRef.current) {
            sidebarRef.current.style.transition = 'none';
        }

        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const deltaX = e.clientX - startX.current;
            const deltaPercent = (deltaX / window.innerWidth) * 100;
            const newLeftPercent = startLeft.current + deltaPercent;

            if (position === 'left') {
                setLeftPercent(newLeftPercent >= 0 ? 0 : newLeftPercent);
            } else {
                setLeftPercent(newLeftPercent <= 50 ? 50 : newLeftPercent);
            }
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (isDragging) {
            const deltaX = e.touches[0].clientX - startX.current;
            const deltaPercent = (deltaX / window.innerWidth) * 100;
            const newLeftPercent = startLeft.current + deltaPercent;

            if (position === 'left') {
                setLeftPercent(newLeftPercent >= 0 ? 0 : newLeftPercent);
            } else {
                setLeftPercent(newLeftPercent <= 50 ? 50 : newLeftPercent);
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);

        if (sidebarRef.current) {
            sidebarRef.current.style.transition = 'left 0.3s';
        }

        setLeftPercent((currentLeftPercent) => {
            if (position === 'left') {
                if (currentLeftPercent < -25) {
                    setShowSidebar(false);
                    return -50;
                }
                return 0;
            } else {
                if (currentLeftPercent > 75) {
                    setShowSidebar(false);
                    return 100;
                }
                return 50;
            }
        });

        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);

        if (sidebarRef.current) {
            sidebarRef.current.style.transition = 'left 0.3s';
        }

        setLeftPercent((currentLeftPercent) => {

            if (position === 'left') {
                if (currentLeftPercent < -25) {
                    setShowSidebar(false);
                    return -50;
                }
                return 0;
            } else {
                if (currentLeftPercent > 75) {
                    setShowSidebar(false);
                    return 100;
                }
                return 50;
            }
        });

        document.removeEventListener('touchend', handleTouchEnd);
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {

        console.log("childElementStatus111"+childElementStatus)

        if (!childElementStatus && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
            sidebarRef.current.style.transition = 'left 0.3s';
            setShowSidebar(false);
            setLeftPercent(position === 'left' ? -50 : 100);

            console.log("showSidebar"+showSidebar)
        }
    };

    useEffect(() => {
        const moveHandler = (e: MouseEvent | TouchEvent) => {
            if (isDragging) {
                requestAnimationFrame(() => {
                    if (e instanceof MouseEvent) {
                        handleMouseMove(e);
                    } else {
                        handleTouchMove(e);
                    }
                });
            }
        };

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isDragging]);

    return (
        <div
            ref={(element) => {
                sidebarRef.current = element;
                if (typeof ref === 'function') {
                    ref(element);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLDivElement | null>).current = element;
                }
            }}
            className={className}
            style={{
                position: 'fixed',
                top: 0,
                left: `${leftPercent}vw`,
                width: '50vw',
                maxWidth: '50vw',
                height: '100%',
                background: '#f0f0f0',
                cursor: 'ew-resize',
                transition: 'left 0.3s',
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onClick={onClick}
        >
            {children}
        </div>
    );
});

export default Sidebar;
