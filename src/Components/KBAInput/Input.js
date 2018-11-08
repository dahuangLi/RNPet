import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { colors, width as widthStyle, font } from '../../Styles';

const { width } = Dimensions.get('window');

const AvoidingInput = props => (
    <View style={styles.reasonListWrap}>
        <View style={styles.titleRow}>
            <TouchableOpacity onPress={props.onCancel}>
                <Text style={styles.cancel}>取消</Text>
            </TouchableOpacity>
            <Text style={styles.mainTitle}>{props.title}</Text>
            <TouchableOpacity onPress={props.onSubmit}>
                <Text style={styles.sure}>确认</Text>
            </TouchableOpacity>
        </View>
        <TextInput
            autoFocus={true}
            blurOnSubmit={false}
            underlineColorAndroid='transparent'
            keyboardType={props.keyboardType}
            value={props.value}
            onChangeText={props.onChangeText}
            multiline={!!props.numberOfLines}
            // numberOfLines looks doesn't work on both ios and android
            numberOfLines={props.numberOfLines}
            placeholder={props.placeholder}
            style={[styles.textArea, props.numberOfLines && { height: 20 * props.numberOfLines }]}
        />
    </View>
);

AvoidingInput.defaultProps = {
    keyboardType: 'default',
    title: '',
    placeholder: ''
};

export default AvoidingInput;

const styles = StyleSheet.create({
    reasonListWrap: {
        paddingBottom: 12,
        width,
        backgroundColor: '#F4F3F8'
    },
    titleRow: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40
    },
    cancel: {
        fontSize: font.md,
        color: colors.textLight
    },
    mainTitle: {
        fontSize: 16,
        color: colors.textBase
    },
    sure: {
        fontSize: font.md,
        color: colors.primary
    },
    textArea: {
        // height: 75,
        borderRadius: 5,
        borderWidth: widthStyle.borderBase,
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        marginHorizontal: 15,
        textAlignVertical: 'top',
        padding: 7,
        fontSize: 13
    }
});
