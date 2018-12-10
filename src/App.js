import React, {Component} from 'react';
import { createStackNavigator, createAppContainer} from 'react-navigation';
import { AppLogin } from './Views/login';
import { Discorver } from './Views/discorver';
import { Release } from './Views/release';
import {store} from './Redux/store/store';
import { Provider } from 'react-redux';
import {NavigationService} from './Components';


const AppNavigator = createStackNavigator({
    Login: {
        screen: AppLogin
    },
    Discorver: {
        screen: Discorver
    },
    Release: {
        screen: Release
    }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component{
    render (){
        return <Provider store={store}>
            <AppContainer
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        </Provider>;
        
    }
}


