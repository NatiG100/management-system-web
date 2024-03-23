import { ApiConfig } from "@/interfaces/configInterface";
import UserT from "./types/user";
import axiosClient from "./client";
import { Message } from "./types/message";

export type UserInput = Omit<UserT,'id'|'status'>
export class User{
    constructor(private url:string){}
    async register(userInput:UserInput){
        return axiosClient.post<Message<Omit<UserT,"password">>>(
            this.url,
            userInput
        );
    }
}