import { StyleSheet, View } from 'react-native';
import baseStyles, { colors } from '../Styles/Base';

import React from 'react';
import Text from './Text';

const Badge = props => {
    const color = props.color || colors.primary;
    // 订单状态tag
    if (props.tag) {
        return (
            <View style={[styles.tag, { borderColor: color }, props.style]}>
                <Text style={[styles.text, { color }]}>{props.text}</Text>
            </View>
        );
    }
    if (props.dot) {
        return <View style={[styles.dot, props.style]} />;
    }
    // 订单级别
    if (props.level) {
        return (
            <View style={[styles.levelContainer, baseStyles.middle, { borderColor: color }, props.style]}>
                <Text style={[styles.levelText, { color }]}>{ props.text }</Text>
            </View>
        ); 
    }
    return (
        <View style={[styles.container, props.style]}>
            {!!props.text &&
            <Text style={styles.text}>{props.text}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    tag: {
        borderWidth: 1,
        padding: 2, 
        borderRadius: 3
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: '#ff3232',
        borderRadius: 8
    },
    container: {
        maxWidth: 40,
        borderColor: '#fff',
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 6,
        backgroundColor: '#ff3232',
        borderRadius: 12
    },
    text: {
        fontSize: 12,
        color: '#fff'
    },
    levelContainer: {
        borderWidth: 1,
        backgroundColor: 'transparent',
        width: 24,
        height: 24,
        borderRadius: 12
    }
});


export default Badge;
