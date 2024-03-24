import { all, fork } from "redux-saga/effects"
import { watchLoginUser, watchMeUser, watchRegisterUser } from "./user-slice/sagas"

const rootSaga = function* (){
    yield all([
        fork(watchRegisterUser),
        fork(watchLoginUser),
        fork(watchMeUser),
    ]);
}

export default rootSaga;