/**
 * 内容组件的容器，撑满周围的空间
 */
import React from 'react';
import { View } from 'react-native';

const Container = props =>
    <View {...props} style={[{ flex: 1 }, props.style]} />;

export default Container;
