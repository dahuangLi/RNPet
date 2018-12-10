import { takeLatest } from 'redux-saga/effects';
import { sagaMiddleware } from '../../Redux/store/store';
import actions from './Action';

// import Ajax from '../../Components/Ajax';
// import Axios from 'axios';



function* gotoRelease() {
    
}



sagaMiddleware.run(function* () {
    yield takeLatest(actions.gotoRelease, gotoRelease);
});
