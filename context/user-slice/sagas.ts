import { Message } from "@/api/types/message";
import UserT from "@/api/types/user";
import { UserInput } from "@/api/user";
import osmsApi from "@/osmsApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { loginUserErrorAction, loginUserSuccessAction, meUserErrorAction, meUserSuccessAction, registerUserErrorAction, registerUserSuccessAction } from "./slice";
import { LOGIN_USER, ME_USER, REGISTER_USER } from "./types";

function* registerUserSaga({payload:userInfo}:PayloadAction<UserInput>){
    try{
        const response:AxiosResponse<Message<UserT>>= yield osmsApi.user.register(userInfo);
        yield put(registerUserSuccessAction(response.data.data))
    }catch(error:any){
        yield put(registerUserErrorAction(error?.message||"unknown error"))
    }
}

export function* watchRegisterUser(){
    yield takeLatest(REGISTER_USER, registerUserSaga);
}

function* loginUserSaga({payload:userCredentials}:PayloadAction<UserInput>){
    try{
        const response:AxiosResponse<Message<{ access_token: string; user: UserT }>>=yield osmsApi.auth.signIn(userCredentials);
        yield osmsApi.util.saveToken(response.data.data.access_token);
        yield put(loginUserSuccessAction(response.data.data.user))
    }catch(error:any){  
        yield put(loginUserErrorAction(error?.message||"unknown error"))
    }
}
export function* watchLoginUser(){
    yield takeLatest(LOGIN_USER, loginUserSaga);
}

function* meUserSaga(){
    try{
        const response:AxiosResponse<Message<UserT>>=yield osmsApi.auth.me();
        yield put(meUserSuccessAction(response.data.data));
    }catch(error:any){
        yield put(meUserErrorAction(error?.message||"unknown error"))
    }
}
export function* watchMeUser(){
    yield takeLatest(ME_USER,meUserSaga);
}