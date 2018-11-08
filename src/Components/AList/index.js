import { List as AntdList } from 'antd-mobile-rn';
import Item from './ListItem';
import React from 'react';
import { StyleSheet } from 'react-native';
import listStyle from './Style';

const List = props =>
    <AntdList
        styles={styles}
        {...props}
    />;

List.Item = Item;

const styles = StyleSheet.create({
    ...listStyle
});

export default List;
