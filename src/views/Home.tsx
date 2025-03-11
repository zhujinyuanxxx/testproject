import React, {useEffect, useRef, useState} from 'react';
import testAvatat from '../logo.svg';

import type { MenuProps } from 'antd';
import {Avatar, Breadcrumb, Layout, List, Menu, Modal, theme} from 'antd';
import {Outlet, useNavigate, useRoutes} from "react-router-dom";
import styles from '../scss/Home/Home.module.scss'
import axios from "axios";
import request from "../utils/newRequest/request";
import MobileNavigatorComponent from "../components/MobileNavigatorComponent";
import LoginComponent from "../components/LoginComponent";
import MenuComponent from "../components/MenuComponent";
import SideMenuComponent from "../components/SideMenuComponent";
import SubMenu from "antd/es/menu/SubMenu";
import InputComponent from "../components/InputComponent";
import FriendListComponent, {FriendItem} from "../components/FriendListComponent";
import useFriendListStore from '../zustandstore/FriendListStore';
import Menu2Component from "../components/Menu2Component";
import Button2Component from "../components/Button2Component";
import Sidebar from "../components/Sidebar";


const { Header, Content, Footer, Sider } = Layout;


const Home: React.FC = () => {

    // interface FriendItem {
    //     id: number,
    //     username: string,
    //     email: string,
    //     age: number,
    //     sex: string,
    //     telephone: string,
    // }

    // interface FriendItem {
    //     icon?: string;
    //     username: string;
    //     // email: string;
    //     // age: number;
    //     // sex: string;
    //     // telephone: string;
    // }

    // zustandStore for friendList
    const setFriendList = useFriendListStore(state => state.setFriendList);

    // 浏览器的高度 默认设置为0；
    const [height, setHeight] = useState(0);


    const mainPageRightSideRef = useRef<HTMLDivElement | null>(null);


    //-------MainPageRightSideForMobile-------
    const mainPageRightSideForMobileRef = useRef<HTMLDivElement | null>(null);
    const [mainPageRightSideForMobileWidth, setMainPageRightSideForMobileWidth] = useState(500); // 初始化侧边栏宽度
    const isMainPageRightSideForMobileDragging = useRef(false); // 用于记录是否处于拖拽状态
    const mainPageRightSideForMobileStartX = useRef(0); // 记录初始鼠标位置
    const mainPageRightSideForMobileStartWidth = useRef(0); // 记录初始侧边栏宽度
    const mainPageRightSideForMobileHandleMouseDown = (e:any) => {
        isMainPageRightSideForMobileDragging.current = true; // 标记开始拖拽
        mainPageRightSideForMobileStartX.current = e.clientX; // 记录初始鼠标位置
        mainPageRightSideForMobileStartWidth.current = mainPageRightSideForMobileRef.current!.clientWidth; // 记录初始侧边栏宽度

        console.log(mainPageRightSideForMobileStartX)
        console.log(mainPageRightSideForMobileStartWidth)


    };

    const mainPageRightSideForMobileHandleMouseMove = (e:any) => {
        if (isMainPageRightSideForMobileDragging.current) { // 如果处于拖拽状态
            const newWidth = mainPageRightSideForMobileStartWidth.current + (e.clientX - mainPageRightSideForMobileStartX.current); // 计算新的宽度
            console.log("newWidth:"+newWidth)
            setMainPageRightSideForMobileWidth(newWidth > 100 ? newWidth : 100); // 设置新的宽度，并确保宽度不小于100
        }
    };


    useEffect(() => {
        document.addEventListener('mainPageRightSideForMobileHandleMouseMove', mainPageRightSideForMobileHandleMouseMove); // 监听鼠标移动事件
        // document.addEventListener('mouseup', handleMouseUp); // 监听鼠标释放事件

        return () => {
            document.removeEventListener('mainPageRightSideForMobileHandleMouseMove', mainPageRightSideForMobileHandleMouseMove); // 清理事件监听
            // document.removeEventListener('mouseup', handleMouseUp); // 清理事件监听
        };
    }, []);

    //-------MainPageRightSideForMobile-------

    const mainPageSideForMobileRef = useRef<HTMLDivElement | null>(null);


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
        setWidth(w);

        if(w>950){
            setCollapsed(false);
        }else {
            setCollapsed(true);
        }
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


    //antD
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {

        let w = window.innerWidth;

        if(w>950){
            setCollapsed(false);
        }else {
            setCollapsed(true);
        }
    }, []);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigateTo = useNavigate();
    // const outlet = useRoutes(routes);

    const [homeFlag, setHomeFlag]: [boolean, ((value: (((prevState: boolean) => boolean) | boolean)) => void)] = useState(true);

    const [currentUrl, setCurrentUrl]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState("");

    // const [friendsData, setFriendsData] = useState<FriendItem[]>([]);
    const [friendsData, setFriendsData] = useState<FriendItem[]>([]);

    useEffect(() => {
        const urlParams = new URL(window.location.href);
        const pathname = urlParams?.pathname;
        // console.log("pathname:", pathname);
        setCurrentUrl(pathname)
    }, []);


    function cc(e:any): void {
        // console.log(e);

        // showOnlyHomeUrl();

        console.log(e)

        navigateTo(e.path);

        // if(e.label == "LOGOUT"){
        //     console.log("LOGOUT")
        // }else{
        //     navigateTo(e.key);
        // }

    }

    function showOnlyHomeUrl(): void {
        const urlParams:URL = new URL(window.location.href);
        const pathname:string = urlParams?.pathname;
        // console.log("pathname:", pathname);

        setHomeFlag(f=>pathname.endsWith("home"));

    }

    //只在渲染前执行一次
    useEffect(()=>{
        showOnlyHomeUrl();
        getUserFriends();
    },[]);

    // function getUserFriends(){
    //
    //     request.get(
    //         '/User/GetUserFriendsByUserId'
    //     ).then(res => {
    //         // console.log(res.data, { depth: null });
    //         console.log(res.data["result"], { depth: null });
    //
    //         setFriendsData(res.data["result"]);
    //
    //
    //         const friendItems = res.data["result"];
    //         console.log("log123")
    //         console.log(friendItems)
    //
    //     }).catch(error => {
    //
    //         // console.log(res.data, { depth: null });
    //         console.error('lllllll999');
    //     });
    //
    // }

    function getUserFriends(){

        request.get(
            '/User/GetUserFriendsByUserId'
        ).then(res => {
            // console.log(res.data, { depth: null });
            console.log(res.data["result"], { depth: null });

            setFriendsData(res.data["result"]);
            setFriendList(res.data["result"]);
            console.log("log123")
            console.log(friendsData)
        }).catch(error => {

            // console.log(res.data, { depth: null });
            console.error('lllllll999');
        });

    }


    console.log(window.innerHeight)
    console.log(window.innerWidth)

    function pushButton(){
        // getUserFriends();
        console.log("friendData:"+friendsData[0].username);
    }

    //url
    function printUrl():void{
        const urlParams = new URL(window.location.href);
        const pathname = urlParams?.pathname;
        // console.log("pathname:", pathname);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    interface MenuItem {
        title: string;
        path: string;
        icon?: JSX.Element; // 可选的图标元素
    }

    // 创建菜单项数组
    const menuItems: MenuItem[] = [
        { title: 'OVERVIEW', path: '/home/User/Overview' },
        { title: 'SEND', path: '/home/User/Zhu' },
        { title: 'RECEIVE', path: '/home/User/download' },
        // { title: 'PROFILE', path: '/home/Message' },
        { title: 'PROFILE', path: '/home/User/Profile' },
    ];



    /* script.js */

    // if (mainPageRightSideRef.current) {
    //     document.addEventListener('click', function(event) {
    //         const element = mainPageRightSideRef.current;
    //         if (element&&element.classList.contains("show")&&element.style.right === "0px") {
    //             element.style.right = "-100%";
    //             console.log("触发成功")
    //             // element.removeChild("show");
    //             // element.classList.remove("show")
    //         }
    //     });
    // }



    // let friendItems: FriendItem[];
    // friendItems = [
    //     {icon: testAvatat, username: "Alice"},
    //     {icon: testAvatat, username: "Bob"},
    //     // 添加更多朋友项...
    // ];

    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarRef = useRef<HTMLDivElement | null>(null);


    const hideMainPageRightSideForMobiles = () => {
        if (sidebarRef.current && !showInputModal) {
            // sidebarRef.current.style.left = "100vw";
            setShowSidebar(false); // 隐藏菜单栏
        }
    };

    const showMainPageRightSideForMobile = () => {
        setShowSidebar(true); // 显示菜单栏
    };


    const [showLeftSidebar, setShowLeftSidebar] = useState(false);
    const leftSidebarRef = useRef<HTMLDivElement | null>(null);


    const hideMainPageLeftSideForMobiles = () => {
        if (sidebarRef.current) {
            setShowLeftSidebar(false); // 隐藏菜单栏
        }
    };

    const showMainPageLeftSideForMobile = () => {
        setShowLeftSidebar(true); // 显示菜单栏
    };


    const [showInputModal, setShowInputModal] = useState(false);
    const [childElementStatus, setChildElementStatus] = useState(false);



    return (
        <Layout className={styles.homeMainPage}>



            <Menu2Component className={styles.mobileWebPageSideMenuBtn} onclick={showMainPageLeftSideForMobile}/>
            <Button2Component className={styles.mobileWebPageFriendsBtn} name={"Friends"} onclick={showMainPageRightSideForMobile}/>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>


            {/*Mobile Web*/}
            <Sidebar position="left" ref={leftSidebarRef} showSidebar={showLeftSidebar} setShowSidebar={setShowLeftSidebar} className={styles.mainPageRightSideForMobile}>
                {/*<div className={styles.mainPageLeftSideCloseBtn} onClick={hideMainPageLeftSideForMobiles}>*/}
                {/*    X*/}
                {/*</div>*/}
                <div className={styles.mainPageSideProfile}>
                    {/*<div>收件通知</div>*/}
                    <div onClick={pushButton}>Avatar</div>
                    <div>NickName</div>
                </div>
                <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className={styles.mainPageSideMenu}>
                    <SideMenuComponent items={menuItems} onClick={cc} width={"50vw"}/>
                </Sider>
            </Sidebar>
            {/*Mobile Web*/}

            {/*<MobileNavigatorComponent/>*/}

            {/*mode="inline"*/}
            <div className={styles.mainPageSide}>
                <div className={styles.mainPageSideProfile}>
                    {/*<div>收件通知</div>*/}
                    <div onClick={pushButton}>Avatar</div>
                    <div>NickName</div>
                </div>
                <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className={styles.mainPageSideMenu}>
                    {/*<button onClick={dd} className={styles.buttonFlag}>111</button>*/}
                    {/*<div style={{color: "red"}}>*/}
                    {/*    浏览器的高度为：{height}*/}
                    {/*</div>*/}
                    {/*<div style={{color: "red"}}>*/}
                    {/*    浏览器的宽度为：{width}*/}
                    {/*</div>*/}
                    {/*<div className="demo-logo-vertical" />*/}
                    {/*<Menu theme="light" items={menuItems} mode="horizontal" onClick={cc} className={styles.homeMainPageMenuButtons} />*/}
                    {/*sideMenu2*/}
                    <SideMenuComponent items={menuItems} onClick={cc} width={"20vw"}/>
                </Sider>

            </div>


            <Layout className={styles.homeMainPageFrame}>
                {/*<Header style={{ background: colorBgContainer , backgroundColor: "red"}} className={styles.rightHeader}>*/}
                {/*    {currentUrl}*/}



                {/*</Header>*/}
                <Content className={styles.rightContent}>
                    {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                    {/*    <Breadcrumb.Item>User</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    {/*<div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>*/}
                    {/*    Bill is a cat.*/}
                    {/*</div>*/}

                    {/*{homeFlag ?*/}
                    {/*    <div>*/}
                    {/*        我只在home路由显示*/}
                    {/*    </div>*/}
                    {/*    :*/}
                    {/*    <Outlet/>*/}
                    {/*}*/}
                    <Outlet/>

                    {/*<Outlet/>*/}
                    {/*{outlet}*/}
                </Content>
                {/*<Footer style={{ textAlign: 'center' , backgroundColor: "red"}} className={styles.rightFooter}>Ant Design ©2023 Created by Ant UED</Footer>*/}


                    {/*<Footer className={styles.homeMainPageMenu_2}>*/}
                    {/*    <Menu theme="light" items={mobileItems} onClick={cc} mode="horizontal" className={styles.homeMainPageMenuButtons_2}/>*/}
                    {/*</Footer>*/}
                {/*</div>*/}
            </Layout>



            <div className={styles.mainPageRightSide} ref={mainPageRightSideRef}>
                <div className={styles.mainPageRightSideSearchBox}>
                    <InputComponent/>
                </div>
                <div className={styles.mainPageRightSideFriendList}>

                    <FriendListComponent enableClickEffect={false}/>

                </div>

            </div>


            {/*Mobile Web*/}
            <Sidebar position="right" ref={sidebarRef} showSidebar={showSidebar} setShowSidebar={setShowSidebar} className={styles.mainPageRightSideForMobile} childElementStatus={showInputModal} setChildElementStatus={setShowInputModal}>
                {/*<div className={styles.mainPageRightSideCloseBtn} onClick={hideMainPageRightSideForMobiles}>*/}
                {/*    X*/}
                {/*</div>*/}
                <div className={styles.mainPageRightSideSearchBox}>
                    <InputComponent showInputModal={showInputModal} setShowInputModal={setShowInputModal}/>
                </div>
                <div className={styles.mainPageRightSideFriendList}>
                    <FriendListComponent enableClickEffect={false}/>
                </div>
            </Sidebar>
            {/*Mobile Web*/}

        </Layout>

    );
};

export default Home;