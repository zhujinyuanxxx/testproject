export function getAccessToken() {

    // let accessToken:string|null = getAccessToken()?JSON.parse(getAccessToken() || '{}'):null;

    // let accessToken:string|null = localStorage.getItem("accessToken")?JSON.parse(localStorage.getItem("accessToken") || '{}'):null;

    return localStorage.getItem("accessToken");

}