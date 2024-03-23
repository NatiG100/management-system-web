import { ApiConfig } from "@/interfaces/configInterface";
import { Auth } from "./auth";
import { Department } from "./department";
import { User } from "./user";

export class OsmsApi{
    constructor(private apiConfig:ApiConfig){
    }
    auth = new Auth(this.apiConfig.baseUrl+'auth/');
    department = new Department(this.apiConfig.baseUrl+'department/');
    user = new User(this.apiConfig.baseUrl+'users/');
}