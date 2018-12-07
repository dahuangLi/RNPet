import { takeLatest, put } from 'redux-saga/effects';
import { sagaMiddleware } from '../../Redux/store/store';
import actions from './Action';
import { Location } from 'react-native-baidumap-sdk';

// import Ajax from '../../Components/Ajax';
// import Axios from 'axios';



function* locationInit() {
    yield Location.init();
    Location.addLocationListener((location) => saveLocationInfo(location));
    Location.start();
}

function* saveLocationInfo(info) {
    console.log(info);
    yield put(actions.saveLocation(info));
}


sagaMiddleware.run(function* () {
    yield takeLatest(actions.locationInit, locationInit);
});
