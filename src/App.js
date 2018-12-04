import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { AppLogin } from './Views/login';
import {store} from './Redux/store/store';
import { Provider } from 'react-redux';

const AppNavigator = createStackNavigator({
    Login: {
        screen: AppLogin
    }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component{
    render (){
        return <Provider store={store}>
            <AppContainer />
        </Provider>;
        
    }
}


