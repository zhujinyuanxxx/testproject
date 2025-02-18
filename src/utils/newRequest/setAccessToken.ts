import request from "./request";

export function setAccessToken(accessToken:string) {

    localStorage.removeItem('accessToken');

    localStorage.setItem('accessToken',accessToken);

}