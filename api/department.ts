import { headers } from "next/headers";
import axiosClient from "./client";
import DepartmentT from "./types/department";
import ErrorRes from "./types/error";
import { Message } from "./types/message";
import ApiUtil from "./util";

export type DepartmentInput = Omit<DepartmentT, 'id'|'createdAt'|'updatedAt'|'creator'|'creatorId'|'relationsAsAChild'>&{parentId?:string};

export class Department{
    constructor(private url:string){}
    async create(departmentInfo:DepartmentInput){
        return axiosClient.post<ErrorRes<any>,Message<DepartmentT>>(
            this.url,
            departmentInfo,
            {
                headers:{authorization:`Bearer ${ApiUtil.getToken()}`}
            }
        );
    }
    async fetchMany(){
        return axiosClient.get<ErrorRes<any>,Message<DepartmentT>[]>(
            this.url,
        );
    }
    async fetch(id:string){
        return axiosClient.get<ErrorRes<any>,Message<DepartmentT>>(
            this.url+id,
        );
    }
    async update(id:string,updateInput:Partial<DepartmentInput>){
        return axiosClient.patch<ErrorRes<any>,Message<DepartmentT>>(
            this.url+id,
            updateInput
        );
    }
    async remove(id:string){
        return axiosClient.delete<ErrorRes<any>,Message<undefined>>(
            this.url+id
        );
    }
}