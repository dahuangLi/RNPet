import client from '../reducer/reducer.js'
import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux';
import * as GlobalActionTypes from '../action/action.js'
import createSagaMiddleware from 'redux-saga'
import {
    batchActions,
    enableBatching
} from 'redux-batched-actions';


function createReducer(asyncReducers) {
    
    let rootReducer = enableBatching(combineReducers({
        client,
        ...asyncReducers
    }))
    
    return (state, action) => {
        if (action.type === GlobalActionTypes.LOGOUT) {
            state = undefined
        }
        console.log(rootReducer)
        return rootReducer(state, action)
    }

}


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    combineReducers({client}), {},
    applyMiddleware(sagaMiddleware)
)



store.asyncReducers = {};

export function injectAsyncReducer(store, name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
}

export {
    store,
    sagaMiddleware,
    batchActions
}