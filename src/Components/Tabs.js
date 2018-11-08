import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../Styles/Base';

const Tabs = props =>
    <ScrollableTabView
        renderTabBar={tabBarProps =>
            <DefaultTabBar
                // style={styles.tabBar}
                style={[styles.tabBar, props.tabBarSelf]}
                tabWidth={props.tabWidth}
                underlineWidth={props.underlineWidth}
                tabStyle={styles.tab}
                textStyle={[{fontSize: 13, fontWeight: '300'}, props.textStyle]}
                {...tabBarProps} />
        }
        scrollWithoutAnimation={!props.animated}
        locked={!props.animated}
        tabBarUnderlineStyle={styles.tabUnderline}
        tabBarBackgroundColor="#fff"
        tabBarActiveTextColor={colors.primary}
        tabBarInactiveTextColor={colors.textBase}
        {...props}
    />;

Tabs.defaultProps = {
    animated: true
};

const styles = StyleSheet.create({
    tabBar: {
        height: 35,
        borderColor: '#F6F6F6'
    },
    // tab: {
    //     width: 90
    // },
    tabUnderline: {
        backgroundColor: colors.primary,
        height: 2
    }
});

export default Tabs;
