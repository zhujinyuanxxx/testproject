import React, {useState} from "react";
import styles from "./scss/Menu2Component.module.scss";
import {message, Modal} from "antd";

import request from "../utils/newRequest/request";



interface Menu2ComponentProps {

    onclick?: ()=>void;
    width?: string;
    height?: string;
    className?: string;
}

const Menu2Component: React.FC<Menu2ComponentProps> = ({onclick,width,height,className}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchedUsername,setSearchedUsername] = useState('');
    const [searchedFriendList,setSearchedFriendList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleCancel = () => {
        setIsModalOpen(false);
    };


    async function GetUserBySearchedUsername(){
        setIsLoading(true);
        await request.get(
            '/User/GetUserBySearchedUsername',{
                params:{
                    searchedUsername: searchedUsername
                }
            }
        ).then(value => {
            console.log("999:"+value.data);
            setSearchedFriendList(value.data["result"])
            setTimeout(() => setIsLoading(false), 2000);
            // initData();
        }).catch(error => {
            setTimeout(() => setIsLoading(false), 2000);
            message.error('file upload failed');
        });


    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            GetUserBySearchedUsername().then(r => setIsModalOpen(true));
        }
    };

    return (

        <div className={`${styles.background} ${className}`} onClick={onclick}>
            <button className={styles.menuIcon}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    )
}

export default Menu2Component;
