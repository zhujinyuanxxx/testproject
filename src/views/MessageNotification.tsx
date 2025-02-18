import React, { useEffect, useState, ChangeEvent } from 'react';
import {HttpTransportType, HubConnection, HubConnectionBuilder, IHttpConnectionOptions} from '@microsoft/signalr';
import {getAccessToken} from "../utils/newRequest/getAccessToken";
import request from "../utils/newRequest/request";
import {NotificationPlacement} from "antd/es/notification/interface";
import {notification} from "antd";


interface IMessage {
    user: string;
    message: string;
    private?: boolean;
}

const VisionHubComponent: React.FC = () => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [roomName, setRoomName] = useState<string>('');
    const [messageContent, setMessageContent] = useState<string>('');
    const [recipientUserId, setRecipientUserId] = useState<string>('');

    const [userId, setUserId] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const [receivedMessagesCount, setReceivedMessagesCount] = useState<number>(0);

    const [messagesInfo, setMessagesInfo] = useState('');

    const [api, contextHolder] = notification.useNotification();

    let openNotification = (placement: NotificationPlacement) => {
        api.info({
            message: "收到新的文件",
            // 直接使用字符串替代了Context.Consumer
            placement,
        });
    };

    function getProfile(){
        request.post(
            '/User/getUserProfile'
        ).then(value => {
            // console.log(value)
            console.log("getProfile"+value.data)

            console.log("id11111"+value.data.result["id"])
            setUserId(value.data.result["id"].toString())
            setUsername(value.data.result["username"].toString())

            console.log("userId是"+userId)

            console.log(value.data, { depth: null });

        })
    }

    function consoleUserId(){
        console.log("userId是"+userId)
    }

    useEffect(() => {

        getProfile();

    }, []);

    // 创建自定义的 HttpClient 类，用于添加自定义的请求头和 SSL 证书验证
    class CustomHttpClient {
        public send(request: Request): Promise<Response> {
            // 添加自定义请求头
            request.headers.set("customHeader", "value");
            return fetch(request);
        }

        // 自定义 SSL 证书验证回调
        public validateCertificate(certificate: ArrayBuffer, chain: any): boolean {
            // 始终返回 true，表示验证通过
            return true;
        }
    }

    useEffect(() => {
        // 创建与服务器的连接
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44392/chathub',
            // .withUrl('https://120.76.97.191:44392/chathub',
            // .withUrl('http://localhost:3000/api/chathub',
            // .withUrl('http://localhost:3000/api/chathub',
                {
                    // skipNegotiation: true, // 跳过协商阶段
                    // transport: HttpTransportType.WebSockets, // 使用 WebSockets 传输
                    accessTokenFactory: () =>`${getAccessToken()}`, // 使用getToken函数提供token
                    // skipNegotiation: true, // 跳过协商阶段
                    // transport: HttpTransportType.WebSockets, // 使用 WebSockets 传输
                }

            )
            .build();

        // 构建 SignalR 连接
        // const hubConnection = new HubConnectionBuilder()
        //     .withUrl("https://localhost:443/MiniLyokoHub", {
        //         httpClient: new CustomHttpClient(),
        //         skipNegotiation: true, // 跳过协商阶段
        //         transport: HttpTransportType.WebSockets, // 使用 WebSockets 传输
        //         options: {
        //             // 添加自定义 SSL 证书验证回调
        //             clientCertificates: [
        //                 // 这里添加你的 SSL 证书
        //             ],
        //             // 设置 SSL 证书验证回调
        //             clientCertificateValidationCallback: (certificate, chain, sslPolicyErrors) => {
        //                 return new CustomHttpClient().validateCertificate(certificate, chain);
        //             }
        //         }
        //     } as IHttpConnectionOptions)
        //     .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            // 开始连接
            connection.start()
                .then(() => {
                    console.log('Connected!');

                    // 监听服务器发送的消息
                    connection.on('ReceiveMessage', (user: string, message: string) => {
                        console.log(`Message from ${user}: ${message}`);
                        setMessages(prevMessages => [...prevMessages, { user, message }]);

                        // 更新接收消息的计数器
                        setReceivedMessagesCount(prevCount => prevCount + 1);
                    });

                    connection.on('ReceivePrivateMessage', (user: string, message: string) => {
                        console.log(`Private message from ${user}: ${message}`);
                        setMessages(prevMessages => [...prevMessages, { user, message, private: true }]);

                        // 更新接收消息的计数器
                        setReceivedMessagesCount(prevCount => prevCount + 1);

                        // setMessagesInfo(`收到来自${user}的私信${receivedMessagesCount}`);

                        openNotification('bottomRight');

                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    useEffect(() => {
        if (messagesInfo) {
            openNotification('bottomRight');
        }
        setMessagesInfo('');
    }, [messagesInfo]); // 当messagesInfo改变时，重新执行回调


    const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomName(event.target.value);
    };

    const handleMessageContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessageContent(event.target.value);
    };

    const handleRecipientUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRecipientUserId(event.target.value);
    };

    const joinRoom = async (): Promise<void> => {
        if (connection) await connection.invoke('JoinRoom', roomName);
    };

    const leaveRoom = async (): Promise<void> => {
        if (connection) await connection.invoke('LeaveRoom', roomName);
    };

    const sendMessage = async (): Promise<void> => {
        if (connection){
            await connection.invoke('SendMessage', username, messageContent, recipientUserId);

            // 添加以下代码来更新消息数组
            setMessages(prevMessages => [...prevMessages, { user: username, message: messageContent }]);
        }

    };

    // UI部分：显示消息和输入框
    const renderMessages = (): JSX.Element[] => {
        return messages.map((msg, index) => (
            <div key={index}>
                <strong>{msg.user}:</strong> {msg.message} {msg.private && <em>(私密)</em>}
            </div>
        ));
    };

    return (
        <div>
            <h2>接收消息数量: {receivedMessagesCount}</h2>


                {contextHolder}


            <input type="text" value={roomName} onChange={handleRoomNameChange} placeholder="房间名" />
            <button onClick={joinRoom}>加入房间</button>
            <button onClick={leaveRoom}>离开房间</button>
            <input type="text" value={messageContent} onChange={handleMessageContentChange} placeholder="消息内容" />
            <input type="text" value={recipientUserId} onChange={handleRecipientUserIdChange} placeholder="接收者用户ID" />
            <button onClick={sendMessage}>向个人发送消息</button>
            {/*<button onClick={SendMessageToRoom}>向房间发送消息</button>*/}
            <button onClick={consoleUserId}>11111</button>
            <div>
                <h2>消息:</h2>
                {renderMessages()}
            </div>
        </div>
    );
};

export default VisionHubComponent;







