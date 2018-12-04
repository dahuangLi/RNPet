import { takeLatest, put } from 'redux-saga/effects';
import { sagaMiddleware } from '../../Redux/store/store';
import actions from './Action';



function* saveMessage() {
    console.log(actions);
    yield put(actions.changeValue({ loginStatus: '1' }));
}

function* saveCode() {
    console.log(actions);
    yield put(actions.changeCode({ checkCode: '123456' }));
}


sagaMiddleware.run(function* () {
    yield takeLatest(actions.saveMessage, saveMessage);
    yield takeLatest(actions.getCode, saveCode);
});
