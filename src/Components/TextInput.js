import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Dimensions, PixelRatio
} from 'react-native';

// props.layout 专用于设置高宽
const {width} = Dimensions.get('window');
export default (props) => {
    return (
        <View style={[styles.container, props.style, props.layout]}>
            <TextInput
                style={[styles.textInput, props.textInputStyle, props.layout]}
                underlineColorAndroid='transparent'
                multiline={true}
                returnKeyLabel={props.returnKeyLabel || 'next'}
                placeholder={props.placeholder || ''}
                placeholderTextColor={props.placeholderTextColor || '#c1c1c1'}
                maxLength={props.maxLength || 500}
                value={props.message || ''}
                onChangeText={props.onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        height: 100,
        width: width - 30,
        marginLeft: 15,
        backgroundColor: '#ffffff',
        borderColor: '#e9e9e9',
        borderWidth: 1 / PixelRatio.get(),
        borderRadius: 3
    },
    textInput: {
        // 文本垂直方向对齐方式
        textAlignVertical: 'top',
        height: 100,
        width: width - 30,
        fontSize: 14,
        color: '#333333',
        paddingHorizontal: 10,
        paddingVertical: 10,
        lineHeight: 21
    }
});
