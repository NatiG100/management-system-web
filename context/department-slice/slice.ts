import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DEPARTMENT, DepartmentStateType } from "./type";
import DepartmentT from "@/api/types/department";
import { DepartmentInput } from "@/api/department";

const initialDepartmentState:DepartmentStateType = {
    department:{
        data:null,
        isLoading:false,
        errors:'',
    }
}

export const departmentSlice = createSlice({
    name:DEPARTMENT,
    initialState:initialDepartmentState,
    reducers:{
        fetchDepartmentAction:(state:DepartmentStateType)=>{
            state.department.isLoading=true;
            state.department.errors='';
        },
        fetchDepartmentSuccessAction:(state:DepartmentStateType,{payload:departments}:PayloadAction<DepartmentT[]>)=>{
            state.department.isLoading =false;
            state.department.errors='';
            state.department.data = departments;
        },
        fetchDepartmentErrorAction:(state:DepartmentStateType,{payload:error}:PayloadAction<string>)=>{
            state.department.isLoading=false;
            state.department.errors=error;
            state.department.data = null;
        },
        createDepartmentAction:(state:DepartmentStateType,{payload}:PayloadAction<DepartmentInput>)=>{
            state.department.isLoading=true;
            state.department.errors='';
        },
        
        updateDepartmentAction:(state:DepartmentStateType,{payload}:PayloadAction<{id:string,info:Partial<DepartmentInput>}>)=>{
            state.department.isLoading=true;
            state.department.errors='';
        },
        deleteDepartmentAction:(state:DepartmentStateType,{payload:id}:PayloadAction<string>)=>{
            state.department.isLoading=true;
            state.department.errors='';
        }
    }
});

export const {
    createDepartmentAction,
    deleteDepartmentAction,
    fetchDepartmentAction,
    fetchDepartmentErrorAction,
    fetchDepartmentSuccessAction,
    updateDepartmentAction
}= departmentSlice.actions;
export default departmentSlice.reducer;