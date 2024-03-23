import { ApiConfig } from "@/interfaces/configInterface";
import UserT from "./types/user";
import axiosClient from "./client";

type UserInput = Omit<UserT,'id'|'status'>
export class User{
    constructor(private url:string){}
    async register(userInput:UserInput){
        return axiosClient.post(
            this.url,
            userInput
        );
    }
}