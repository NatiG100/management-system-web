import { ApiConfig } from "@/interfaces/configInterface";
import axiosClient from "./client";
import ErrorRes from "./types/error";
import { Message } from "./types/message";
import { User } from "./user";
import ApiUtil from "./util";

export type LoginInput = {email:string,password:string}
export class Auth{
    constructor(private url:string){}
    async signIn(loginInput:LoginInput){
        return axiosClient.post<ErrorRes<any>,Message<{ access_token: string; user: User }>>(
            `${this.url}login`,
            loginInput
        )
    }
    async me(){
        return axiosClient.get<ErrorRes<any>,Message<Partial<User>>>(
            `${this.url}me`,
            {
                headers:{authorization:`Bearer ${ApiUtil.getToken()}`}
            }
        )
    }
}