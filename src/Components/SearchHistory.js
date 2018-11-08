import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import React from 'react';
import Svg from '../SVGUri/Svg';
import { Text } from '../Components';
import { width } from '../Styles';

export default (props) => <View style={styles.container}>
    <View style={styles.rowBox}>
        <Text style={styles.summary}>历史搜索</Text>
        {props.data && props.data.length ? <TouchableOpacity onPress={props.onClear}><Svg title={'empty'} size={16} color="#666"/></TouchableOpacity> : null}
    </View>
    <FlatList style={styles.listBox}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => <TouchableOpacity style={[styles.itemBox, {borderBottomWidth: index + 1 === props.data.length ? 0 : width.borderBase}]}
            onPress={() => {props.onPressItem(index);}}>
            <Text style={styles.itemTxt}>{item}</Text>
        </TouchableOpacity>}
        data={props.data}/>
</View>;

const styles = StyleSheet.create({
    rowBox: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 15
    },
    listBox: {
        backgroundColor: '#fff'
    },
    summary: {
        fontSize: 13,
        color: '#666'
    },
    container: {
        backgroundColor: '#fff',
        borderBottomColor: '#e9e9e9',
        borderBottomWidth: width.borderBase,
        paddingLeft: 15,
        flex: 1
    },
    itemBox: {
        height: 44,
        justifyContent: 'center',
        borderBottomColor: '#e9e9e9'
    },
    itemTxt: {
        fontSize: 15,
        color: '#333'
    }
});
