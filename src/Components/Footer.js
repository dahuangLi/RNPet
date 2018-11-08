import { Deviceinfo } from '../Utils';
import React from 'react';
/**
 * 粘在屏幕底部的页底区域
 */
import { View } from 'react-native';
import { safeArea } from '../Styles/Base';

const Footer = props =>
    <View {...props} style={[defaultStyle, props.style]} />;

const defaultStyle = {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0
};

if (Deviceinfo.isIphoneX()) {
    Object.assign(defaultStyle, {
        paddingBottom: safeArea.portrait.bottom
    });
}

export default Footer;
