import { Message } from "@/api/types/message";
import UserT from "@/api/types/user";
import { UserInput } from "@/api/user";
import osmsApi from "@/osmsApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { registerUserErrorAction, registerUserSuccessAction } from "./slice";
import ErrorRes from "@/api/types/error";
import { REGISTER_USER } from "./types";

function* registerUserSaga({payload:userInfo}:PayloadAction<UserInput>){
    try{
        const response:AxiosResponse<Message<UserT>>= yield osmsApi.user.register(userInfo);
        yield put(registerUserSuccessAction(response.data.data))
    }catch(error){
        yield put(registerUserErrorAction(error as string))
    }
}

export function* watchRegisterUser(){
    yield takeLatest(REGISTER_USER, registerUserSaga);
}