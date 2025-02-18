import axios from 'axios'
import { AxiosResponse  } from 'axios';
import {useNavigate} from "react-router-dom";
import {message} from "antd";

interface Token {
    token: string;
}

let isRefreshing = false;
let requestsQueue: Array<{ resolve: (token: string) => void; reject: (error: any) => void }> = [];

const processQueue = (error: any, token: string | null = null): void => {
    requestsQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    requestsQueue = [];
};

// function refreshToken(cleanedToken: string ): Promise<AxiosResponse<Token>> {
//     // 刷新token的实现
//     return axios.get(
//         'http://localhost:3000/api/User/getDoubleTokenByLoggedToken',
//         {
//             params:{
//                 loggedToken:cleanedToken
//             }
//         }
//     );
// }


const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,  // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
    timeout: 5000
})

console.log('Base URL is:', request.defaults.baseURL);

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {

    // config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // config.headers['Content-Type'] = 'multipart/form-data';

    // let user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null;
    // if(user){
    //     config.headers['token']=user.token;
    // }
    // config.headers['token'] = user.token;  // 设置请求头

    let token:string|null = localStorage.getItem("token")?JSON.parse(localStorage.getItem("token") || '{}'):null;
    if(token){
        config.headers['Authorization']="Bearer "+token;
    }

    // axios.post(
    //     'http://localhost:3000/api/User/Login',
    // ).then(value => {
    //
    //
    // })


    config.headers['Authorization'] = "Bearer "+token;  // 设置请求头

    return config
}, error => {
    console.log("无token");
    alert("无token")
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    (response: AxiosResponse) =>   {
        console.log("isRefreshing起始状态时："+isRefreshing);
        // const navigateTo = useNavigate();

        let res = response;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }

        let resJsonObject = JSON.parse(JSON.stringify(res.data, null, 2));
        console.log('结果是：'+JSON.stringify(res.data, null, 2));
        console.log('Code是：'+resJsonObject.Code);
        let loggedToken:string = localStorage.getItem("token")?JSON.parse(localStorage.getItem("token") || '{}'):null;
        console.log('loggedToken是：'+loggedToken);
        let cleanedToken = loggedToken.replace(/\s/g, '');

        console.log('response结果是：'+JSON.stringify(response.config));
        // if(resJsonObject.Code == '401'){
        //
        //     console.log("123")
        //
        //     axios.get(
        //         'http://localhost:3000/api/User/getDoubleTokenByLoggedToken',
        //         {
        //             params:{
        //                 loggedToken:cleanedToken
        //             }
        //         }
        //     ).then(value => {
        //         console.log(value)
        //         console.log(value.data)
        //         console.log(value.data.result)
        //         console.log(value.data.result.token)
        //         localStorage.setItem("token",JSON.stringify(value.data.result.token));
        //
        //     })
        //
        // }
        if(resJsonObject.Code == '401') {

            const originalRequest = response.config;

            if (!isRefreshing) {
                isRefreshing = true;
                axios.get(
                    'http://localhost:3000/api/User/getDoubleTokenByLoggedToken',
                    {
                        params: {
                            loggedToken: cleanedToken
                        }
                    }
                ).then(value => {
                    // console.log(value)
                    // console.log(value.data)
                    // console.log(value.data.result)
                    console.log(value.data.result.token)
                    localStorage.setItem("token", JSON.stringify(value.data.result.token));

                    message.success("重新登录成功");

                    processQueue(null, value.data.result.token);

                    // return axios(response.config);

                    // return Promise.resolve(value.data.result.token);

                    console.log("重新调用函数"+axios(response.config));
                    return axios(response.config);

                }).catch((err) => {

                    processQueue(err);
                    //移除错误的token
                    localStorage.removeItem("token");
                    //错误则跳转至登录页面
                    // navigateTo("/login");


                    return Promise.reject(err);

                }).finally(() => {

                    console.log("finally:111111111")

                    isRefreshing = false;
                });
            } else {
                return new Promise<string>((resolve, reject) => {
                    requestsQueue.push({resolve, reject});
                }).then((token) => {
                    response.config.headers['Authorization'] = `Bearer ${token}`;
                    return axios(response.config);
                }).catch((err) => {
                    return Promise.reject(err);
                });
            }
        }
        // else{
        //     return axios(response.config);
        // }
        // 兼容服务端返回的字符串数据
        // if (typeof res === 'string') {
        // if (typeof res === 'string') {
        //     res = res ? JSON.parse(res) : res
        // }


        console.log("isRefreshing结束状态时："+isRefreshing);
        console.log("最终结果是："+JSON.stringify(res));
        return res;
    }
    // ,
    // error => {
    //     console.log('err' + error) // for debug
    //     return Promise.reject(error)
    // }
)


export default request

