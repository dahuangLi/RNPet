import { handleActions } from 'redux-actions';
import { store, injectAsyncReducer } from '../../Redux/store/store.js';
import actions from './Action.js';
const initialState = {
    
};
const reducer = handleActions({
    [actions.saveLocation](state, { payload }) {
        return {
            ...state,
            ...payload
        };
    }
}, initialState);


injectAsyncReducer(store, 'Discorver', reducer);
