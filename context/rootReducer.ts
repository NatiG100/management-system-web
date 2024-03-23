import { UsersStateType } from "./user-slice/types";
import userReducer from "./user-slice/slice";

export type StateType = {
    users:UsersStateType;
}
const rootReducers = {
    users:userReducer,
}

export default rootReducers;