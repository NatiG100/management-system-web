import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { USERS, UsersStateType } from "./types";
import { LoginInput } from "@/api/auth";
import UserT from "@/api/types/user";
import { UserInput } from "@/api/user";

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
            state.user.data = user;
        },
        registerUserErrorAction:(state:UsersStateType,{payload:error}:PayloadAction<string>)=>{
            state.user.isLoading = false;
            state.user.errors = error;
        }
    }
});

export const {registerUserAction,registerUserErrorAction,registerUserSuccessAction}= userSlice.actions;
export default userSlice.reducer;