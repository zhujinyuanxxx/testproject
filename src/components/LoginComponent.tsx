import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import User from "../entity/User";
import styles from "./scss/LoginComponent.module.scss";
import {Button, Checkbox, Form, Input} from "antd";
import requestWithoutToken from "../utils/requestWithoutToken";


// 定义 Bunny 组件
const LoginComponent: React.FC = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        username?: string;
        password?: string;
        validateCode?: string;
        remember?: string;
    };

    const navigateTo = useNavigate();

    var [verifyCodeUrl, setVerifyCodeUrl] = useState(process.env.REACT_APP_API_URL+'/Test/VerifyCode');

    const [verifyCodeUrlTimer, setVerifyCodeUrlTimer] = useState(0);

    const [verifyCodeUrlRefreshTimes, setVerifyCodeUrlRefreshTimes] = useState(0);

    var [username, setUsername]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState('');

    var [password, setPassword]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState('');

    var [verifyCodeInput, setVerifyCodeInput]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState('');

    // The verification code timer prevents multiple refresh of the verification code
    useEffect(() => {
        if (verifyCodeUrlTimer > 0) {
            const countdown = setInterval(() => {
                setVerifyCodeUrlTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [verifyCodeUrlTimer]);

    function getVerifyCode():void{

        if (verifyCodeUrlTimer === 0 || verifyCodeUrlRefreshTimes < 3) { // axios.defaults.baseURL = 'http://localhost:3000/api'
            requestWithoutToken.get(
                '/Test/VerifyCode'
            ).then(value => {
                console.log(value)
                console.log(value.data)
                setVerifyCodeUrl(verifyCodeUrl + '?' + Math.random());

                setVerifyCodeUrlRefreshTimes(verifyCodeUrlRefreshTimes + 1);

                setVerifyCodeUrlTimer(5); // Set the countdown to 10 seconds

                if (verifyCodeUrl.includes('?')) {
                    setVerifyCodeUrl(verifyCodeUrl.split('?')[0]);
                }

                // localStorage.setItem("token",JSON.stringify(token.value));
            })
        }else{
            alert(`Please wait ${verifyCodeUrlTimer} second and try again`);
        }

    }

    var user1:User = new User('',-1,'');

    function loginToHomePage(){
        navigateTo("/home");
    }

    function login():void{

        user1.username=username;
        user1.password=password;
        console.log(user1);

        // axios.defaults.baseURL = 'http://localhost:3000/api'
        requestWithoutToken.post(
            '/User/Login',user1, {
                params: {
                    verifyCodeInput: verifyCodeInput
                }
            }).then(value => {
            console.log(value)
            // console.log(value.data)
            // console.log(value.data.code)
            // console.log(value.data.result)
            // console.log(value.data.result.token)

            if(value.data.code === 200){
                console.log("login successful")
                //localStorage添加accessToken
                // localStorage.setItem("accessToken",JSON.stringify(value.data.result.accessToken));
                localStorage.setItem("accessToken",value.data.result.accessToken);
                console.log(`Type of ${value.data.result.accessToken} is ${typeof value.data.result.accessToken}`);

                // localStorage添加refreshToken
                // localStorage.setItem("refreshToken",JSON.stringify(value.data.result.refreshToken));
                localStorage.setItem("refreshToken",value.data.result.refreshToken);
                console.log(`Type of ${value.data.result.refreshToken} is ${typeof value.data.result.refreshToken}`);

                alert("login successful")
                loginToHomePage();
            }else{
                alert("login failed");
            }
        })
    }

    return (

        // <div className={styles.loginPage}>


            <div className={styles.main}>

                {/*<div>{verifyCodeUrl}</div>*/}
                <Form
                    name="basic"
                    // labelCol={{span: 500}}
                    // wrapperCol={{span: 24}}
                    // style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className={styles.login}
                >
                    <Form.Item<FieldType>
                        // className={styles.input}
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                        className={styles.formElement}
                    >
                        <Input id={"username"} value={username} className={styles.input} onChange={e => {
                            setUsername(e.target.value)
                        }}/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        // className={styles.input}
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                        className={styles.formElement}
                    >
                        <Input.Password className={styles.input} placeholder="Please input Password" value={password} onChange={e => {
                            setPassword(e.target.value)}}/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        // className={styles.input}
                        name="remember"
                        valuePropName="checked"
                        // wrapperCol={{offset: 6, span: 12}}
                        className={styles.formElement}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item<FieldType>

                        label="validateCode"
                        name="validateCode"
                        rules={[{required: true, message: 'Please input validateCode!'}]}
                        className={styles.formElement}
                    >
                        <div className={styles.verifyCodeAndInput}>
                            <Input className={styles.verifyCodeInput} placeholder="Please input verifyCode" style={{  }} value={verifyCodeInput} onChange={e => {
                                setVerifyCodeInput(e.target.value)
                            }}/>
                            <img className={styles.verifyCode} src={verifyCodeUrl} style={{}} onClick={(event: React.MouseEvent<HTMLImageElement>)=> getVerifyCode()}/>
                        </div>

                    </Form.Item>

                    <Form.Item
                        // wrapperCol={{offset: 8, span: 8}}
                        className={styles.formElement}
                    >
                        <div className={styles.loginBox}>
                            <Button className={styles.loginButton} type="primary" htmlType="submit" onClick={login}>
                                LOGIN
                            </Button>
                        </div>

                    </Form.Item>

                </Form>

            </div>
        // </div>
    )

};

export default LoginComponent;