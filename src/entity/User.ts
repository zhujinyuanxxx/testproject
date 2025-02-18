import request from "../utils/request";

class User {
    username: string | undefined;
    id: number | undefined;
    password:string | undefined;

    constructor(username:string,id:number,password:string) {
        this.username = username;
        this.id = id;
        this.password = password;
    }

    sayHello=()=>{
        console.log("hello 111");
    }
}
export default User;
