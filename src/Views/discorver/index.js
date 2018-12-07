import React, {Component} from 'react';
import { View, Text } from 'react-native';
// import LoginView from './Containers/setLogin';
import * as sagas from './Sagas.js';
import reducer from './Reducer';


class Discorver extends Component{
    static navigationOptions = {
        title: 'Discorver',
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
            <View><Text>发现</Text></View>
        );
    }
}

export {Discorver, reducer, sagas}; 

