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

export const REGISTER_USER = `${USERS}/registerUser`;
export type REGISTER_USER = typeof REGISTER_USER;