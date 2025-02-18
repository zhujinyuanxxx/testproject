import request from "./request";

export async function setRefreshToken(refreshToken:string) {

    localStorage.removeItem('refreshToken');

    localStorage.setItem('refreshToken',refreshToken);

}