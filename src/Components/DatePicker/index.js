import DatePicker from './DatePicker';
import React from 'react';
import PickerStyle from 'antd-mobile-rn/lib/picker/style';
import { StyleSheet } from 'react-native';
import { colors } from '../../Styles/Base';

export default LCBDatePicker = (props) =>
    <DatePicker styles={styles} {...props}/>;

export const styles = StyleSheet.create({
    ...PickerStyle,
    header: {
        ...PickerStyle.header,
        justifyContent: 'space-between'
    },
    headerItem: {
        ...PickerStyle.headerItem,
        paddingHorizontal: 15,
        flex: 0
    },
    actionText: {
        ...PickerStyle.actionText,
        color: colors.primary,
        fontSize: 15
    },
    title: {
        ...PickerStyle.title,
        fontSize: 16
    }
});
