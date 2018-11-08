/**
 * 客户模块列表，线索、客流、潜客
 */
import {
    ActivityIndicator,
    FlatList,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import baseStyles, { colors, font } from '../../Styles/Base';

import CountBar from './CountBar';
import Item from './Item';
import React from 'react';
import Text from '../Text';
import WhiteSpace from '../WhiteSpace';

// 底部加载状态组件
const FooterStatus = ({
    status,
    onPressRetry
}) => {
    switch (status) {
        case 'loading':
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                </View>
            );
        case 'error':
            return (
                <TouchableOpacity style={styles.footer} onPress={onPressRetry}>
                    <Text style={styles.footerText}>加载失败，点击重试</Text>
                </TouchableOpacity>
            );
        case 'end':
            return (
                <View style={styles.footer}>
                    <Text style={styles.footerText}>没有更多了</Text>
                </View>
            );
        default:
            return null;
    }
};

const CustList = props => (
    <FlatList
        ListFooterComponent={
            <View style={props.data && props.data.length ? styles.listBottomLine : void 0}>
                <FooterStatus status={props.status} onPressRetry={props.onRetry} />
                <WhiteSpace height={60} />
                <WhiteSpace bottom />
            </View>
        }
        onEndReachedThreshold={0.1}
        // 解决onEndReached连续触发多次
        onMomentumScrollBegin={() => {
            this.disableLoadMore = false;
        }}
        {...props}
        onEndReached={() => {
            if (!props.onEndReached || this.disableLoadMore) { return; }
            props.onEndReached();
            if (Platform.OS === 'ios' || props.status === 'loading') {
                this.disableLoadMore = true;
            }
        }}
    />
);

CustList.CountBar = CountBar;
CustList.Item = Item;

export default CustList;

const styles = StyleSheet.create({
    footer: {
        ...StyleSheet.flatten(baseStyles.middle),
        height: 60
    },
    footerText: {
        fontSize: font.sm,
        color: colors.textBase
    },
    listBottomLine: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.borderBase
    }
});
