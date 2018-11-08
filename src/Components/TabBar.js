/**
 * 参照 Ant Design TabBar 接口 {@link https://mobile.ant.design/components/tab-bar-cn/}
 */
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Badge from './Badge';
import React from 'react';
import Svg from '../SVGUri/Svg';
import Text from './Text';
import { colors, window } from '../Styles/Base';

const TabItem = ({
    icon,
    title,
    badge,
    selected,
    selectedIcon,
    tintColor,
    unselectedTintColor,
    onPress
}) =>
    <TouchableOpacity
        style={styles.tabItem}
        onPress={onPress}
        activeOpacity={1}
    >
        <View style={styles.iconWrap}>
            <Svg
                title={selected && selectedIcon || icon}
                size={24}
                color={selected ? tintColor : unselectedTintColor}
            />
            
        </View>
        {!!badge &&
            <Badge text={badge > 99 ? '99+' : badge} style={styles.badge} />
        }
        <Text style={{
            fontSize: 12,
            color: selected ? tintColor : unselectedTintColor
        }}>{title}</Text>
    </TouchableOpacity>;


const TabBar = ({
    children,
    tintColor,
    unselectedTintColor
}) =>
    <View style={styles.tabBox}>
        {children.map((item, index) =>
            <TabItem
                key={index}
                tintColor={tintColor}
                unselectedTintColor={unselectedTintColor}
                {...item.props}
            />
        )}
    </View>;

TabBar.Item = TabItem;

const styles = StyleSheet.create({
    tabBox: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.borderBase,
        flexDirection: 'row',
        height: 55
    },
    tabItem: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    iconWrap: {
        width: 50,
        paddingTop: 10,
        alignItems: 'center'
    },
    badge: {
        position: 'absolute',
        top: 2,
        left: window.width / 6 + 6
    }
});

export default TabBar;
