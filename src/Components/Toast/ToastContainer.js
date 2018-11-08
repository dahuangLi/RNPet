import AntdToastContainer from 'antd-mobile-rn/lib/toast/ToastContainer';
import React from 'react';
import { StyleSheet } from 'react-native';
import ToastContainerStyle from 'antd-mobile-rn/lib/toast/style';

const ToastContainer = props =>
    <AntdToastContainer
        styles={styles}
        {...props}
    />;

const styles = StyleSheet.create({
    ...ToastContainerStyle,
    innerWrap: {
        ...ToastContainerStyle.innerWrap,
        minWidth: 40
    }
});

export default ToastContainer;
