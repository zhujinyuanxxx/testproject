class RegisterInfo {
    username: string | undefined;
    // id: number | undefined;
    password:string | undefined;
    secondPassword:string | undefined;
    email:string | undefined;
    age:number | undefined;
    sex:string | undefined;
    telephone:string | undefined;

    constructor(
        username:string  | undefined,
        password:string | undefined,
        secondPassword:string | undefined,
        email:string | undefined,
        age:number | undefined,
        sex:string | undefined,
        telephone:string | undefined)
    {

        this.username = username;
        // this.id = id;
        this.password = password;
        this.secondPassword = secondPassword;
        this.email = email;
        this.age = age;
        this.sex = sex;
        this.telephone = telephone;

    }

}
export default RegisterInfo;