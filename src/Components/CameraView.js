import React from 'react';
import {
    StyleSheet,
    NativeModules,
    findNodeHandle,
    requireNativeComponent
} from 'react-native';

const CameraModule = NativeModules.CameraModule;
const NativeCameraView = requireNativeComponent('CameraModule');

export default class CameraView extends React.Component {
    render() {
        return (<NativeCameraView {...this.props} style={{ ...StyleSheet.absoluteFillObject }} />);
    }
}

async function takePicture(cameraViewRef) {
    try {
        let node = findNodeHandle(cameraViewRef);
        CameraModule.takePicture(node);
    } catch (error) {
        console.warn(error);
    }
}

export { takePicture };
