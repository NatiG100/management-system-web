export default class ApiUtil{
    static getToken():string|undefined|null{
        return localStorage.getItem("auth-token")
    }
    static saveToken(token:string){
        localStorage.setItem("auth-token",token);
    }
    static revokeToken(){
        localStorage.removeItem("auth-token");
    }
}