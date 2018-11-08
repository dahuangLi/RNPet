import { Tag as AntdTag } from 'antd-mobile-rn';
import React from 'react';
import { StyleSheet } from 'react-native';
import TagStyle from 'antd-mobile-rn/lib/tag/style';
import { colors } from '../Styles/Base';

const styles = StyleSheet.create({
    ...TagStyle,
    tag: {
        ...TagStyle.tag,
        borderRadius: 10
    },
    wrap: {
        ...TagStyle.wrap,
        paddingHorizontal: 6,
        paddingVertical: 3,
            
        borderRadius: 10
    },
    normalWrap: {
        borderColor: colors.borderBase,
        backgroundColor: 'transparent'
    },
    normalText: {
        color: colors.textBase
    },
    activeWrap: {
        borderColor: colors.primary,
        backgroundColor: colors.primary
    },
    activeText: {
        color: '#fff'
    }
});

const Tag = props =>
    <AntdTag styles={styles} {...props} />;

export default Tag;
