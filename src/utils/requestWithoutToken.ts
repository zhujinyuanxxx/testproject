import axios from 'axios'
import { AxiosResponse  } from 'axios';
import {useNavigate} from "react-router-dom";



const requestWithoutToken = axios.create({
    baseURL: process.env.REACT_APP_API_URL,  // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
    timeout: 5000
})

console.log('Base URL is:', requestWithoutToken.defaults.baseURL);

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
// request.interceptors.request.use(config => {
//     config.headers['Content-Type'] = 'application/json;charset=utf-8';
//
//
//     let token:string|null = localStorage.getItem("token")?JSON.parse(localStorage.getItem("token") || '{}'):null;
//     if(token){
//         config.headers['Authorization']="Bearer "+token;
//     }
//
//
//     config.headers['Authorization'] = "Bearer "+token;  // 设置请求头
//
//     return config
// }, error => {
//     console.log("无token");
//     alert("无token")
//     return Promise.reject(error)
// });

// response 拦截器
// 可以在接口响应后统一处理结果
requestWithoutToken.interceptors.response.use(
    (response: AxiosResponse) =>   {
        // const navigateTo = useNavigate();

        let res = response;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }

        return res;
    }
)


export default requestWithoutToken

