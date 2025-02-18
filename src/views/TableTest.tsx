import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, Popconfirm, Table, TableColumnsType, Typography} from 'antd';
import axios from "axios";
import styles from "../scss/Home/ClawerVideoTable.module.scss";
import {useNavigate} from "react-router-dom";
import useVideoUrlStore from "../zustandstore/UrlStore";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

interface Item {
    // key: string;
    id: number;
    name: string;
    url:  string;
    type: string;
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

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};



const TableTest: React.FC = () => {
    const crawlers:Item[] = new Array();

    //navigate
    const navigate = useNavigate();

    //zustand
    let urlState = useVideoUrlStore((state) => state.url)
    const changeUrl = useVideoUrlStore((state) => state.changeUrl)


    //antD
    const [form] = Form.useForm();

    const [editingKey, setEditingKey] = useState('');

    // current:1,pageSize:1,showSizeChanger:true,pageSizeOptions:["2","3"]
    const [pagination,setPagination] = useState({current:1,pageSize:5,showSizeChanger:true,pageSizeOptions:["2","3","5"]})
    const [crawlerList, setCrawlerList] = useState(crawlers);

    // const isEditing = (record: Item) => record.key === editingKey;
    //
    // const edit = (record: Partial<Item> & { key: React.Key }) => {
    //     console.log(record)
    //
    //     form.setFieldsValue({ name: '', url: '', type: '', ...record });
    //     setEditingKey(record.key);
    // };

    // baseURL: process.env.REACT_APP_API_URL,

    useEffect(()=>{
        axios.get(
            'http://localhost:3000/api/Crawler/GetVideoList'
            // ,
            // {
            //     params:{
            //         page:1,
            //         pageSize:1
            //     }
            // }
        ).then(value => {
            // crawlers.push(...value.data);
            // console.log(value.data)
            //
            // console.log(crawlers)
            // console.log(originData)
            setCrawlerList(value.data)

        })
    },[])

    const cancel = (e:any) => {
        setEditingKey('');
        setPagination(e);
        console.log("pppppp")
        console.log(e)
        console.log(e.pageSize)
        console.log(e.current)
        console.log("pppppp")

    };

    // const save = async (id: React.Key) => {
    //     try {
    //         const row = (await form.validateFields()) as Item;
    //
    //         const newData = [...data];
    //         const index = newData.findIndex((item) => id === item.id);
    //         if (index > -1) {
    //             const item = newData[index];
    //             newData.splice(index, 1, {
    //                 ...item,
    //                 ...row,
    //             });
    //             setData(newData);
    //             setEditingKey('');
    //         } else {
    //             newData.push(row);
    //             setData(newData);
    //             setEditingKey('');
    //         }
    //     } catch (errInfo) {
    //         console.log('Validate Failed:', errInfo);
    //     }
    // };

    function goToPlay(record: Partial<Item> & { id: React.Key }){
        console.log(record);

        let playUrl:string | undefined = record.url;

        if (playUrl != null) {
            changeUrl(playUrl);
            navigate(`/home/User/Zhu?param=${record.name?.split(".mp4")[0]}`);
        }else {
            alert("url不能为null")
        }



        //路由跳转完整写法
        // navigate("/home/User/Zhu",{state:{from:"/home/TableTest"}})

        //路由跳转简化写法
        // navigate(`/home/User/Zhu`);

        //带参数路由跳转
        // navigate(`/home/User/Zhu?param=${record.name?.split(".mp4")[0]}`);

        //浏览器后退一页
        // navigate(-1);

    }

    const columns: TableColumnsType<Item> = [
        {
            title: 'id',
            dataIndex: 'id',
            width: 5,
            // editable: true,
            key: 'id',
            render:(id:number)=>{
                return(
                    <div className={styles.itemsInTable}>{id}</div>
                )

            }
        },
        {
            title: 'name',
            dataIndex: 'name',
            width: 10,
            // editable: true,
            key: 'name',
            render:(name:string)=>{
                return(
                    <div className={styles.itemsInTable}>{name}</div>
                )

            }
        },
        {
            title: 'url',
            dataIndex: 'url',
            width: 10,
            key: 'url',
            render:(url:string, record: Item)=>{
                // var record: Item;

                return(
                    // <video loop src={url} width={"50vw"} height={"50vh"} onClick={e => {
                    //     goToPlay(record)
                    // }}/>
                    // <BrowserRouter>
                    //     <Link to={"zhu"}>
                    //         <div className={styles.urlInTable} onClick={(e: React.MouseEvent<HTMLDivElement>):void => {goToPlay(record)}}>{url}</div>
                    //     </Link>
                    //     {/*<Routes>*/}
                    //     {/*    <Route path={"zhu"}>*/}
                    //
                    //     {/*    </Route>*/}
                    //     {/*</Routes>*/}
                    // </BrowserRouter>
                    <div className={styles.urlInTable} onClick={(e: React.MouseEvent<HTMLDivElement>):void => {goToPlay(record)}}>{url}</div>
                )
            }
        },
        //http://localhost:5005/Crawler/GetVideo
        {
            title: 'type',
            dataIndex: 'type',
            width: 5,
            // editable: true,
            key: 'type',
            render:(type:string)=>{
                return(
                    <div className={styles.itemsInTable}>{type}</div>
                )

            }
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            fixed: 'right',

            width: 2,
            render: () => <a>action</a>,
        },

        // {
        //     title: 'operation',
        //     dataIndex: 'operation',
        //     render: (_: any, record: Item) => {
        //         const editable = isEditing(record);
        //         return editable ? (
        //             <span>
        //                 <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
        //                   Save
        //                 </Typography.Link>
        //                 <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
        //                   <a>Cancel</a>
        //                 </Popconfirm>
        //             </span>
        //         ) : (
        //             <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
        //                 Edit
        //             </Typography.Link>
        //         );
        //     },
        // },
    ];

    // const mergedColumns = columns.map((col) => {
    //     if (!col.editable) {
    //         return col;
    //     }
    //     return {
    //         ...col,
    //         onCell: (record: Item) => ({
    //             record,
    //             inputType: col.dataIndex === 'url' ? 'HTMLVideoElement' : 'text',
    //             dataIndex: col.dataIndex,
    //             title: col.title,
    //             // editing: isEditing(record),
    //         }),
    //     };
    // });

    const pageJump = (e:any) => {

        setPagination(e);
        console.log(e)
        // console.log(e.current)
        // console.log(e.pageSize)
        // console.log(e.pageSize)
        // axios.get(
        //     'http://localhost:3000/api/Crawler/GetVideoList'
        //     // ,
        //     // {
        //     //     params:{
        //     //         page:e.current,
        //     //         pageSize:e.pageSize
        //     //     }
        //     // }
        // ).then(value => {
        //     // crawlerList.push(...value.data);
        //     console.log(value.data)
        //
        //     // console.log(crawlerList)
        //     setCrawlerList(value.data);
        //     // console.log(crawlerList)
        // })


    }

    function test(){

        console.log(crawlerList[0].url)

    }

//flexGrow:1
    return (


        <Form form={form} component={false} className={styles.form}>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            <button onClick={test}>123</button>
            <Table className={styles.table}

                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={crawlerList}
                rowKey="id"
                columns={columns}
                rowClassName="editable-row"
                // pagination={{
                //     onChange: cancel,
                // }}
                // pagination={{current:1,pageSize:2,showSizeChanger:true,pageSizeOptions:["2","3"]}}
                pagination={pagination}
                onChange={pageJump}

                scroll={{ x: 1500, y: 300 }}

            />
        </Form>
    );
};


export default TableTest;