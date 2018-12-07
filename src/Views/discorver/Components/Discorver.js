import React, {Component} from 'react';
import { MapView } from 'react-native-baidumap-sdk';
// import {View, Button} from 'react-native';
// import actions from '../Action';


export default class Discorver extends Component{
    
    componentDidMount() {
        this.props.locationInit();
    }
    render() {
        console.log(this.props);
        return (
            <MapView
                style={{ flex: 1 }}
                center={{ latitude: 39, longitude: 113 }}
                zoomLevel={10}
            />
        );
    }
}


