import React, {Component} from 'react';
// import { View, Text } from 'react-native';
import DiscorverView from './Containers/setDiscorver';
import * as sagas from './Sagas.js';
import reducer from './Reducer';


class Discorver extends Component{
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <DiscorverView />
        );
    }
}

export {Discorver, reducer, sagas}; 

