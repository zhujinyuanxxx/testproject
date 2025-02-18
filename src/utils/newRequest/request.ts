import axios from 'axios'
import { AxiosResponse  } from 'axios';
import {useNavigate} from "react-router-dom";
import {message} from "antd";
import {getAccessToken} from "./getAccessToken";
import {refreshToken} from "./refreshToken";
import {getRefreshToken} from "./getRefreshToken";
import {setAccessToken} from "./setAccessToken";
import {config} from "react-spring";
import {getNavigate} from "./navigation";



let isRefreshing:boolean=false;
let isRefreshingCount: number=0;


console.log("isRefreshing初始值为"+isRefreshing)

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

// const Ajax = createAxiosInstance();
//
// function createAxiosInstance() {
//     return axios.create({
//         baseURL: process.env.REACT_APP_API_URL,
//         timeout: 5000,
//         headers: {
//             Authorization: `Bearer ${getAccessToken()}`
//         }
//     })
// }


const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,  // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
    timeout: 5000,
    // headers: {
    //     Authorization :`Bearer ${getAccessToken()}`
    // },

})

console.log('Base URL is:', request.defaults.baseURL);

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(async config => {



    console.log("isRefreshing的值为"+isRefreshing)

    console.log("request的AccessToken为"+getAccessToken())

    if(isRefreshing&&isRefreshingCount!==1){

        console.log("进入刷新token")

        config.headers.Authorization = `Bearer ${getRefreshToken()}`;

        isRefreshing = false;

        isRefreshingCount = isRefreshingCount + 1;
    }else if(!isRefreshing){

        console.log("进入正常token")

        config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }else if(isRefreshing&&isRefreshingCount===1){

        console.log("进入login")

        const navigate = getNavigate();

        navigate('/')


    }

    return config;

}
, error => {
    console.log("无token");
    alert("无token")
    return Promise.reject(error)
}
);


// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(

    async (response) => {
        // console.log("isRefreshing起始状态时：" + isRefreshing);
        // let isRefreshing = false;

        let res = response;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }


        console.log("标记");
        console.log(res.data, { depth: null });
        console.log(res.data.Code, { depth: null });


        let accessToken:string|null = getAccessToken();

        if (accessToken != null) {

            console.log('accessToken是：' + accessToken);
            // accessToken = accessToken.replace(/\s/g, '');

            console.log('response结果是：' + JSON.stringify(response.config));

            if (res.data.Code === 401) {

                console.log("进入401");

                console.log("isRefreshing结果:"+isRefreshing, { depth: null });

                if (!isRefreshing) {

                    console.log("进入!isRefreshing");

                    isRefreshing = true;

                    //等待刷新access token
                    // await refreshToken();
                    // let refreshToken:string|null = getRefreshToken()?JSON.parse(getRefreshToken() || '{}'):null;
                    let refreshToken:string|null = getRefreshToken();

                    console.log("refreshToken为"+refreshToken, { depth: null });

                    // response.config.headers['Authorization'] = 'Bearer ' + refreshToken;

                    const refreshResult = await request.get('/User/GetAccessTokenByRefreshToken',{
                            // headers: {
                            //     // 'Authorization': 'Bearer ' + localStorage.getItem("token")
                            //     Authorization: `Bearer ${refreshToken}`
                            // },
                            // __isRefreshToken: true,
                        }
                    )

                    let s = refreshResult.data.result;
                    setAccessToken(s);



                    // isRefreshing = false;
                    //重新调用请求

                    console.log("重新调用请求")
                    response.config.headers.Authorization = `Bearer ${getAccessToken()}`;

                    const resp = request.request(response.config);

                    return resp;


                } else {

                    console.log("进入else");

                    return new Promise<string>((resolve, reject) => {
                        requestsQueue.push({resolve, reject});
                    }).then((token) => {
                        response.config.headers['Authorization'] = `Bearer ${token}`;
                        return request(response.config);
                    }).catch((err) => {
                        return Promise.reject(err);
                    }).finally(()=>{
                        isRefreshing = false;
                    });
                }
            }

        }

        console.log("isRefreshing结束状态时：" + isRefreshing);
        // console.log("最终结果是：" + JSON.stringify(res));
        // return res;
        // console.log(response.data, { depth: null });

        return response;
    }
)



export default request

