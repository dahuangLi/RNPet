import { handleActions } from 'redux-actions';
import { store, injectAsyncReducer } from '../Redux/store/store.js';
import actions from './Action.js';
const initialState = {
    loginStatus:'0'
};
const reducer = handleActions({
    [actions.changeValue](state, { payload }) {
        return {
            ...state,
            loginStatus:payload.loginStatus
        };
    }
}, initialState);


injectAsyncReducer(store, 'Login', reducer);
