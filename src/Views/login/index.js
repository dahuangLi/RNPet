import React, {Component} from 'react';
import LoginView from './Containers/setLogin';
import * as sagas from './Sagas.js';
import reducer from './Reducer';


class AppLogin extends Component{
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#69f'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };
    render (){
        return (
            <LoginView />
        );
    }
}

export {AppLogin, reducer, sagas}; 

