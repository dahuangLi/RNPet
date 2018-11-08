import { colors, font } from '../Styles/Base';

import { Button as AntdButton } from 'antd-mobile-rn';
import ButtonStyle from 'antd-mobile-rn/lib/button/style';
import React from 'react';
import { StyleSheet } from 'react-native';

const baseStyles = {
    ...ButtonStyle,
    // primaryHighlight: {
    //     ...ButtonStyle.primaryHighlight,
    //     backgroundColor: colors.primary
    // },
    primaryRaw: {
        ...ButtonStyle.primaryHighlight,
        backgroundColor: colors.primary
    },
    largeRaw: {
        ...ButtonStyle.largeRaw,
        height: 45
    },
    primaryRawText: {
        color: '#fff',
        textShadowOffset: {height: 2, width: 0},
        textShadowColor: '#3b80ee'
    }
};

const normalStyles = StyleSheet.create(baseStyles);

const roundStyles = StyleSheet.create({
    ...baseStyles,
    wrapperStyle: {
        ...ButtonStyle.wrapperStyle,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth
    },
    smallRaw: {
        height: 21,
        paddingLeft: 6,
        paddingRight: 6
    },
    smallRawText: {
        fontSize: font.sm
    },
    ghostRaw: {
        backgroundColor: 'transparent',
        borderColor: colors.borderBase
    },
    ghostRawText: {
        color: colors.textBase
    },
    defaultRaw: {
        backgroundColor: '#fff',
        borderColor: colors.borderBase
    },
    defaultRawText: {
        color: colors.textBase
    }
});

const flatStyles = StyleSheet.create({
    ...baseStyles,
    wrapperStyle: {
        ...ButtonStyle.wrapperStyle,
        borderRadius: 0,
        borderWidth: 0
    },
    largeRaw: {
        ...ButtonStyle.largeRaw,
        height: 50
    },
    defaultRawText: {
        color: colors.primary
    }
});

const Button = props => {
    let styles = null;
    switch (true) {
        case props.round:
            styles = roundStyles;
            break;
        case props.flat:
            styles = flatStyles;
            break;
        default:
            styles = normalStyles;
    }
    // const size = props.round ? 'small' : 'large';
    const size = props.round || props.small ? 'small' : 'large';
    const extraDefaultRawText = props.light ? {defaultRawText: {color: colors.textLight}} : {};
    return (
        <AntdButton
            size={size}
            // styles={styles}
            styles={{...styles, ...extraDefaultRawText}}
            {...props}
        />
    );
};

export default Button;
