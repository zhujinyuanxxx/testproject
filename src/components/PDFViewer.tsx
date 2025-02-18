// 导入必要的模块
import React, {useState} from 'react';

import { Document, Page } from 'react-pdf';

// 如果你的PDF文件是远程URL，确保指定workerSrc以解决跨域问题
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.mjs';

interface PDFViewerProps {
    fileUrl: string; // PDF文件的URL
    className?: string; // 添加 className 属性
    height?: number;
    width?: number;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl ,className,height,width}) => {
    const [numPages, setNumPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);


    // 加载PDF元数据，获取总页数
    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    // 处理页面变化
    function changePage(offset: number) {
        setPageNumber(prevPage => Math.min(Math.max(prevPage + offset, 1), numPages || 1));
    }

    // 前一页
    function previousPage() {
        changePage(-1);
    }

    // 下一页
    function nextPage() {
        changePage(1);
    }

    return (
        <>
            <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}

            >
                <Page
                    className={`image-container ${className}`}
                    pageNumber={pageNumber}
                    width={width} // 设置宽度
                    height={height} // 设置高度
                />
            </Document>

            {/* 如果已知页数，显示页码控制 */}
            {numPages && (
                <div>
                    <button onClick={previousPage}>上一页</button>
                    <span>{pageNumber} / {numPages}</span>
                    <button onClick={nextPage}>下一页</button>
                </div>
            )}
        </>
    );
};

export default PDFViewer;
