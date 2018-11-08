import { StyleSheet, View } from 'react-native';

/**
 * 页面内容中的分块
 */
import React from 'react';
import { colors } from '../Styles/Base';

const Section = props =>
    <View {...props} style={[styles.sec, props.style]} />;

export default Section;

const styles = StyleSheet.create({
    sec: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderBottomColor: colors.borderBase,
        borderBottomWidth: StyleSheet.hairlineWidth
    }
});
