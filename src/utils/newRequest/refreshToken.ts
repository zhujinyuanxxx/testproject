
import {message} from "antd";
import axios from "axios/index";
import {getRefreshToken} from "./getRefreshToken";
import request from "./request";
import {setRefreshToken} from "./setRefreshToken";
import {setAccessToken} from "./setAccessToken";
import {getAccessToken} from "./getAccessToken"

let promise:any = null;

export async function refreshToken() {

    // let refreshToken:string|null = getRefreshToken()?JSON.parse(getRefreshToken() || '{}'):null;
    if(promise){
        return promise;
    }

    promise = new Promise(async (resolve, reject) => {
        let refreshToken:string|null = getRefreshToken();
        await request.get('/User/GetAccessTokenByRefreshToken',{
                headers: {
                    // 'Authorization': 'Bearer ' + localStorage.getItem("token")
                    Authorization: `Bearer ${refreshToken}`
                },
                // __isRefreshToken: true,
            }
        ).then(value => {

            console.log(value.data.result)

            if(value.data.code === 200){

                console.log("accessToken重设"+JSON.parse(value.data.result));
                setAccessToken(value.data.result);
                console.log("accessToken重设后"+getAccessToken());
            }


        })

        resolve(true);
    });

    promise.finally(() => {

        promise = null;

    })

    return promise;

    // let refreshToken:string|null = getRefreshToken();
    // await request.get('/User/GetAccessTokenByRefreshToken',{
    //     headers: {
    //         // 'Authorization': 'Bearer ' + localStorage.getItem("token")
    //         Authorization: `Bearer ${refreshToken}`
    //     },
    //     // __isRefreshToken: true,
    //   }
    // ).then(value => {
    //
    //     console.log(value.data.result)
    //
    //     if(value.data.code === 200){
    //
    //         console.log("accessToken重设"+JSON.parse(value.data.result));
    //         setAccessToken(value.data.result);
    //         console.log("accessToken重设后"+getAccessToken());
    //     }
    //
    //
    // })


}