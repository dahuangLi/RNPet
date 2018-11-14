import React, {Component} from 'react';
import { StyleSheet, View, TextInput} from 'react-native';
// import {TextInput} from '../../../Components'


export default class App extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            width: 50,
            height: 50 
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputStyle} 
                    placeholder='请输入手机号' 
                    underlineColorAndroid='transparent'
                    placeholderTextColor={'#c1c1c1'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    example: {

    },
    inputStyle: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(77, 247, 43)'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});
