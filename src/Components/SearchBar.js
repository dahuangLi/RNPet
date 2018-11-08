import {
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import React, { PureComponent } from 'react';

import Svg from '../SVGUri/Svg';
import { Text } from '../Components';

class SearchBar extends PureComponent {
    render() {
        const props = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.leftItem}>
                    <TextInput
                        ref={(ref) => this.textInput = ref}
                        style={[styles.textInput, props.textInputStyle]}
                        value={props.keywords}
                        underlineColorAndroid="transparent"
                        placeholder={props.placeholder || '请输入'}
                        onChangeText={props.onChangeText}
                        returnKeyType="search"
                        onSubmitEditing={() => props.onSubmitEditing(props.keywords)}
                    />
                    <View style={styles.txtIcon}>
                        <Svg title={'find'} size={15} color={'#A3A3A3'}/>
                    </View>
                    <TouchableOpacity style={styles.clearIcon} onPress={() => {
                        this.textInput.clear();
                        props.onChangeText('');
                    }}>
                        <Svg title={'clear'} size={15} color={'#A3A3A3'}/>
                    </TouchableOpacity>
    
                </View>
                <TouchableOpacity style={styles.rightItem} activeOpacity={1} onPress={props.onCancel}>
                    <Text style={styles.btnTxt}>取消</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'ios' ? 3 : 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    rightItem: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft: 10
    },
    textInput: {
        fontSize: 13,
        paddingRight: 25,
        paddingVertical: 8,
        backgroundColor: '#FAFAFA',
        borderRadius: 5,
        width: '100%',
        paddingLeft: 30
    },
    txtIcon: {
        position: 'absolute',
        left: 8
    },
    clearIcon: {
        position: 'absolute',
        right: 8
    },
    btnTxt: {
        color: '#333333'
    }
});
