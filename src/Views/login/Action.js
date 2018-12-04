import { createActions } from 'redux-actions';

const actionCreators = createActions({
    LOGIN: {
        LOGIN_STATE: {
            SAVE_MESSAGE: void 0,
            CHANGE_VALUE: void 0,
            GET_CODE: void 0,
            CHANGE_CODE: void 0
        }
    }
});
export default actionCreators.login.loginState;
