import { all, fork } from "redux-saga/effects"
import { watchRegisterUser } from "./user-slice/sagas"

const rootSaga = function* (){
    yield all([
        fork(watchRegisterUser)
    ]);
}

export default rootSaga;