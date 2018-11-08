import * as ActionTypes from '../action/action.js';

const initialState = {
    loginStatus: ''
};

export default (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.LOGOUT:
            return { ...state, userInfo: null };
        default:
            return state
    }
}
