import React, {Component} from 'react';
import { MapView } from 'react-native-baidumap-sdk';


export default class Discorver extends Component{
    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                center={{ latitude: 39, longitude: 113 }}
                zoomLevel={10}
            />
        );
    }
}


