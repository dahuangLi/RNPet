import { handleActions } from 'redux-actions';
import { store, injectAsyncReducer } from '../../Redux/store/store.js';
import actions from './Action.js';
const initialState = {
    loginStatus: '0',
    checkCode: null
};
const reducer = handleActions({
    [actions.changeValue](state, { payload }) {
        return {
            ...state,
            loginStatus: payload.loginStatus
        };
    },
    [actions.changeCode](state, { payload }) {
        return {
            ...state,
            checkCode: payload.checkCode
        };
    }
}, initialState);


injectAsyncReducer(store, 'Login', reducer);
