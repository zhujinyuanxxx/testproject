import React, { useState, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import {Button, Checkbox, CheckboxProps} from "antd";

pdfjs.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.mjs';

interface PDFViewerProps {
    fileUrl: string;
    className?: string;
    height?: number;
    width?: number;
}

const PDFViewerList: React.FC<PDFViewerProps> = ({ fileUrl, className, height, width }) => {
    const [numPages, setNumPages] = useState<number>(1);
    const [canCheck, setCanCheck] = useState<boolean>(false); // 新增状态管理是否可以勾选checkbox
    const pagesRef = useRef<HTMLDivElement>(null); //pdf总的DIV容器

    const [canPush, setCanPush] = useState<boolean>(false);

    useEffect(() => {
        if (pagesRef.current) {
            pagesRef.current.scrollTop = 0; // 每次加载或切换PDF时滚动到顶部
            pagesRef.current.addEventListener('scroll', handleScroll); // 添加滚动监听
        }
        return () => {
            if (pagesRef.current) {
                pagesRef.current.removeEventListener('scroll', handleScroll); // 清理监听器
            }
        };
    }, [numPages]);

    // 判断是否滚动到底部
    const handleScroll = () => {
        if (pagesRef.current) {

            console.log("canCheck:",canCheck)
            if(!canCheck){
                // const isAtBottom = pagesRef.current.scrollHeight - pagesRef.current.scrollTop === pagesRef.current.clientHeight;
                const epsilon = 1; // 定义一个极小的误差容许值，根据实际需求调整大小
                const isAtBottom = Math.abs(pagesRef.current.scrollHeight - (pagesRef.current.scrollTop + pagesRef.current.clientHeight)) <= epsilon;


                console.log("pagesRef.current.scrollHeight:",pagesRef.current.scrollHeight)
                console.log("pagesRef.current.scrollTop:",pagesRef.current.scrollTop)
                console.log("pagesRef.current.clientHeight:",pagesRef.current.clientHeight)
                console.log("isAtBottom:",isAtBottom)
                if (isAtBottom) {
                    setCanCheck(true); // 一旦到达底部，就将canCheck设为true，之后不再改变
                }
            }

        }
    };

    // 加载PDF元数据，获取总页数
    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    const onCheckChange: CheckboxProps['onChange'] = (e) => {
        // console.log(`checked = ${e.target.checked}`);
        setCanPush(!canPush);
    };

    // axios使用后端webAPI的注册
    // const register = (name) => {
    //     console.log(`Hello, ${name}!`);
    // };

    // greet("Bob"); // 输出: Hello, Bob!

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    // maxHeight: `${height}px`, // 限制容器高度
                    // overflowY: 'scroll', // 允许垂直滚动
                }}
            >

                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <div
                        className={`pdf-pages-container ${className}`}
                        ref={pagesRef}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: `${height}px`, // 限制容器高度
                            overflowY: 'scroll', // 允许垂直滚动
                        }}
                    >
                        {[...Array(numPages)].map((_, index) => (
                            <Page
                                key={index}
                                className={`image-container ${className}`}
                                pageNumber={index + 1}
                                width={width} // 设置宽度
                                height={height ? height / numPages : undefined} // 动态调整单页高度
                            />
                        ))}
                    </div>
                </Document>
                {/* 添加Checkbox */}

                <Checkbox disabled={!canCheck} onChange={onCheckChange}>我同意上述款项</Checkbox>
                {/*<Button disabled={!canPush}>注册</Button>*/}
            </div>
            {/* 注意：这里的onChange逻辑可能需要根据实际需求调整，因为直接改变canCheck可能导致无法再次勾选 */}
        </>
    );
};

export default PDFViewerList;
