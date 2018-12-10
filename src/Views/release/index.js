import React, {Component} from 'react';
import { View, Text } from 'react-native';
// import LoginView from './Containers/setLogin';
import * as sagas from './Sagas.js';
import reducer from './Reducer';


class Release extends Component{
    static navigationOptions = {
        header: null
    };
    render (){
        return (
            <View><Text>发布</Text></View>
        );
    }
}

export {Release, reducer, sagas}; 

