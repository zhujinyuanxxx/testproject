import React, {useEffect, useRef, useState} from 'react';

import styles from "../scss/Home/Dwonload.module.scss";

import {Button, Form, Input, InputNumber, message, Table, TableColumnsType, Upload, UploadProps} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import {RcFile} from "antd/lib/upload";
import request from "../utils/newRequest/request";
import ButtonComponent from "../components/ButtonComponent";


const DownloadView: React.FC = () => {

    const cloudDiskFiles:Item[] = new Array();

    const [form] = Form.useForm();

    const [cloudDiskFileList, setCloudDiskFileList] = useState(cloudDiskFiles);

    const [pagination,setPagination] = useState({current:1,pageSize:5,showSizeChanger:true,pageSizeOptions:["2","3","5"]})

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
            width: 50,
            // editable: true,
            key: 'id',
            fixed: 'left',
            render:(id:number)=>{
                return(
                    <div className={styles.itemsInTable}>{id}</div>
                )

            }
        },
        {
            title: 'fileName',
            dataIndex: 'fileName',
            width: 100,
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
            width: 150,
            // editable: true,
            key: 'fileSize',
            render:(fileSize:string)=>{
                return(
                    <div className={styles.itemsInTable}>{fileSize}</div>
                )

            }
        },
        {
            title: 'sender',
            dataIndex: 'sender',
            width: 150,
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
            width: 150,
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
            width: 150,
            // editable: true,
            key: 'time',
            render:(time:string)=>{
                return(
                    <div className={styles.itemsInTable}>{time}</div>
                )

            }
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

    //初始化加载数据
    function initData(){
        request.get(
            '/CloudDiskFile/getReceivedCloudDiskByUsername'
        ).then(value => {
            setCloudDiskFileList(value.data["result"])
        })
    }

    //初始化加载数据
    useEffect(()=>{
        initData();
    },[])

    //表格选框触发器
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed before: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        console.log('selectedRowKeys changed after: ', newSelectedRowKeys);
        console.log(selectedRowKeys[0])
    };

    //表格选框
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    //上传组件配置
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

            // customUpload(file, "Test2");
            if (inputValue!=null&& !(inputValue === "")) {
                try {
                    customUpload(file, inputValue);
                }catch (e) {
                    console.log(e)
                }
                // customUpload(file, "Test2");
                return false; // 阻止默认上传行为，因为我们已经自定义了上传方法
            } else {
                message.error('Please enter a receiver');
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

    function getProfile(){
        request.post(
            'http://localhost:3000/api/User/getUserProfile'
        ).then(value => {
            // console.log(value)
            console.log("getProfile"+value.data)



        })
    }

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);

        // console.log(selectedRowKeys)
    };

    async function download(){
        console.log("test")

        try {
            const response = await request.get(
                '/CloudDiskFile/Download', {
                    params: {
                        id: selectedRowKeys[0]
                    },
                    responseType: 'blob' // 确保响应类型为 Blob
                }
            )

            // 获取文件名
            const contentDisposition = response.headers['content-disposition'];

            console.log("00"+response.headers);

            console.log("11"+contentDisposition);

            const split = contentDisposition.split(';');

            console.log("22"+split);


            let filename = 'downloaded_file';
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);

                console.log("12"+filenameMatch);

                if (filenameMatch.length === 2) {
                    filename = filenameMatch[1];
                }
            }

            // 创建一个可以下载的 URL
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename.split(';')[0]; // 使用从响应头中获取的文件名
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl); // 清除blob URL

        }catch (error){
            console.error('Error during file download:', error);
        }
    }


    async function downloadBatch(){
        // selectedRowKeys
        const formData = new FormData();
        // @ts-ignore
        formData.append('fileList', selectedRowKeys);

        // selectedRowKeys.forEach(id => {
        //     formData.append('idList', id.toString());
        // });

        try {
            await request.post(
                '/CloudDiskFile/BatchDownload',selectedRowKeys,{
                    // headers: {
                    //     'Content-Type': 'multipart/form-data'
                    // },
                    // params:{
                    //     'idList': selectedRowKeys
                    // },
                    responseType: 'arraybuffer' // 设置响应类型为 arraybuffer
                }
            ).then(value => {
                console.log("9992:"+value.data, { depth: null });
                const blob = new Blob([value.data], { type: 'application/zip' });
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = 'files.zip';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);

                // // 创建一个可以下载的 URL
                // const downloadUrl = window.URL.createObjectURL(new Blob([value.data]));
                // const link = document.createElement('a');
                // link.href = downloadUrl;
                // // link.download = filename.split(';')[0]; // 使用从响应头中获取的文件名
                // link.download = 'files.zip';
                // document.body.appendChild(link);
                // link.click();
                // document.body.removeChild(link);
                // window.URL.revokeObjectURL(downloadUrl); // 清除blob URL
            })


        }catch (error){
            console.error('Error during file download:', error);
        }
    }

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



                <Form form={form} component={false} className={styles.form}>


                    {/*<button onClick={download}>download</button>*/}

                    {/*<button onClick={downloadBatch}>downloadBatch</button>*/}

                    <div className={styles.header}>
                        <ButtonComponent  name={"DOWNLOAD"} onclick={downloadBatch}/>
                    </div>


                    {/*<button onClick={getProfile}>getProfile</button>*/}

                    {/*<Button onClick={GetSession}>GetSession</Button>*/}

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

                        // scroll={{ x: 1500, y: 300 }}

                           rowSelection={rowSelection}

                           scroll={{ x: 500 }}
                    />
                </Form>


    );

};

export default DownloadView;