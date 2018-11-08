import { Platform, Switch as SwitchIOS } from 'react-native';

import React from 'react';
import SwitchPro from 'react-native-switch-pro';

// 保证nextProps与state的同步
class SwitchCust extends SwitchPro {
    componentWillReceiveProps (nextProps) {
        // unify inner state and outer props
        if (nextProps.value === this.state.value) {
            return;
        }

        this.toggleSwitchToValue(true, nextProps.value);
    }
}

const Switch = props => {
    if (Platform.OS === 'android') {
        return (
            <SwitchCust
                width={50}
                height={30}
                {...props}
                onSyncPress={props.onValueChange}
            />
        );
    } else {
        return (
            <SwitchIOS {...props} />
        );
    }
};

export default Switch;
