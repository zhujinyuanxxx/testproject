import React, {useEffect, useState} from "react";
import styles from "./scss/RegisterComponent.module.scss";
import {Button, Checkbox, Form, Input, Radio, RadioChangeEvent} from "antd";
import requestWithoutToken from "../utils/requestWithoutToken";
import RegisterInfo from "../entity/RegisterInfo";


const RegisterComponent: React.FC = () => {

    // Register Form Items Types
    type FieldType = {
        username?: string;
        password?: string;
        secondPassword?: string;
        email?: string;
        age?: number;
        sex?: string;
        telephone?: string;
        remember?: string;
        validateCode?: string;
    };

    //
    let registerInfo: RegisterInfo = new RegisterInfo('', '', '','', 0, '', '');

    // Define Register Form Items
    var [username, setUsername]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState('');
    var [password, setPassword]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState('');
    var [secondPassword, setSecondPassword]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState('');
    var [email, setEmail]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState('');
    var [age, setAge]: [number, ((value: (((prevState: number) => number) | number)) => void)] = useState(0);
    var [sex, setSex]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState('');
    var [telephone, setTelephone]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState('');
    var [verifyCodeInput, setVerifyCodeInput]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState('');


    // define VerifyCodeUrl from backend
    var [verifyCodeUrl, setVerifyCodeUrl] = useState(process.env.REACT_APP_API_URL+'/Test/RegisterVerifyCode');


    // The verification code timer prevents multiple refresh of the verification code
    const [verifyCodeUrlTimer, setVerifyCodeUrlTimer] = useState(0);
    // define Times for preventing of refreshing verifyCode too many times
    const [verifyCodeUrlRefreshTimes, setVerifyCodeUrlRefreshTimes] = useState(0);
    // The verification code timer prevents multiple refresh of the verification code
    useEffect(() => {
        if (verifyCodeUrlTimer > 0) {
            const countdown = setInterval(() => {
                setVerifyCodeUrlTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [verifyCodeUrlTimer]);


    const onSexFormItemChange = (e: RadioChangeEvent) =>{
        console.log('radio checked', e.target.value);
        setSex(e.target.value);
    }


    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    function register():void{

        registerInfo.username = username;
        registerInfo.password = password;
        registerInfo.secondPassword = secondPassword;
        registerInfo.sex = sex;
        registerInfo.email = email;
        registerInfo.age = age;
        console.log(registerInfo);

        // axios.defaults.baseURL = 'http://localhost:3000/api'
        requestWithoutToken.post(
            '/User/Register',registerInfo, {
                params: {
                    verifyCodeInput: verifyCodeInput
                }
            }).then(value => {
            console.log(value)

            if(value.data.code === 200){

                alert("register successful")
                console.log("register successfully")

            }else{
                alert("register failed");
            }
        })


    }


    // VerifyCodeUrl from backend
    function getVerifyCode():void{

        if (verifyCodeUrlTimer === 0 || verifyCodeUrlRefreshTimes < 3) { // axios.defaults.baseURL = 'http://localhost:3000/api'
            requestWithoutToken.get(
                '/Test/RegisterVerifyCode'
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



    return (

        <div className={styles.main}>

            <Form
                name="Register"
                initialValues={{remember: false}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                // className={styles.login}

            >
                {/*1.Username*/}
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[
                        {required: true, message: 'Please input your username!'},
                        {
                            pattern: /^[a-zA-Z0-9]{1,8}$/,
                            message: 'Username must be 1-8 characters long and cannot contain special symbols!',
                        }
                    ]}
                    className={styles.formElement}
                >
                    <Input id={"username"} value={username} className={styles.input} onChange={e => {
                        setUsername(e.target.value)
                    }}/>
                </Form.Item>


                {/*2.Password*/}
                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[
                        {required: true, message: 'Please input your password!'},
                        {
                            pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{1,16}$/,
                            message: 'Password must contain at least one uppercase letter, one special symbol, and be no more than 16 characters long!',
                        },
                    ]}
                    className={styles.formElement}
                >
                    <Input.Password className={styles.input} placeholder="Please input Password" value={password} onChange={e => {
                        setPassword(e.target.value)}}/>
                </Form.Item>


                {/*3.SecondPassword*/}
                <Form.Item<FieldType>
                    label="SecondPassword"
                    name="secondPassword"
                    rules={
                        [
                            {required: true, message: 'Please input your secondPassword!'},
                            {
                                pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{1,16}$/,
                                message: 'Password must contain at least one uppercase letter, one special symbol, and be no more than 16 characters long!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]
                    }
                    className={styles.formElement}
                >
                    <Input.Password className={styles.input} placeholder="Please input your secondPassword" value={secondPassword} onChange={e => {
                        setSecondPassword(e.target.value)}}/>
                </Form.Item>

                {/*4.Email*/}
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        {
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Please input a valid email address!',
                        },
                    ]}
                    className={styles.formElement}
                >
                    <Input className={styles.input} placeholder="Please input your Email" value={email} onChange={e => {
                        setEmail(e.target.value)}}/>
                </Form.Item>

                {/*/!*4.EmailValidateCode*!/*/}
                {/*<Form.Item<FieldType>*/}
                {/*    label="Email"*/}
                {/*    name="email"*/}
                {/*    rules={[*/}
                {/*        { required: true, message: 'Please input your Email!' },*/}
                {/*        {*/}
                {/*            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,*/}
                {/*            message: 'Please input a valid email address!',*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*    className={styles.formElement}*/}
                {/*>*/}
                {/*    <Input className={styles.input} placeholder="Please input your Email" value={email} onChange={e => {*/}
                {/*        setEmail(e.target.value)}}/>*/}
                {/*</Form.Item>*/}


                {/*5.Age*/}
                <Form.Item<FieldType>
                    label="Age"
                    name="age"
                    rules=
                        {[
                            {required: true, message: 'Please input your age!'},
                            {validator: (_, value) => {
                                if(value!==undefined && value!=null && value>=0 && value<=200){
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Age must be a positive number less than 200!'))

                            }}
                        ]}
                    className={styles.formElement}
                >
                    <Input
                        className={styles.input}
                        placeholder="Please input your age" value={age}
                        onChange={e => setAge(parseInt(e.target.value, 10))}
                    />
                </Form.Item>


                {/*6.Sex*/}
                <Form.Item<FieldType>
                    label="Sex"
                    name="sex"
                    rules={[{required: true, message: 'Please input your secondPassword!'}]}
                    className={styles.formElement}
                >
                    <Radio.Group onChange={onSexFormItemChange} value={sex}>
                        <Radio value={"male"}>male</Radio>
                        <Radio value={"female"}>female</Radio>
                        <Radio value={"secret"}>secret</Radio>
                    </Radio.Group>
                </Form.Item>


                {/*7.Telephone*/}
                <Form.Item<FieldType>
                    label="Telephone"
                    name="telephone"
                    rules={[{required: true, message: 'Please input telephone!'}]}
                    className={styles.formElement}
                >
                    <Input
                        className={styles.input}
                        placeholder="Please input your telephone" value={age}
                        onChange={e => setTelephone(e.target.value)}
                    />

                </Form.Item>


                {/*8.ValidateCode*/}
                <Form.Item<FieldType>
                    label="ValidateCode"
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





                {/*valuePropName="checked"*/}
                {/*5.Remember checkBox*/}
                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    rules={[ { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Please check this box!')), }, ]}
                    className={styles.formElement}
                >
                    {/*<Checkbox checked={checked} onChange={handleCheckboxChange}>*/}
                    {/*    Remember*/}
                    {/*</Checkbox>*/}
                    <Checkbox>
                        Remember
                    </Checkbox>
                </Form.Item>


                {/*<Checkbox checked={checked} onChange={handleCheckboxChange}>*/}
                {/*    Remember*/}
                {/*</Checkbox>*/}

                {/*6.Register Button*/}
                <Form.Item
                    // wrapperCol={{offset: 8, span: 8}}
                    className={styles.formElement}
                >
                    <div className={styles.loginBox}>
                        <Button className={styles.loginButton} type="primary" htmlType="submit" onClick={register}>
                            REGISTER
                        </Button>
                    </div>

                </Form.Item>

            </Form>

        </div>


    )


}


export default RegisterComponent;