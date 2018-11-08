import { Image, TouchableOpacity } from 'react-native';

import React from 'react';
import Text from './Text';

const NetError = ({
    onPress = (() => {})
}) =>
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image style={styles.image} source={require('./Assets/network.png')} />
        <Text style={styles.text}>加载失败，点击重试</Text>
    </TouchableOpacity>;

export default NetError;

const styles = {
    container: {
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100
    },
    text: {
        color: '#999',
        fontSize: 15,
        marginTop: 20
    }
};
