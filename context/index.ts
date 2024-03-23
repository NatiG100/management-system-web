import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import rootReducers from './rootReducer';
import rootSaga from './root-saga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer:rootReducers,
    middleware:(getDefaultMiddleWare)=>
        getDefaultMiddleWare().concat([sagaMiddleware])
});
sagaMiddleware.run(rootSaga);

export default store;