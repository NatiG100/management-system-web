import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { USERS, UsersStateType } from "./types";
import { LoginInput } from "@/api/auth";
import UserT from "@/api/types/user";
import { UserInput } from "@/api/user";
import osmsApi from "@/osmsApi";

const initialUserState:UsersStateType = {
    user:{
        data:null,
        isLoading:false,
        errors:'',
    }
}

export const userSlice = createSlice({
    name:USERS,
    initialState:initialUserState,
    reducers:{
        registerUserAction:(state:UsersStateType,{payload:{email,fullName}}:PayloadAction<UserInput>)=>{
            state.user.isLoading = true;
            state.user.errors='';
        },
        registerUserSuccessAction:(state:UsersStateType,{payload:user}:PayloadAction<UserT>)=>{
            state.user.isLoading = false;
            state.user.data = null;
            state.user.errors = '';
        },
        registerUserErrorAction:(state:UsersStateType,{payload:error}:PayloadAction<string>)=>{
            state.user.isLoading = false;
            state.user.errors = error;
        },

        loginUserAction:(state:UsersStateType,{payload:{email,password}}:PayloadAction<LoginInput>)=>{
            state.user.isLoading = true;
            state.user.errors='';
        },
        loginUserSuccessAction:(state:UsersStateType,{payload:user}:PayloadAction<UserT>)=>{
            state.user.isLoading = false;
            state.user.data = user;
            state.user.errors = '';
        },
        loginUserErrorAction:(state:UsersStateType,{payload:error}:PayloadAction<string>)=>{
            state.user.isLoading = false;
            state.user.errors=error;
        },

        meUserAction:(state:UsersStateType)=>{
            state.user.isLoading = true;
            state.user.errors='';
        },
        meUserSuccessAction:(state:UsersStateType,{payload:user}:PayloadAction<UserT>)=>{
            state.user.isLoading = false;
            state.user.errors = '';
            state.user.data = user;
        },
        meUserErrorAction:(state:UsersStateType,{payload:error}:PayloadAction<string>)=>{
            state.user.isLoading = false;
            state.user.errors=error;
        },
        logoutUserAction:(state:UsersStateType)=>{
            state.user.isLoading = false;
            osmsApi.util.revokeToken();
            state.user.data=null;
            state.user.errors=''
        }
    }
});

export const {
    registerUserAction,
    registerUserErrorAction,
    registerUserSuccessAction,
    loginUserAction,
    loginUserErrorAction,
    loginUserSuccessAction,
    meUserAction,
    meUserErrorAction,
    meUserSuccessAction,
    logoutUserAction,
}= userSlice.actions;
export default userSlice.reducer;