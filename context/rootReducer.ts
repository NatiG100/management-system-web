import { useReducer } from "react";
import { UsersStateType } from "./user-slice/types";

export type StateType = {
    users:UsersStateType;
}
const rootReducers = {
    users:useReducer,
}

export default rootReducers;