import {
    Dimensions,
    Platform
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
// iPhoneX  
const X_WIDTH = 375;
const X_HEIGHT = 812;

// screen  
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

DeviceInfo.isIphoneX = () => {
    return (
        Platform.OS === 'ios' &&
        ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) ||
            (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))
    );
};
export default DeviceInfo;