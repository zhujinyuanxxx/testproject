import React, {useState} from 'react';
import { Button, Checkbox, Form, Input} from 'antd';
import styles from '../../scss/login/login.module.scss'

import axios from "axios";

import User from "../../entity/User";
import {useNavigate} from "react-router-dom";



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

var imageUrl:string = "t2.png";

// var verifyCodeUrl:string = "";

function dataURLtoFile(dataurl: string, filename: string): any {
    // 获取到base64编码
    const arr = dataurl.split(',');
    // 将base64编码转为字符串
    const bstr = window.atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n); // 创建初始化为0的，包含length个元素的无符号整型数组
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: 'image/jpeg',
    });
}






const Login: React.FC = () => {

    const navigateTo = useNavigate();

    let user: { password: number; id: number; username: string } = {
        id:1,
        username:'null',
        password:1

    }

    // class person {
    //     username: string | undefined;
    //     id: number | undefined;
    //     password:string | undefined;
    //
    //     constructor(username:string,id:number,password:string) {
    //         this.username = username;
    //         this.id = id;
    //         this.password = password;
    //     }
    //
    //     sayHello=()=>{
    //         console.log("hello 111");
    //     }
    // }



    var [verifyCodeUrl, setVerifyCode] = useState('http://localhost:3000/api/Test/VerifyCode');

    var [username, setUsername]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState('');

    var [password, setPassword]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState('');

    function getVerifyCode():void{

        // axios.defaults.baseURL = 'http://localhost:3000/api'
        axios.get(
            'http://localhost:3000/api/Test/VerifyCode'
        ).then(value => {
            console.log(value)
            console.log(value.data)
            setVerifyCode(verifyCodeUrl+'?'+Math.random());

            if(verifyCodeUrl.includes('?')){
                setVerifyCode(verifyCodeUrl.split('?')[0]);
            }

            // localStorage.setItem("token",JSON.stringify(token.value));
        })
    }

    function add( a:number, b:number){
        let sum: number = a + b;

        sum = sum +1;

        console.log(sum)
        return sum;

    }

    var personList:User[] = new Array();

    var userList = [];

    var user1:User = new User('',-1,'');

    function loginToHomePage(){
        navigateTo("/home");
    }

    function login():void{

        user1.username=username;
        user1.password=password;
        console.log(user1);


        // axios.defaults.baseURL = 'http://localhost:3000/api'
        axios.post(
            'http://localhost:3000/api/User/Login',user1
        ).then(value => {
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



            // personList.push(...value.data);
            // console.log("-----------------")
            // console.log(personList);
            // personList.forEach(u=>console.log(u.password))



            // setVerifyCode(verifyCodeUrl+'?'+Math.random());
            //
            // if(verifyCodeUrl.includes('?')){
            //     setVerifyCode(verifyCodeUrl.split('?')[0]);
            // }

            // localStorage.setItem("token",JSON.stringify(token.value));
        })
    }

//     axios.post
//       ('http://localhost:8080/project/LoginUser/login'
//       ,user,
//       {
//         params:{

//             captcha:code.value,
//             type:loginType.value
//         }
//       }
//       ).then(response =>{

    return (

        // <div className={stylestest.dmain}>
        //     <div className={stylestest.d1}></div>
        //     <div className={stylestest.d2}></div>
        //     <div className={stylestest.d3}></div>
        //
        // </div>


        <div className={styles.loginPage}>


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
                    {/*<Image*/}
                    {/*    src={verifyCodeUrl}*/}
                    {/*    onClick={getVerifyCode}*/}
                    {/*/>*/}

                    <div className={styles.verifyCodeAndInput}>
                        <Input className={styles.verifyCodeInput} placeholder="Please input verifyCode" style={{  }}/>
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

                        {/*<Button type="primary" onClick={(e: React.MouseEvent<HTMLElement>)=>add(1,2)}>*/}
                        {/*    111111*/}
                        {/*</Button>*/}

                        {/*<Button type="primary" onClick={loginTest}>*/}
                        {/*    loginTest*/}
                        {/*</Button>*/}
                    </div>
                    {/*<div>*/}

                    {/*    <Button type="primary" onClick={(e: React.MouseEvent<HTMLElement>)=>add(1,2)}>*/}
                    {/*        111111*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                    {/*<Button type="primary">*/}
                    {/*    test*/}
                    {/*</Button>*/}
                </Form.Item>
                {/*<div className={styles.test} style={{}}></div>*/}


            </Form>



        </div>
        </div>
    )
};

export default Login;
