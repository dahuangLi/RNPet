/**
 * 不支持设置选中行文字颜色
 */
import { Picker as AntdPicker } from 'antd-mobile-rn';
import PickerStyle from 'antd-mobile-rn/lib/picker/style';
import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../Styles/Base';

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

const Picker = props => {
    return (
        <AntdPicker
            styles={styles}
            itemStyle={{ fontSize: 18, fontWeight: '300' }}
            {...props}
        />
    );
};

export default Picker;
