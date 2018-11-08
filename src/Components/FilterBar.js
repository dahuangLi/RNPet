import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import baseStyle, { colors } from '../Styles/Base';

import Text from './Text';

class FilterBar extends PureComponent {
    render() {
        const { items, active, onPressItem } = this.props;
        return (
            <View style={styles.container}>
                {
                    items.map((item, index) =>
                        <TouchableOpacity
                            key={item.value}
                            activeOpacity={1}
                            style={[styles.itemWrap, index + 1 < items.length && styles.splitLine]}
                            onPress={() => onPressItem(item)}
                        >
                            <Text style={[styles.labelText, active === item.value && { color: colors.primary }]}>{item.label}</Text>
                            <View style={[styles.trangle, active === item.value && styles.activeTrangle]} />
                        </TouchableOpacity>
                    )
                }
            </View>
        );
    }
}

export default FilterBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderBottomColor: colors.borderLight,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    itemWrap: {
        flex: 1,
        height: 20,
        marginVertical: 10,
        flexDirection: 'row',
        ...StyleSheet.flatten(baseStyle.middle)
    },
    splitLine: {
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: colors.borderLight
    },
    labelText: {
        color: colors.textBase,
        fontSize: 14
    },
    trangle: {
        borderWidth: 4,
        marginTop: 6,
        marginLeft: 4,
        width: 0,
        borderColor: 'transparent',
        borderTopColor: colors.borderLight
    },
    activeTrangle: {
        borderTopColor: 'transparent',
        borderBottomColor: colors.primary,
        marginTop: -2
    }
});
