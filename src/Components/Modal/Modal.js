import { ActivityIndicator, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import baseStyles, { colors, font, spacing, width } from '../../Styles/Base';

import { Modal as AntdModal } from 'antd-mobile-rn';
import List from '../AList';
import ModalStyle from 'antd-mobile-rn/lib/modal/style';
import React from 'react';
import Text from '../Text';
import WhiteSpace from '../WhiteSpace';
import alert from './Alert';

const styles = StyleSheet.create({
    ...ModalStyle,
    innerContainer: {
        ...ModalStyle.innerContainer,
        paddingTop: 15
    },
    buttonText: {
        ...ModalStyle.buttonText,
        fontSize: 16,
        color: colors.primary
    },
    buttonWrapV: {
        ...ModalStyle.buttonWrapV,
        paddingVertical: 15
    },
    buttonWrapH: {
        ...ModalStyle.buttonWrapH,
        height: 45
    },
    // Captcha

    captchaTitle: {
        justifyContent: 'center',
        alignItems: 'center'

    },
    tabTxt: {
        textAlign: 'center',
        fontSize: 15,
        color: '#666'
    },
    textView: {
        flexDirection: 'row',
        paddingTop: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 0
    },
    textInput: {
        borderWidth: width.borderBase,
        borderColor: '#c1c1c1',
        width: 130,
        borderRadius: 4,
        height: 35,
        textAlign: 'left',
        fontSize: 15,
        paddingLeft: 2
    
    },
    captchaImgWrap: {
        width: 100,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    captchaImg: {
        width: '100%',
        height: '100%'
    },
    captchaView: {
        paddingTop: 10
    },
    captchaMsg: {
        color: '#f44528',
        fontSize: 12
    },
    // Picker
    pickerItem: {
        height: 50,
        paddingHorizontal: spacing.lg,
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.borderBase
    },
    activePickerItem: {
        borderBottomColor: colors.primary
    },
    pickerText: {
        fontSize: font.md,
        color: colors.textDark
    },
    activePickerText: {
        color: colors.primary
    }
});

const Modal = props => {
    if (props.popup) {
        const WrapperView = props.fixed ? View : ScrollView;
        return (
            <AntdModal
                popup
                bodyStyle={{ maxHeight: 560 }}
                maskClosable={true}
                animationType="slide-up"
                {...props}
            >
                <WrapperView>
                    {props.children}
                    <WhiteSpace bottom />
                </WrapperView>
            </AntdModal>
        );
    } else if (props.picker) {
        return (
            <AntdModal
                popup
                maskClosable={true}
                animationType="slide-up"
                visible={props.visible}
                onClose={props.onClose}
            >
                <View
                    style={{ maxHeight: 510 }}
                >
                    {!!props.title &&
                        <View style={[styles.pickerItem, baseStyles.middle]}>
                            <Text style={{ fontSize: 16, color: colors.textDark }}>{props.title}</Text>
                        </View>
                    }
                    <ScrollView>
                        {
                            props.data.map((item, index) => {
                                const isActive = props.selected === item.value;
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => props.onSelect(item)}
                                        style={[styles.pickerItem, isActive && styles.activePickerItem]}
                                    >
                                        <Text style={[styles.pickerText, isActive && styles.activePickerText]}>{item.label}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                        <WhiteSpace bottom />
                    </ScrollView>
                </View>
            </AntdModal>
        );
    } else if (props.picker2) {
        return (
            <AntdModal
                popup
                maskClosable={true}
                animationType="slide-up"
                visible={props.visible}
                onClose={props.onClose}
            >
                <View
                    style={{ maxHeight: 510 }}
                >
                    <ScrollView>
                        {
                            props.data.map(item => {
                                const isActive = props.selected === item.value;
                                return (
                                    <List.Item
                                        key={item.value}
                                        onClick={() => props.onSelect(item)}
                                    >
                                        <Text style={[styles.pickerText, isActive && styles.activePickerText]}>{item.label}</Text>
                                    </List.Item>
                                );
                            })
                        }
                        <WhiteSpace bottom />
                    </ScrollView>
                </View>
            </AntdModal>
        );
    } else if (props.captcha) {
        return (
            <AntdModal
                visible={props.visible}
                maskClosable
                transparent
                footer={[
                    {
                        text: '取消',
                        onPress: props.onClose
                    },
                    {
                        text: '确定',
                        onPress: props.onSubmit
                    }
                ]}
                style={{ paddingTop: 0 }}
                bodyStyle={{ paddingBottom: 10, paddingTop: 20 }}
            >
                <Text style={styles.tabTxt}>{props.title || '需要确认您的身份'}</Text>
                <View style={styles.textView}>
                    <TextInput
                        value={props.value}
                        placeholder="请输入右图字母"
                        // keyboardType="numeric"
                        // maxLength={4}
                        returnKeyType="done"
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        onChangeText={props.onChangeText}
                    />
                    <View style={styles.captchaImgWrap}>
                        {props.imgUri
                            ? <Image style={styles.captchaImg} source={{ uri: props.imgUri }} />
                            : <ActivityIndicator />
                        }
                    </View>
                </View>
                {props.showCaptchaMessage && <View style={styles.captchaView}>
                    <Text style={styles.captchaMsg}>{props.showCaptchaMessage.msg}</Text>
                </View>}


            </AntdModal>
        );
    }
    return <AntdModal styles={styles} {...props} />;
};

Modal.alert = alert;

export default Modal;
