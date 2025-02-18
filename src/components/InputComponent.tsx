import React, {useState} from "react";
import styles from "./scss/InputComponent.module.scss";
import {message, Modal} from "antd";
import SearchedFriendListComponent from "./SearchedFriendListComponent";
import request from "../utils/newRequest/request";
import LoadingComponent from "./LoadingComponent";

const InputComponent: React.FC = () => {


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
            />



        </div>
    )
}

export default InputComponent;
