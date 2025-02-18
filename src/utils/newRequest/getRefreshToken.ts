import request from "./request";

export function getRefreshToken() {

    return localStorage.getItem("refreshToken");

}