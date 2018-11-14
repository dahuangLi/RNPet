import React, {Component} from 'react';
import LoginView from './Containers/setLogin';
import * as sagas from './Sagas.js';
import reducer from './Reducer';


class AppLogin extends Component{
    render (){
        return (
            <LoginView />
        );
    }
}

export {AppLogin, reducer, sagas}; 
