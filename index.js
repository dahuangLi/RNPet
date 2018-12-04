import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import {store} from './src/Redux/store/store';
import { Provider } from 'react-redux';

class Root extends React.Component{
    render (){
        return <Provider store={store}>
            <App />
        </Provider>;
        
    }
}

AppRegistry.registerComponent('RNPet', () => Root);
