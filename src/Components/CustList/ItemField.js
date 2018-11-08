import { colors, font } from '../../Styles/Base';

import React from 'react';
import {
    StyleSheet
} from 'react-native';
import Text from '../Text';

const ListItemField = props =>
    <Text numberOfLines={1} style={[styles.text, props.style]}>{props.label}：
        <Text style={styles.value}>{props.value}</Text>
    </Text>;

export default ListItemField;

const styles = StyleSheet.create({
    text: {
        color: colors.textBase,
        fontSize: font.sm
    },
    value: {
        color: colors.textDark
    }
});
