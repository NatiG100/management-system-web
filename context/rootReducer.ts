import { UsersStateType } from "./user-slice/types";
import userReducer from "./user-slice/slice";
import departmentReducer from "./department-slice/slice";
import { DepartmentStateType } from "./department-slice/type";

export type StateType = {
    users:UsersStateType;
    department:DepartmentStateType,
}
const rootReducers = {
    users:userReducer,
    department:departmentReducer,
}

export default rootReducers;