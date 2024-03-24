import DepartmentT from "@/api/types/department";
import { Message } from "@/api/types/message";
import osmsApi from "@/osmsApi";
import { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { fetchDepartmentAction, fetchDepartmentErrorAction, fetchDepartmentSuccessAction } from "./slice";
import { CREATE_DEPARTMENT, DELETE_DEPARTMENT, FETCH_DEPARTMENT, UPDATE_DEPARTMENT } from "./type";
import { DepartmentInput } from "@/api/department";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchDepartmentsSaga(){
    try{
        const response:AxiosResponse<Message<DepartmentT[]>>= yield osmsApi.department.fetchMany();
        yield put(fetchDepartmentSuccessAction(response.data.data));
    }catch(error:any){
        yield put(fetchDepartmentErrorAction(error?.message||"unknown error"))
    }
}

export function* watchFetchDepartment(){
    yield takeLatest(FETCH_DEPARTMENT, fetchDepartmentsSaga);
}

function* createDepartmentSaga({payload:departmentInfo}:PayloadAction<DepartmentInput>){
    try{
        const response:AxiosResponse<Message<DepartmentT>> = yield osmsApi.department.create(departmentInfo);
        yield put(fetchDepartmentAction());
    }catch(error:any){
        yield put(fetchDepartmentErrorAction(error?.message||"unknown error"));
    }
}
export function* watchCreateDepartment(){
    yield takeLatest(CREATE_DEPARTMENT, createDepartmentSaga);
}

function* updateDepartmentSaga({payload:{id,info:departmentInfo}}:PayloadAction<{id:string,info:Partial<DepartmentInput>}>){
    try{
        const response:AxiosResponse<Message<DepartmentT>> = yield osmsApi.department.update(id,departmentInfo);
        yield put(fetchDepartmentAction());
    }catch(error:any){
        yield put(fetchDepartmentErrorAction(error?.message||"unknown error"));
    }
}
export function* watchUpdateDepartment(){
    yield takeLatest(UPDATE_DEPARTMENT, updateDepartmentSaga);
}

function* deleteDepartmentSaga({payload:id}:PayloadAction<string>){
    try{
        const response:AxiosResponse<Message<DepartmentT>> = yield osmsApi.department.remove(id);
        yield put(fetchDepartmentAction());
    }catch(error:any){
        yield put(fetchDepartmentErrorAction(error?.message||"unknown error"));
    }
}
export function* watchDeleteDepartment(){
    yield takeLatest(DELETE_DEPARTMENT, deleteDepartmentSaga);
}