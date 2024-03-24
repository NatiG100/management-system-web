import { all, fork } from "redux-saga/effects"
import { watchLoginUser, watchMeUser, watchRegisterUser } from "./user-slice/sagas"
import { watchCreateDepartment, watchDeleteDepartment, watchFetchDepartment, watchUpdateDepartment } from "./department-slice/sagas";

const rootSaga = function* (){
    yield all([
        fork(watchRegisterUser),
        fork(watchLoginUser),
        fork(watchMeUser),

        fork(watchFetchDepartment),
        fork(watchCreateDepartment),
        fork(watchUpdateDepartment),
        fork(watchDeleteDepartment),
    ]);
}

export default rootSaga;