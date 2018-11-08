import React from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { spacing, width as widthStyle } from '../Styles';

const {width} = Dimensions.get('window');
export default (props) => {
    return (
        <View style={{position: 'absolute', height: '100%', width: '100%'}}>
            <View style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'black', opacity: 0.5
            }}/>
            <View style={{
                position: 'absolute',
                left: 0,
                right: 0,
                elevation: 999,
                alignItems: 'center',
                zIndex: 10000,
                top: props.top
            }}>
                <View style={{
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    borderWidth: widthStyle.borderBase,
                    borderColor: '#ddd',
                    width: props.width || 0.75 * width,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '100%',
                        borderBottomWidth: widthStyle.borderBase,
                        borderBottomColor: '#ddd',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: spacing.lg,
                        paddingVertical: spacing.lg
                    }}>{props.content}</View>
                    <TouchableOpacity
                        style={{width: '100%', height: 50, alignItems: 'center', justifyContent: 'center'}}
                        onPress={props.onPress} activeOpacity={1}>
                        <Text style={{fontSize: 16, color: '#fa5a4b'}}>{props.sure}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

