import { Deviceinfo } from '../Utils';
import React from 'react';
import { View } from 'react-native';
import { safeArea } from '../Styles/Base';

let bottomHeight = Deviceinfo.isIphoneX() ? safeArea.portrait.bottom : 0;

const WhiteSpace = ({ height, bottom }) =>
    <View style={{ height: height || (bottom ? bottomHeight : 10) }} />;

export default WhiteSpace;
