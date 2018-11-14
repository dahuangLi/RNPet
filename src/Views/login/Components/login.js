import React, {Component} from 'react';
import { StyleSheet, View, TextInput, Text} from 'react-native';
// import {font} from '../../../Styles';
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
                            placeholder='验证码' 
                            underlineColorAndroid='transparent'
                            placeholderTextColor={'#c1c1c1'}
                            autoCorrect={false}
                            autoCapitalize ={'none'}
                            keyboardType='numeric'
                        />
                        <View style={[styles.line, {width: 120}]}></View>
                    </View>
                    <View sytle={styles.checkButton}>
                        <Text>获取验证码</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    example: {

    },
    checkButton: {
        width: 60,
        height: 30,
        backgroundColor: 'yellow'
    },
    checkBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    line: {
        height: 1,
        width: 230,
        backgroundColor: 'rgb(77, 247, 43)'
    },
    inputStyle: {
        width: 230,
        // fontSize: 22,
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
