import { ApiConfig } from "@/interfaces/configInterface";
import axiosClient from "./client";
import ErrorRes from "./types/error";
import { Message } from "./types/message";
import { User } from "./user";

export type LoginInput = {email:string,password:string}
export class Auth{
    constructor(private url:string){}
    async signIn(loginInput:LoginInput){
        return axiosClient.post<ErrorRes<any>,Message<{ access_token: string; user: User }>>(
            `${this.url}login`,
            loginInput
        )
    }
}