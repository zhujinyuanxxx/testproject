import React, {forwardRef, ReactNode, useEffect, useState} from "react";
import styles from "./scss/InputComponent.module.scss";
import {message, Modal} from "antd";
import SearchedFriendListComponent from "./SearchedFriendListComponent";
import request from "../utils/newRequest/request";
import LoadingComponent from "./LoadingComponent";

interface InputProps {
    showInputModal?: boolean;
    setShowInputModal?: (show: boolean) => void;
}


const InputComponent = forwardRef<HTMLDivElement, InputProps>(({ showInputModal,setShowInputModal }) => {



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchedUsername,setSearchedUsername] = useState('');
    const [searchedFriendList,setSearchedFriendList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(()=>{

        if(isModalOpen){
            if (setShowInputModal) {
                setShowInputModal(true)
            }
        }else{
            if (setShowInputModal) {
                setShowInputModal(false)
            }
        }

        console.log("isModalOpen"+isModalOpen)

    },[isModalOpen])



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
            if (setShowInputModal) {
                setShowInputModal(true);
            }
        }
    };

    return (

        <div className={styles.inputContainer}>

            <Modal title="Search Friends" open={isModalOpen} onCancel={handleCancel} footer={null} >
                {isLoading ? <LoadingComponent /> : <SearchedFriendListComponent items={searchedFriendList} />}
            </Modal>


            <input
                className={styles.input}
                onKeyDown={e => handleKeyDown(e)}
                name="text"
                type="text"
                placeholder="Search the receivers..."
                value={searchedUsername}
                onChange={event => {setSearchedUsername(event.target.value)}}
                // onClick={e => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()} // 阻止事件冒泡
            />



        </div>
    )
})

export default InputComponent;
