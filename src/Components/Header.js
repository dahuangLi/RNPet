/**
 * 粘在容器顶部的区域
 */
import { Platform, View, NativeModules } from 'react-native';

import { Deviceinfo } from '../Utils';
import React from 'react';
import { safeArea } from '../Styles/Base';
import semver from 'semver';

const {LCBStatusBarManager} = NativeModules;
const Header = props =>
    <View {...props} style={[defaultStyle, { backgroundColor: props.backgroundColor || '#fff' }, props.style]} />;

const defaultStyle = {
    ...Platform.select({
        ios: Deviceinfo.isIphoneX() ? {
            paddingTop: safeArea.portrait.top
        } : {
            paddingTop: safeArea.default.top
        },
        android: semver.gte(Deviceinfo.getVersion(), '2.0.0') && Deviceinfo.getAPILevel() >= 23 ? {
            paddingTop: LCBStatusBarManager.statusBarHeight || 25
        } : {
            paddingTop: 0
        }
    })
};

export default Header;
