import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import {store} from './src/Redux/store/store';
import { Provider } from 'react-redux';
import { Initializer } from 'react-native-baidumap-sdk';

Initializer.init('loNLufxVHoRUMEb1fcZ4o2yor4p2zDu1').catch(e => console.error(e));

class Root extends React.Component{
    render (){
        return <Provider store={store}>
            <App />
        </Provider>;
        
    }
}

AppRegistry.registerComponent('RNPet', () => Root);
