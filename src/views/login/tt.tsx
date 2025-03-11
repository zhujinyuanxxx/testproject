import React, {useEffect, useRef, useState} from 'react';
import {Button, Carousel, Modal, Dropdown, Space, MenuProps} from 'antd';

import axios from "axios";
import styles from '../../scss/Home/tt.module.scss'
import request from "../../utils/request";

// import cd from '../../photograph/cloudDisk.jpg';
//
// import fgss from '../../photograph/12.png';


import loginImg from '../../photograph/login.svg';
import registerImg from '../../photograph/register.svg';


import flyBird from '../../photograph/fly.webp';
import standBird from '../../photograph/stand.webp';
import dotnet from '../../photograph/dotnet.webp';
import reactHooks from '../../photograph/reactHooks.webp';
import docker from '../../photograph/docker.webp';
import mysql from '../../photograph/25.jpg';



import logo from '../../photograph/cloudDisk.svg';
import menu from '../../photograph/menu.svg';


import {useNavigate} from "react-router-dom";
import LoginComponent from "../../components/LoginComponent";
import ImageSwitcher from "../../components/ImageChangeComponent";
import { useTranslation } from "react-i18next";
import PDFViewer from "../../components/PDFViewer";
import PDFViewerList from "../../components/PDFViewerList";
import ComponentSwitcher from "../../components/ComponentSwitcher";
import RegisterComponent from "../../components/RegisterComponent";
import CardsComponent from "../../components/CardsComponent";




// const pdfFilePath = '../../doc/SVN.pdf';




const App: React.FC = () => {

    //登录页
    const [isModalOpen, setIsModalOpen] = useState(false);

    const pdfFilePath = '/doc/SVN.pdf';



    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //条款页
    const [isClauseModalOpen, setClauseIsModalOpen] = useState(false);

    const showClauseModal = () => {
        setClauseIsModalOpen(true);
    };

    const handleClauseOk = () => {
        setClauseIsModalOpen(false);
    };

    const handleClauseCancel = () => {
        setClauseIsModalOpen(false);
    };

    // const canvasRef = useRef<HTMLCanvasElement|null>(null);
    //
    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //
    //     const ctx = canvas?.getContext('2d');
    //
    //     if(ctx){
    //
    //         ctx.font = '16px Arial';
    //
    //         ctx.fillStyle = 'black';
    //
    //         ctx.fillText('Hello11112ssssfg',10,30);
    //
    //     }
    //
    // }, []);

    interface User {
        // key: string;
        id: number;
        username: string;
        password:  string;

    }

    let user1:User = {
        "id": 0,
        "username": "Test1",
        "password": "123456"
    }

    function test():void{

        axios.post(
            'http://localhost:3000/api/User/Login',user1
        ).then(value => {
            console.log(value)
            console.log(value.data)
            console.log(value.data.code)
            console.log(value.data.result)


        })

    }

    function test_2():void{

        axios.post(
            'http://localhost:3000/api/User/getPermissions123'
        ).then(value => {
            console.log(value)
            console.log(value.data)
            console.log(value.data.Code)
            console.log(value.data.Message)


        })

    }

    function test_3():void{
        console.log("1")
        request.get(
            '/User/test2',
            {
                params:{
                    aStt:1,
                    aBll:5
                }
            }
        ).then(value => {
            console.log(value)
            console.log(value.data)
            console.log(value.data.code)
            console.log(value.data.result)

        })

    }


    //导航栏
    const [visible, setVisible] = useState(false);

    // 处理鼠标移动事件
    const handleMouseMove = (e:any) => {

        // 计算鼠标相对于整个页面的位置
        // const mouseYRelativeToPage = e.clientY + window.pageYOffset;
        // console.log("mouseYRelativeToPage的值为:"+mouseYRelativeToPage);


        // 设置一个阈值，例如视口高度的10%
        const threshold = window.innerHeight * 0.1;

        // console.log("e.clientY的值为:"+e.clientY)
        // console.log("threshold的值为:"+threshold)

        // //如果浏览器宽度大于550，则显示导航栏
        // if(width>=550){
        //     // 如果鼠标的Y坐标小于阈值，则显示导航栏
        //     if (e.clientY < threshold) {
        //         setVisible(true);
        //         setVisible(true);
        //     } else {
        //         setVisible(false);
        //     }
        // }

        if (e.clientY < threshold) {
            setVisible(true);
        } else {
            setVisible(false);
        }

        // console.log("visible的值为："+visible);
    };

    // 导航栏样式
    const navbarStyles: React.CSSProperties = {
        top: visible ? '0' : '-80px', // 根据`visible`状态显示或隐藏导航栏
    };

    // // 导航栏样式
    // const mobileNavbarStyles: React.CSSProperties = {
    //     top: visible ? '0' : '-80px', // 根据`visible`状态显示或隐藏导航栏
    // };

    function visibleTest():void{

        // setVisibleContainerThreeItemOneA(!visibleContainerThreeItemOneA);
        //
        // console.log("visibleContainerThreeItemOneA的值为："+visibleContainerThreeItemOneA);
    }


    //11
    const [shouldFadeIn, setShouldFadeIn] = useState(false);

    const handleScroll = () => {
        const windowHeight = window.innerHeight;

        // @ts-ignore
        const elementTop = document.getElementById('fade-element').getBoundingClientRect().top;

        // @ts-ignore
        const elementBottom = document.getElementById('fade-element').getBoundingClientRect().bottom;

        console.log("windowHeight:"+windowHeight)
        console.log("elementTop:"+elementTop)
        console.log("elementBottom:"+elementBottom)



        setShouldFadeIn(elementTop < windowHeight);
        if(elementBottom<0){
            setShouldFadeIn(false);
        }

        console.log("shouldFadeIn:"+shouldFadeIn)

    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    //轮播图css
    // const contentStyle: React.CSSProperties = {
    //     height: '50vh',
    //     color: '#fff',
    //     lineHeight: '160px',
    //     textAlign: 'center',
    //     background: '#364d79',
    // };

    const navigateTo = useNavigate();




    // 浏览器的高度 默认设置为0；
    const [height, setHeight] = useState(0);

    const resizeUpdate = (e:any) => {
        // 通过事件对象获取浏览器窗口的高度
        let h = e.target.innerHeight;
        setHeight(h);
    };

    useEffect(() => {
        // 页面刚加载完成后获取浏览器窗口的大小
        let h = window.innerHeight;
        setHeight(h)

        // 页面变化时获取浏览器窗口的大小
        window.addEventListener('resize', resizeUpdate);

        return () => {
            // 组件销毁时移除监听事件
            window.removeEventListener('resize', resizeUpdate);
        }
    }, []);


    // 浏览器的宽度 默认设置为0；
    const [width, setWidth] = useState(0);

    const resizeUpdateWidth = (e:any) => {
        // 通过事件对象获取浏览器窗口的高度
        let w = e.target.innerWidth;

        if(w<550){
            setVisible(false)
        }

        setWidth(w);
    };

    useEffect(() => {
        // 页面刚加载完成后获取浏览器窗口的大小
        let w = window.innerWidth;
        setWidth(w)

        // 页面变化时获取浏览器窗口的大小
        window.addEventListener('resize', resizeUpdateWidth);

        return () => {
            // 组件销毁时移除监听事件
            window.removeEventListener('resize', resizeUpdateWidth);
        }
    }, []);

    //手机菜单导航栏元素
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a href={"#containerOne"}>containerOne</a>
            ),
        },
        {
            key: '2',
            label: (
                <a href={"#containerTwo"}>containerTwo</a>
            ),
            // icon: <SmileOutlined />,
        },
        {
            key: '3',
            label: (
                <a href={"#fade-element"}>containerThree</a>
            ),
        },
        {
            key: '4',
            danger: true,
            label: (
                <div onClick={showModal}>login</div>
                // <a>login</a>
            ),
        },
        {
            key: '5',
            label: (
                <div onClick={showClauseModal}>register</div>
            ),
        },
    ];

    //const longText = '这是一段很长的文本，可以包含多行内容。\n这是第二段文本。\n这是第三段文本。'; // 替换为您的实际文本


    //
    // const measureText = (text: string, fontSize: number): number => {
    //     const canvas = document.createElement('canvas');
    //     const context = canvas.getContext('2d');
    //     if (!context) {
    //         throw new Error('Canvas context is null.');
    //     }
    //     context.font = `${fontSize}px Arial`;
    //
    //     console.log("文本总宽度为"+context.measureText(text).width);
    //
    //     return context.measureText(text).width;
    // };
    //
    // function splitTextIntoArray(text: string, maxWidth: number): string[] {
    //     const words = text.split(' ');
    //     let line = '';
    //     const lines: string[] = [];
    //
    //     words.forEach((word) => {
    //         const testLine = `${line} ${word}`;
    //         const testWidth = measureText(testLine, 14); // 假设字体大小为 14
    //         if (testWidth > maxWidth) {
    //             lines.push(line.trim());
    //             line = word;
    //         } else {
    //             line = testLine;
    //         }
    //     });
    //
    //     lines.push(line.trim());
    //     return lines;
    // }
    //
    // // 示例用法
    // const longText = '这是一段很长的文本，需要自动换行，截取多段小文本。';
    // const maxWidth = 200; // 假设最大宽度为 200px
    //
    // const textArray = splitTextIntoArray(longText, maxWidth);
    // console.log('文本数组'+textArray); // 输出字符串数组
    //
    // textArray.forEach(t => console.log(t));

    //  在调用 useTranslation 时需要传入命名空间
    const { t, i18n } = useTranslation();

    function ee(){
        // navigateTo("/home/User/Zhu")

        i18n.changeLanguage('en-US');

    }



    function debounce(fn: (...args: any[]) => void, delay: number) {
        let timer: NodeJS.Timeout | null; // 维护一个 timer
        return function (this: any, ...args: any[]) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout( () => {
                fn.apply(this, args); // 用apply指向调用debounce的对象，相当于_this.fn(args);
            }, delay);
        };
    }

    function throttle(fn: (...args: any[]) => void, delay: number) {
        let timer: NodeJS.Timeout | null;
        return function (this: any, ...args: any[]) {
            if (timer) {
                return;
            }
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
            }, delay);
        };
    }

    const consoleLog = (str:string) =>{
        console.log(str);
    }

    // const debouncedConsoleLog = () =>{
    //
    //     debounce(()=>consoleLog("debounceLog"), 1000)
    //
    // }

    // 创建防抖后的函数
    const debouncedConsoleLog = debounce(() => consoleLog("debounceLog"), 1000);
    const debounceLog = () => { debouncedConsoleLog();}



    // const throttleLog = () =>{
    //
    //     throttle(()=>consoleLog("debounceLog"), 1000)
    //
    // }


    const throttledConsoleLog = throttle(() => consoleLog("throttleLog"), 1000);
    const throttleLog = () => { throttledConsoleLog();}

    function GetSession(){
        request.post(
            '/User/GetCurrentSession'
        ).then(res => {
            console.log(res.data["result"], { depth: null });

        }).catch(error => {
            console.error('lllllll999');
        });
    }


    return (

        <>
            <Modal title="Login" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                   footer={[
                       <Button key="back" onClick={handleCancel}>
                           Return
                       </Button>,
                   ]}
            >
                <LoginComponent/>
            </Modal>


            <Modal title="Register" open={isClauseModalOpen} onOk={handleClauseOk} onCancel={handleClauseCancel} style={{ padding: 0 }}
                   footer={[
                       <Button key="back" onClick={handleClauseCancel}>
                           Return
                       </Button>,

                   ]}
            >
                <RegisterComponent/>
            </Modal>


            <div onMouseMove={handleMouseMove}>
                <div
                    style={{
                        position: "fixed",
                        zIndex: 999,
                    }}
                >
                    <div style={{color: "red"}}>
                        Browser's height: {height}
                    </div>
                    <div style={{color: "red"}}>
                        Browser's width: {width}
                    </div>

                    {/*<Button onClick={GetSession}>GetSession</Button>*/}

                    {/*<Button onClick={debounceLog}>debounce</Button>*/}

                    {/*<Button onClick={throttleLog}>throttle</Button>*/}

                </div>


                {/*/!* 手机导航栏内容 *!/*/}
                {/*<div className={styles.mobileNavigator}>*/}
                {/*    <Dropdown menu={{ items }} trigger={['click']} className={styles.mobileNavigatorDropdown}>*/}
                {/*        <a*/}
                {/*            // onClick={(e) => e.preventDefault()}*/}
                {/*            className={styles.mobileNavigatorDropdownA}*/}
                {/*        >*/}
                {/*            <img className={styles.mobileNavigatorImg} src={menu}/>*/}
                {/*        </a>*/}
                {/*    </Dropdown>*/}
                {/*</div>*/}

                {/* 网页导航栏内容 */}
                <div className={styles.navigator} style={navbarStyles}>
                    <div className={styles.logo}>
                        <img src={logo}/>
                    </div>

                    <div className={styles.MenuSelection}>
                        <ul>
                            <a href={"#containerOne"}>containerOne</a>
                        </ul>
                        <ul>
                            <a href={"#containerTwo"}>containerTwo</a>
                        </ul>
                        <ul>
                            <a href={"#fade-element"}>containerThree</a>
                        </ul>
                    </div>

                    <div className={styles.MenuLogin}>

                        <img src={loginImg} onClick={showModal}/>
                        <img src={registerImg} onClick={showClauseModal}/>
                        {/*<img className={styles.menuForPadImg} src={menuForPadImg}/>*/}

                        {/*<ul>*/}
                        {/*    <a onClick={showModal}>sign In</a>*/}
                        {/*</ul>*/}
                        {/*<ul className={styles.menuImg}>*/}
                        {/*    <img src={menu}/>*/}
                        {/*</ul>*/}
                    </div>

                    <div className={styles.mobileNavigator}>
                        <Dropdown menu={{ items }} trigger={['click']} className={styles.mobileNavigatorDropdown}>
                            <a
                                // onClick={(e) => e.preventDefault()}
                                className={styles.mobileNavigatorDropdownA}
                            >
                                <img className={styles.mobileNavigatorImg} src={menu}/>
                            </a>
                        </Dropdown>
                    </div>

                </div>

                <div className={styles.containerOne} id={"containerOne"}>
                    {/*轮播图*/}
                    {/*    111*/}
                        <Carousel autoplay effect="fade" className={styles.carousel}>

                            <div>
                                <div className={styles.carouselText}>
                                    What technology do we use?
                                </div>
                            </div>
                            <div>
                                <img src={dotnet} alt="Hover Image" />
                            </div>

                            <div>
                                <img src={reactHooks} alt="Hover Image" />
                            </div>
                            <div>
                                <img src={docker} alt="Hover Image" />
                            </div>
                            <div>
                                <img src={mysql} alt="Hover Image" />
                            </div>

                        </Carousel>

                </div>
                <div className={styles.containerTwo} id={"containerTwo"}>
                    <div className={styles.containerTwoItemOne}>
                        {/*<img className={styles.containerTwoImg} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />*/}

                        {/*<img className={styles.containerTwoImg} src={fgss}/>*/}
                        {/*<img className={styles.containerTwoImg} src={standBird}/>*/}
                        {/*<img className={styles.containerTwoImg2} src={flyBird}/>*/}

                        <ImageSwitcher
                            className={styles.containerTwoImg}
                            originalImageSrc={standBird}
                            hoverImageSrc={flyBird}
                        />

                    </div>

                    <div
                        className={styles.containerTwoItemTwo}
                    >
                        {/*Two*/}
                        {/*/!*<div className={styles.containerTwoItemTwoTitle}>Cloud storage</div>*!/*/}
                        {/*<ul className={styles.containerTwoItemTwoTitle}>Cloud Storage</ul>*/}
                        {/*<ul>1.Automated and Intelligent Management</ul>*/}
                        {/*<ul>2.Improved Storage Efficiency</ul>*/}
                        {/*<ul>3.Economies of Scale and Elastic Expansion</ul>*/}
                        {/*<ul>4.Low-Cost Backup</ul>*/}
                        <CardsComponent/>

                    </div>

                </div>
                <div className={styles.containerThree} id="fade-element">
                    {/*渐变2*/}


                    <div className={styles.containerThreeItemOne}>
                        <div
                            id="fade-element"
                            style={{

                                opacity: shouldFadeIn ? 1 : 0,
                            }}

                            className={styles.containerThreeItemOneA}

                            // onMouseMove={handleMouseMoveContainerThreeItemOneA}
                        >
                            {/*Fade In Element 1*/}
                            <div
                                // id="fade-element"
                                // style={containerThreeItemOneA}
                                className={styles.containerThreeItemOneAChildElement}
                            >
                                Fade In Element A
                            </div>
                        </div>

                        <div
                            // id="fade-element"
                            style={{

                                opacity: shouldFadeIn ? 1 : 0,

                            }}

                            className={styles.containerThreeItemOneB}

                        >
                            {/*Fade In Element 2*/}
                            <div
                                // id="fade-element"
                                // style={containerThreeItemOneA}
                                className={styles.containerThreeItemOneBChildElement}
                            >
                                Fade In Element B
                            </div>

                        </div>

                        <div
                            // id="fade-element"
                            style={{
                                opacity: shouldFadeIn ? 1 : 0,
                            }}

                            className={styles.containerThreeItemOneC}

                        >
                            {/*Fade In Element 3*/}
                            <div
                                // id="fade-element"
                                // style={containerThreeItemOneA}
                                className={styles.containerThreeItemOneCChildElement}
                            >
                                Fade In Element C
                            </div>

                        </div>
                    </div>

                </div>
                {/*<div className={styles.containerFour}>*/}
                {/*    渐变3*/}




                {/*</div>*/}
                {/*<div className={styles.containerThree}>*/}
                {/*    渐变4*/}




                {/*</div>*/}
                <div className={styles.footer} id={"footer"}>
                    {/*尾页*/}
                    {/*<button onClick={visibleTest}>*/}
                    {/*    visible*/}
                    {/*</button>*/}
                    {/*<button onClick={handleMouseMove}>*/}
                    {/*    visible2*/}
                    {/*</button>*/}
                    {/*<button onClick={ee}>123</button>*/}
                    {/*<div className={styles.footerTestDiv}>*/}
                    {/*    test*/}
                    {/*</div>*/}
                    {/*<a className={styles.footerTestDiv}>*/}
                    {/*    test*/}
                    {/*</a>*/}
                    {/*<canvas className={styles.ClauseCanvas} ref={canvasRef} width={200} height={200}/>*/}


                    {/*<PDFViewer className={styles.pDFViewer} fileUrl={pdfFilePath}/>*/}

                    {/*<PDFViewerList className={styles.pDFViewer} fileUrl={pdfFilePath} width={380} height={600}/>*/}

                    {/*<ComponentSwitcher/>*/}
                </div>

            </div>
        </>
    );
};

export default App;