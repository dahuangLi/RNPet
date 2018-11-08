import { StyleSheet, View } from 'react-native';
import { colors, font, spacing } from '../../Styles/Base';

import ItemField from './ItemField';
import List from '../AList';
import React from 'react';
import Text from '../Text';

const CustListItem = props => (
    <List.Item
        disabled={props.disabled}
        onClick={props.onClick}
    >
        <View style={props.style}>
            {props.children}
        </View>
    </List.Item>
);

const ItemRow = props => (
    <View style={[styles.itemWrap, styles.row]}>
        {props.children}
    </View>
);

const ItemTitle = props => (
    <Text style={[styles.titleTxt, props.style]}>{props.children}</Text>
);

CustListItem.Row = ItemRow;
CustListItem.Title = ItemTitle;
CustListItem.Field = ItemField;

export default CustListItem;

const styles = StyleSheet.create({
    itemWrap: {
        paddingVertical: spacing.sm
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
        alignItems: 'center'
    },
    titleTxt: {
        color: colors.textBase,
        fontSize: font.sm,
        fontWeight: '400'
    }
});
