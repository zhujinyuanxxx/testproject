import { BlurFilter } from 'pixi.js';
import {Stage, Container, Sprite, Text, PixiRef, useApp, useTick} from '@pixi/react';
import React, {useEffect, useMemo, useState} from 'react';
import {Pagination, PaginationProps} from 'antd';
import styles from "../scss/Home/video.module.scss";
import * as PIXI from "pixi.js"
import axios from "axios";
import BillComponent from "../components/BillComponent";

const [width, height] = [500, 500];
const spritesheet = "https://pixijs.io/examples/examples/assets/spritesheet/fighter.json";

const Test2 = ()  => {

    interface Item {
        // key: string;
        id: number;
        name: string;
        url:  string;
        type: string;
        image: string;
    }

    const crawlers:Item[] = new Array();

    const [crawlerList, setCrawlerList] = useState(crawlers);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(16);
    const [count, setCount] = useState(0);

    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        console.log('Page: ', pageNumber);
        setPage(pageNumber)
        getVideoListForPageAndPageSize()
    };

    function getVideoListForPageAndPageSize(){

        axios.get(
            'http://localhost:3000/api/Crawler/GetVideoListForPageAndPageSize'
            ,
            {
                params:{
                    page:page,
                    pageSize:pageSize
                }
            }
        ).then(value => {
            console.log(value.data)
            console.log(value.data["crawlers"])

            setCrawlerList(value.data.crawlers)
            setCount(value.data.crawlersCount)
            setPage(page)
            setPageSize(pageSize)
        })

    }

    function videoBox(){

        return(
            <div>123</div>
        )

    }

    function RepeatDiv() {
        const divs = [];
        for (let i = 0; i < crawlerList.length; i++) {

            let imageUrl = crawlerList[i].image;
            // divs.push(React.createElement('div', { key: i }, `This is div ${i + 1}:`.concat(`${crawlerList[i].image}`)));
            divs.push(

                <div>
                    123
                    <img src= "${imageUrl}"/>

                    ${crawlerList[i].image}
                </div>

            )

        }
        return <div className={styles.videoDiv}>{divs}</div>;
    }


    interface ImageListProps {
        crawlerList: Item[];
    }

    function ImageList(props: ImageListProps) {
        return (
            <div className={styles.imageContainer}>
                {props.crawlerList.map((item) => (
                     // <div className={styles.videoItem}>
                    <div key={item.id} >
                        {/*<div className={styles.img}>*/}
                        {/*    <img src={item.image} alt={`Image ${item.id}`} style={{ width: '100%', height: '100%' }}/>*/}
                        {/*    <img src={item.image} className={styles.innerImg}/>*/}
                        {/*</div>*/}
                        <img src={item.image} alt={`Image ${item.id}`} style={{ width: '100%', height: '80%' }}/>
                        {/*<img src={item.image} alt={`Image ${item.id}`} style={{ width: '100%', height: '80%' }} className={styles.img}/>*/}
                        {/*<img src={item.image} alt="Second image" className={styles.innerImg}/>*/}
                        <div className={styles.videoName}>{item.name}</div>
                    </div>

                ))}
            </div>
        );
    }


    //渲染前获取data
    useEffect(()=>{
        // getVideoListForPageAndPageSize();
        axios.get(
            'http://localhost:3000/api/Crawler/GetVideoListForPageAndPageSize'
            ,
            {
                params:{
                    page:page,
                    pageSize:pageSize
                }
            }
        ).then(value => {
            console.log(value.data)
            console.log(value.data["crawlers"])


            setCrawlerList(value.data["crawlers"])
            setCount(value.data["crawlersCount"])
            setPage(page)
            setPageSize(pageSize)
        })
    },[])

    return (
        // <div className={styles.videoBox}>
        <div className={styles.videoBox}>
            {/*<div>*/}
            {/*    <BillComponent/>*/}
            {/*</div>*/}
                {/*111*/}
            {/*<Pagination showQuickJumper defaultCurrent={page} total={count} onChange={onChange} />*/}
            <header className={styles.videoHeader}>123</header>
            <ImageList crawlerList={crawlerList}/>

            <Pagination showQuickJumper defaultCurrent={page} total={count} onChange={onChange} />
        </div>

        // <div>
        //     <a href="#" className="logo">AlbertYang</a>
        //     <ul className="navigation">
        //         <li><a href="#">首页</a></li>
        //         <li><a href="#">博客</a></li>
        //         <li><a href="#">联系我</a></li>
        //         <li><a href="#">留言板</a></li>
        //         <li><a href="#">关于我</a></li>
        //         <li><a href="#">照片墙</a></li>
        //     </ul>
        //     <div className="search">
        //         <input type="text" placeholder="Search"/>
        //             <i className="fa fa-search" aria-hidden="true"></i>
        //     </div>
        // </div>



    );

};

// render(<Test2 />, document.getElementById('root'));

export default Test2;