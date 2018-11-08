import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { colors, font, spacing } from '../Styles/Base';

import { NativeModules } from 'react-native';
import Popover from './Popover';
import PropTypes from 'prop-types';
import Svg from '../SVGUri/Svg';

const itemProps = {
    text: PropTypes.string,
    icon: PropTypes.string,
    onPress: PropTypes.func
};

export class BarItem extends PureComponent {
    static propTypes = itemProps;

    static defaultProps = {
        onPress: () => { }
    };

    render() {
        const {
            style,
            icon,
            text,
            subItems,
            onPress,
            itemStyle
        } = this.props;
        const Wrapper = subItems && subItems.length ? Popover.Trigger : TouchableOpacity;
        return (
            <Wrapper
                style={[styles.barItem, style]}
                onPress={onPress}
                menu={subItems}
            >
                {icon &&
                    <Svg title={icon} size={17} color={colors.textBase} />}
                {text &&
                    <Text allowFontScaling={false} style={[styles.txt, itemStyle ? itemStyle : {}]}>{text}</Text>}
            </Wrapper>
        );
    }
}

const PropShape = PropTypes.shape({
    ...itemProps,
    type: PropTypes.number
});

const typeSettings = {
    1: {
        icon: 'arrow-l',
        onPress: () => {
            NativeModules.NavigationModule.pop(null);
        }
    }
};

export default class NavigationBar extends PureComponent {
    static propTypes = {
        title: PropShape.isRequired,
        leftItems: PropTypes.arrayOf(PropShape),
        rightItems: PropTypes.arrayOf(PropShape)
    };

    static defaultProps = {
        leftItems: [{
            type: 1
        }],
        rightItems: []
    };

    renderBarItems(items, style, itemStyle) {
        if (!items || !items.length) { return null; }
        return items.map((item, index) => {
            const defaultProps = typeSettings[item.type] || {};
            const props = {
                ...defaultProps,
                ...item
            };
            return <BarItem {...props} itemStyle = {itemStyle} key={index} style={style} />;
        });
    }

    render() {
        const { title, leftItems, rightItems, style, titleStyle, rightItemsStyle} = this.props;
        return (
            <View style={[styles.container, style]}>
                <View style={styles.left}>
                    {this.renderBarItems(leftItems, { paddingRight: spacing.lg })}
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={title.onPress}
                    style={styles.center}
                >
                    <Text allowFontScaling={false} style={[styles.title, titleStyle ? titleStyle : {} ]} numberOfLines={1}>{title.text}</Text>
                    {!!title.icon &&
                        <Svg title={title.icon} size={10} color={colors.textDark} />}
                </TouchableOpacity>
                <View style={styles.right}>
                    {this.renderBarItems(rightItems, { paddingLeft: spacing.lg }, rightItemsStyle)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    barItem: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        paddingHorizontal: 15,
        height: 44,
        flexDirection: 'row',
        borderColor: colors.borderBase,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%'
    },
    center: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%'
    },
    title: {
        fontSize: font.lg,
        color: colors.textDark,
        fontWeight: '300'
        // textAlign: 'center'
    },
    txt: {
        fontSize: 14,
        color: colors.textBase,
        fontWeight: '300'
    }
});
