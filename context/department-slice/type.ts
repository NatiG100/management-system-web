import DepartmentT from "@/api/types/department";

export type IDepartmentState = {
    data:DepartmentT[]|null;
    isLoading:boolean;
    errors:string;
}

export type DepartmentStateType={
    department:IDepartmentState;
}

export const DEPARTMENT = 'department';
export type DEPARTMENT=typeof DEPARTMENT;

export const FETCH_DEPARTMENT = `${DEPARTMENT}/fetchDepartmentAction`;
export const CREATE_DEPARTMENT = `${DEPARTMENT}/createDepartmentAction`;
export const UPDATE_DEPARTMENT = `${DEPARTMENT}/updateDepartmentAction`;
export const DELETE_DEPARTMENT = `${DEPARTMENT}/deleteDepartmentAction`;
export type FETCH_DEPARTMENT = typeof FETCH_DEPARTMENT;
export type CREATE_DEPARTMENT = typeof CREATE_DEPARTMENT;
export type UPDATE_DEPARTMENT = typeof UPDATE_DEPARTMENT;
export type DELETE_DEPARTMENT = typeof DELETE_DEPARTMENT;