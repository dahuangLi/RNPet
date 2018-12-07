import React, {Component} from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native';
// import {font} from '../../../Styles';
// import {TencentCaptcha} from '../../../Components';


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
                <TextInput style={[styles.inputStyle, {fontSize: 22}]} 
                    placeholder='请输入手机号' 
                    underlineColorAndroid='transparent'
                    placeholderTextColor={'#c1c1c1'}
                    autoCorrect={false}
                    autoCapitalize ={'none'}
                    keyboardType='numeric'
                />
                <View style={[styles.line]}></View>
                <View style={[styles.inputStyle, styles.checkBox]}>
                    <View>
                        <TextInput style={[styles.inputStyle, {marginTop: 10, width: 120, fontSize: 22}]} 
                            placeholder={this.props.checkCode ? this.props.checkCode : '验证码' }
                            underlineColorAndroid='transparent'
                            placeholderTextColor={'#c1c1c1'}
                            autoCorrect={false}
                            autoCapitalize ={'none'}
                            keyboardType='numeric'
                        />
                        <View style={[styles.line, {width: 120}]}></View>
                    </View>
                    {/* <TouchableOpacity onPress={() => TencentCaptcha.show(this.props.getCode)} sytle={styles.checkButton}> */}
                    <TouchableOpacity onPress={this.props.getCode} sytle={styles.checkButton}>
                        <Text style={styles.checkCode}>获取验证码</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    example: {

    },
    checkCode: {
        fontSize: 20,
        color: 'black'
    },
    checkButton: {
        width: 60,
        height: 30,
        backgroundColor: '#69f'
    },
    checkBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    line: {
        height: 1,
        width: 230,
        backgroundColor: 'rgb(77, 247, 43)'
    },
    inputStyle: {
        width: 230,
        borderWidth: 0,
        height: 50
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});
