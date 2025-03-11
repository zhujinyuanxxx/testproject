import React, {useEffect, useRef, useState} from 'react';

import styles from "../scss/Home/Zhu.module.scss";
// import request from "../utils/request";
import requestWithoutToken from "../utils/requestWithoutToken";
import {
    Button,
    Form,
    Input,
    InputNumber,
    InputRef,
    message,
    Modal,
    Table,
    TableColumnsType,
    Upload,
    UploadProps
} from "antd";
import {InboxOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import {RcFile} from "antd/lib/upload";
import request from "../utils/newRequest/request";
import {refreshToken} from "../utils/newRequest/refreshToken";
import { Avatar, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import FriendListComponent from "../components/FriendListComponent";
import useFriendListStore from "../zustandstore/FriendListStore";
import FriendListItemProfileComponent from "../components/FriendListItemProfileComponent";
import ProgressBarComponent from "../components/ProgressBarComponent";
import ButtonComponent from "../components/ButtonComponent";
import Button2Component from "../components/Button2Component";

const { Dragger } = Upload;

interface UserItem {
    id: number,
    username: string,
    email: string,
    age: number,
    sex: string,
    telephone: string,
}

const ContainerHeight = 400;


const Zhu: React.FC = () => {

    const cloudDiskFiles:Item[] = new Array();

    const [form] = Form.useForm();

    const [cloudDiskFileList, setCloudDiskFileList] = useState(cloudDiskFiles);

    const [pagination,setPagination] = useState({current:1,pageSize:5,showSizeChanger:true,pageSizeOptions:["5","10","20"]})

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [selected, setSelected] = useState<string[]>([]);

    const [friendsData, setFriendsData] = useState<UserItem[]>([]);

    const [isUploadFilesModalOpen, setIsUploadFilesModalOpen] = useState(false);

    const [isAddSendFileObjectModalOpen, setIsAddSendFileObjectModalOpen] = useState(false);

    const [searchedUserData, setSearchedUserData] = useState<UserItem[]>([]);

    // zustand store
    const setSelectedFriendNameList = useFriendListStore(state => state.setSelectedFriendNameList);
    const selectedFriendNameList = useFriendListStore(state => state.selectedFriendNameList);

    const [progress, setProgress] = useState(0);

    const [progressVisable,setProgressVisable] = useState(false);

    interface Item {
        // key: string;
        id: number;
        fileName: string;
        fileSize:  string;
        sender: string;
        receiver: string;
        time: string;
    }

    interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
        editing: boolean;
        dataIndex: string;
        title: any;
        inputType: 'number' | 'text';
        record: Item;
        index: number;
        children: React.ReactNode;
    }

    const EditableCell: React.FC<EditableCellProps> = ({
                                                           editing,
                                                           dataIndex,
                                                           title,
                                                           inputType,
                                                           record,
                                                           index,
                                                           children,
                                                           ...restProps
                                                       }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    //table的fieldName
    const columns: TableColumnsType<Item> = [
        {
            title: 'id',
            dataIndex: 'id',
            // width: '5%',
            width: 1,
            // editable: true,
            key: 'id',
            fixed: 'left',
            render:(id:number)=>{
                return(
                    <div className={styles.itemsInTable}>{id}</div>
                )

            },

        },
        {
            title: 'fileName',
            dataIndex: 'fileName',
            // width: '10%',
            width: 2,
            // editable: true,
            key: 'fileName',
            fixed: 'left',
            render:(fileName:string)=>{
                return(
                    <div className={styles.itemsInTable}>{fileName}</div>
                )

            }
        },
        {
            title: 'fileSize',
            dataIndex: 'fileSize',
            // width: '10%',
            width: 2,
            // editable: true,
            key: 'fileSize',
            fixed: 'left',
            render:(fileSize:string)=>{
                return(
                    <div className={styles.itemsInTable}>{fileSize}</div>
                )

            }
        },
        {
            title: 'sender',
            dataIndex: 'sender',
            // width: '5%',
            width: 2,
            // editable: true,
            key: 'sender',
            render:(sender:string)=>{
                return(
                    <div className={styles.itemsInTable}>{sender}</div>
                )

            }
        },
        {
            title: 'receiver',
            dataIndex: 'receiver',
            // width: '5%',
            width: 2,
            // editable: true,
            key: 'receiver',
            render:(receiver:string)=>{
                return(
                    <div className={styles.itemsInTable}>{receiver}</div>
                )

            }
        },
        {
            title: 'time',
            dataIndex: 'time',
            // width: '5%',
            width: 2,
            // editable: true,
            key: 'time',
            render:(time:string)=>{
                return(

                    <div className={styles.itemsInTable}>{time}</div>

                )

            }
            // render: () => null, // 渲染为空
            // colSpan: returnFalse() ? 1 : 0, // 根据状态调整colSpan
        }
        // ,
        // {
        //     title: 'Action',
        //     dataIndex: 'operation',
        //     fixed: 'right',
        //
        //     width: 2,
        //     render: () => <a>action</a>,
        // }
    ];

    const pageJump = (e:any) => {

        setPagination(e);
        console.log(e)

    }

    function test(){
        request.get(
            '/CloudDiskFile/getSendedCloudDiskByUsername'
            // ,
            // {
            //     params:{
            //         page:1,
            //         pageSize:1
            //     }
            // }
        ).then(value => {
            // cloudDiskFiles.push(...value.data);
            console.log(value.data)
            console.log(value.data["result"])

        })
    }

    const test1 = (e:any) => {
        const files = e.target.files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("fileList", files[i]);
        }

        request.post('/CloudDiskFile/Upload', formData, {
            params: {
                receiver: "Test2"
            }
        })
            .then(value => {
                console.log("上传成功:" + value.data);
            })
            .catch(error => {
                console.error("上传失败:", error);
            });
    }

    const test2= async () =>{
        const refreshResult = await request.get('/User/GetAccessTokenByRefreshToken',{
                headers: {
                    // 'Authorization': 'Bearer ' + localStorage.getItem("token")
                    Authorization: `Bearer ${refreshToken}`
                },
            }
        )

        console.log("refreshResult为"+refreshResult);

        console.log("refreshResult.data.result为"+refreshResult.data.result);
    }

    function initData(){
        request.get(
            '/CloudDiskFile/getSendedCloudDiskByUsername'
        ).then(value => {
            setCloudDiskFileList(value.data["result"])
        })
    }

    //初始化加载数据
    useEffect(()=>{

        initData();

        // getUserFriends();

    },[])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);

    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const props: UploadProps = {
        multiple: true,
        name: 'file',
        showUploadList: false, // 添加这行来隐藏上传列表
        // action: (file) => {
        //     return new Promise((resolve, reject) => {
        //         customUpload(file, receiverInputRef.current.value);
        //         // resolve(); // 如果上传成功
        //         // reject(); // 如果上传失败
        //     });
        // }
        // ,

        beforeUpload: (file) => {

            // if (selected.length>0) {
            //     try {
            //         // customUpload(file, inputValue);
            //
            //         customUploadToMany(file, selected);
            //
            //     }catch (e) {
            //         console.log(e)
            //     }
            //     // customUpload(file, "Test2");
            //     return false; // 阻止默认上传行为，因为我们已经自定义了上传方法
            // } else {
            //     // message.error('Please enter a receiver');
            //     message.error('Please add any receiver');
            //     return false; // 阻止上传，直到接收者信息输入完成
            // }

            // selectedFriendNameList
            if (selectedFriendNameList.length>0) {
                try {
                    // customUpload(file, inputValue);
                    customUploadToMany(file, selectedFriendNameList);

                }catch (e) {
                    console.log(e)
                }
                return false; // 阻止默认上传行为，因为我们已经自定义了上传方法
            } else {
                // message.error('Please enter a receiver');
                message.error('Please add any receiver');
                return false; // 阻止上传，直到接收者信息输入完成
            }

        },


        // onChange(info) {
        //     if (info.file.status !== 'uploading') {
        //         console.log(info.file, info.fileList);
        //     }
        //     if (info.file.status === 'done') {
        //         message.success(`${info.file.name} file uploaded successfully`);
        //     } else if (info.file.status === 'error') {
        //         message.error(`${info.file.name} file upload failed.`);
        //     }
        // },
    };


    async function customUpload(file: RcFile, receiver: string) {
        const formData = new FormData();
        formData.append('fileList', file as any); // 将RcFile类型转换为any，因为FormData.append需要Blob或File类型
        formData.append('receiver', receiver);
        // formData.append('receiver', "Test2");
        try {
            // const response = await request.post('/CloudDiskFile/Upload', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         // 'Content-Type': 'application/json ',
            //     },
            // });

            await request.post(
                '/CloudDiskFile/Upload',formData,{
                    params:{
                        receiver: inputValue
                        // fileList: formData.get("fileList")
                    }
                }
            ).then(value => {
                console.log("999:"+value.data);
                initData();
                message.success('file uploaded successfully');
            }).catch(error => {
                message.error('file upload failed');
                console.error('Error uploading file:', error.response.data);
            });

            // console.log(response)
            // if (response.status === 200) {
            //     console.log('File uploaded successfully');
            //     // 处理成功的响应，如返回的数据或状态
            // } else {
            //     console.error('Failed to upload file');
            // }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    async function customUploadToMany(file: RcFile, receivers: string[]) {

        setProgressVisable(true);

        const progress1 = 20 + Math.floor(Math.random() * 10);
        const progress2 = progress1 + 20 + Math.floor(Math.random() * 10);
        const progress3 = progress2 + 20 + Math.floor(Math.random() * 10);
        console.log(progress1);
        console.log(progress2);
        console.log(progress3);
        console.log("file"+file);
        console.log("receivers"+receivers);

        setTimeout(() => setProgress(progress1), 1000);
        setTimeout(() => setProgress(progress2), 2000);
        setTimeout(() => setProgress(progress3), 3000);


        const formData = new FormData();
        formData.append('fileList', file as any); // 将RcFile类型转换为any，因为FormData.append需要Blob或File类型

        receivers.forEach(receiver => {
            formData.append('receiverList', receiver);
        });

        try {

            await request.post(
                '/CloudDiskFile/UploadToMany',formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(value => {
                console.log("9992:"+value.data, { depth: null });
                initData();

                setTimeout(() => setProgress(100), 3500);
                setTimeout(() => message.success('file uploaded successfully'), 4500);

            }).catch(error => {
                message.error('file upload failed');
                console.error('Error uploading file:', error.response.data);
            });

        } catch (error) {
            console.error('Error uploading file:', error);
        }

        setTimeout(() => setProgressVisable(false), 4000);
        setTimeout(() => setProgress(0), 4100);
    }

    function handleFileUpload(event:any) {
        const files = event.target.files;

        const formData = new FormData();

        // 遍历所有选中的文件并添加到formData
        for (let i = 0; i < files.length; i++) {
            formData.append('fileList', files[i]);
            console.log("files[i]结果是"+JSON.stringify(files[i]))
            console.log('文件名:', files[i].name);
            console.log('文件类型:', files[i].type);
            console.log('文件大小:', files[i].size, 'bytes');
        }

        console.log("formData结果是"+JSON.stringify(formData))

        // 添加receiver参数
        formData.append('receiver', 'Test1');

        // 发送POST请求
        // request({
        //     method: 'post',
        //     url: '/CloudDiskFile/Upload',
        //     data: formData,
        //     // headers: { 'Content-Type': 'multipart/form-data' }
        // })
        //     .then(response => {
        //         // 处理成功响应
        //         console.log('文件上传成功:', response.data);
        //     })
        //     .catch(error => {
        //         // 处理错误响应
        //         console.error('文件上传失败:', error);
        // });

        request.post(
            '/CloudDiskFile/Upload',formData,{
                params:{
                    receiver: "Test2"
                    // fileList: formData.get("fileList")
                }
            }
        ).then(value => {
            console.log("213:"+value.data)
        })
    }

    function getProfile(){
        request.post(
            '/User/getUserProfile'
        ).then(value => {
            // console.log(value)
            console.log("getProfile"+value.data)
            console.log("id11111"+value.data.result["id"])
            console.log(value.data, { depth: null });

        })
    }

    const handleCancelUploadFilesModal = () => {

        setIsUploadFilesModalOpen(false);
        setSelectedFriendNameList([]);
        // setSelected([]);
    };

    const handleAddSendFileObjectOk = () => {
        setIsAddSendFileObjectModalOpen(false);
    };

    const handleAddSendFileObjectCancel = () => {

        setIsAddSendFileObjectModalOpen(false);

    };

    function getUserFriends(){

        request.get(
            '/User/GetUserFriendsByUserId'
        ).then(res => {
            // console.log(res.data, { depth: null });
            console.log(res.data["result"], { depth: null });

            setFriendsData(res.data["result"]);
        }).catch(error => {

            // console.log(res.data, { depth: null });
            console.error('lllllll999');
        });

    }

    const selecteUploadObject = (item: UserItem) => {

        if(selected.includes(item.username)){
            console.log(selected.includes(item.username))
            // 更新状态，排除掉要删除的元素ID
            setSelected(selected.filter(username => username !== item.username));
        }else {
            setSelected([...selected, item.username]);
        }

        console.log(item)

        console.log(selected)

    }

    function showUploadFilesModal(){
        setIsUploadFilesModalOpen(true)
    }

    function showAddSendFileObjectModal(){
        setIsAddSendFileObjectModalOpen(true)
    }

    function GetSession(){

        request(
            {
                url: '/User/GetCurrentSession', // 替换为你的文件URL
                method: 'POST',
            }

        ).then(res => {
            setTimeout(() => setProgress(100), 4000)
            console.log(res.data["result"], { depth: null });
        }).catch(error => {
            console.error('lllllll999');
        });

        setTimeout(() => setProgressVisable(false), 6000);

    }

    return (

                <Form form={form} component={false} className={styles.form}>

                    {/*<Input*/}
                    {/*    value={inputValue}*/}
                    {/*    onChange={handleInputChange}*/}
                    {/*    placeholder="请输入文件的传送对象（用户名）"*/}
                    {/*    size="large"*/}
                    {/*/>*/}
                    {/*<p>输入的内容是: {inputValue}</p>*/}
                    {/*<Upload {...props}>*/}
                    {/*    <Button icon={<UploadOutlined />}>Click to Upload</Button>*/}
                    {/*</Upload>*/}


                    {/*<button onClick={getProfile}>getProfile</button>*/}
                    {/*<button onClick={refreshToken}>refreshToken</button>*/}
                    {/*<button onClick={getUserFriends}>getUserFriends</button>*/}

                    {/*<Button onClick={showAddSendFileObjectModal}>添加文件发送对象</Button>*/}

                    <div className={styles.header}>
                        {/*<Button onClick={GetSession}>GetSession</Button>*/}
                        <ButtonComponent  name={"UPLOAD"} onclick={showUploadFilesModal}/>
                    </div>


                    {/*<div className={styles.front}>*/}
                    {/*    front*/}
                    {/*</div>*/}
                    {/*<div className={styles.back}>*/}
                    {/*    back*/}
                    {/*</div>*/}



                    {/*<a className={styles.testForPseudoElement} href="https://www.google.com">test</a>*/}

                    {/*<FriendListItemProfileComponent/>*/}


                    <div className={styles.tableAndFriendListBox}>

                        <Table className={styles.table}

                               components={{
                                   body: {
                                       cell: EditableCell,
                                   },
                               }}
                               bordered
                               dataSource={cloudDiskFileList}
                            //设置cloudDiskFileList的item的id为主键key
                               rowKey="id"
                               columns={columns}
                               rowClassName="editable-row"

                               pagination={pagination}
                               onChange={pageJump}

                               scroll={{ x: 500 }}
                            // scroll={{ x: 1500, y: 300 }}

                               // rowSelection={rowSelection}
                        />

                        {/*<List className={styles.friendList}>*/}
                        {/*    <VirtualList*/}
                        {/*        className={styles.friendListVirtualList}*/}
                        {/*        data={friendsData}*/}
                        {/*        height={ContainerHeight}*/}
                        {/*        itemHeight={80}*/}
                        {/*        itemKey="email"*/}
                        {/*        // onScroll={onScroll}*/}
                        {/*    >*/}
                        {/*        {(item: UserItem) => (*/}
                        {/*            <List.Item*/}
                        {/*                key={item.email}*/}
                        {/*                // onClick={(e) => {*/}
                        {/*                //     testConsole1(item);*/}
                        {/*                //*/}
                        {/*                // }}*/}
                        {/*                // style={{ backgroundColor: selected.includes(item.id) ? 'red' : 'transparent' }}*/}

                        {/*            >*/}
                        {/*                <List.Item.Meta*/}
                        {/*                    // avatar={<Avatar src={item.picture.large} />}*/}
                        {/*                    avatar={<Avatar src={"https://api.dicebear.com/7.x/miniavs/svg?seed=1"} />}*/}
                        {/*                    title={<div>{item.username}</div>}*/}
                        {/*                    description={item.email}*/}



                        {/*                />*/}
                        {/*                /!*<div>Content</div>*!/*/}
                        {/*            </List.Item>*/}
                        {/*        )}*/}
                        {/*    </VirtualList>*/}

                        {/*</List>*/}

                    </div>

                    {/*onOk={handleOk} onCancel={handleCancel}*/}
                    <Modal title="Upload Files" open={isUploadFilesModalOpen} footer={null} onCancel={handleCancelUploadFilesModal}>

                        <ProgressBarComponent progress={progress} visible={progressVisable}/>

                        <div>Please select the file sending object</div>

                        <FriendListComponent enableClickEffect={true} height={"500px"}/>
                        {/*setSelectedFriendNameList*/}
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>

                    </Modal>

                    {/*<Modal title="Basic Modal" open={isAddSendFileObjectModalOpen} onOk={handleAddSendFileObjectOk} onCancel={handleAddSendFileObjectCancel} footer={null}>*/}

                    {/*    /!*<List className={styles.modalFriendList}>*!/*/}
                    {/*    /!*    <VirtualList*!/*/}
                    {/*    /!*        className={styles.friendListVirtualList}*!/*/}
                    {/*    /!*        data={friendsData}*!/*/}
                    {/*    /!*        height={ContainerHeight}*!/*/}
                    {/*    /!*        itemHeight={80}*!/*/}
                    {/*    /!*        itemKey="email"*!/*/}
                    {/*    /!*        // onScroll={onScroll}*!/*/}
                    {/*    /!*    >*!/*/}
                    {/*    /!*        {(item: UserItem) => (*!/*/}
                    {/*    /!*            <List.Item*!/*/}
                    {/*    /!*                className={styles.modalFriendListItem}*!/*/}
                    {/*    /!*                key={item.email}*!/*/}
                    {/*    /!*                onClick={(e) => {*!/*/}
                    {/*    /!*                    selecteUploadObject(item);*!/*/}

                    {/*    /!*                }}*!/*/}
                    {/*    /!*                style={{*!/*/}
                    {/*    /!*                    backgroundColor: selected.includes(item.username) ? 'red' : 'transparent',*!/*/}
                    {/*    /!*                }}*!/*/}
                    {/*    /!*            >*!/*/}
                    {/*    /!*                <List.Item.Meta*!/*/}
                    {/*    /!*                    // avatar={<Avatar src={item.picture.large} />}*!/*/}
                    {/*    /!*                    avatar={<Avatar src={"https://api.dicebear.com/7.x/miniavs/svg?seed=1"} />}*!/*/}
                    {/*    /!*                    title={<div>{item.username}</div>}*!/*/}
                    {/*    /!*                    description={item.email}*!/*/}
                    {/*    /!*                />*!/*/}
                    {/*    /!*                /!*<div>Content</div>*!/*!/*/}
                    {/*    /!*            </List.Item>*!/*/}
                    {/*    /!*        )}*!/*/}
                    {/*    /!*    </VirtualList>*!/*/}
                    {/*    /!*</List>*!/*/}
                    {/*    <FriendListComponent enableClickEffect={true}/>*/}

                    {/*</Modal>*/}

                </Form>





    );

};

export default Zhu;