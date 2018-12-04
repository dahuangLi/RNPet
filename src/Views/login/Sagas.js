import { takeLatest, put } from 'redux-saga/effects';
import { sagaMiddleware } from '../../Redux/store/store';
import actions from './Action';
// import Ajax from '../../Components/Ajax';
// import Axios from 'axios';



function* saveMessage() {
    yield put(actions.changeValue({ loginStatus: '1' }));
}

function* saveCode() {
    // let params = {
    //     method: 'POST',
    //     url: 'getCheckNumber',
    //     phoneNumber: '123456'
    // };
    // const result = yield Ajax(params);

    yield put(actions.changeCode({ checkCode: '123456' }));
}


sagaMiddleware.run(function* () {
    yield takeLatest(actions.saveMessage, saveMessage);
    yield takeLatest(actions.getCode, saveCode);
});
