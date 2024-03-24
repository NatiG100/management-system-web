import UserT from "@/api/types/user"

export type IUserState = {
    data:UserT|null;
    isLoading:boolean;
    errors:string;
}

export type UsersStateType={
    user:IUserState;
}

export const USERS = 'users';
export type USERS=typeof USERS;

export const REGISTER_USER = `${USERS}/registerUserAction`;
export const LOGIN_USER = `${USERS}/loginUserAction`;
export const ME_USER = `${USERS}/meUserAction`;
export type REGISTER_USER = typeof REGISTER_USER;
export type LOGIN_USER = typeof LOGIN_USER;
export type ME_USER = typeof ME_USER;