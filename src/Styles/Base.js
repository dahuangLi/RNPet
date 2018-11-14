// import {Dimensions, NativeModules, PixelRatio, Platform, StyleSheet} from 'react-native';

import {Dimensions, PixelRatio } from 'react-native';

import { Deviceinfo } from '../Utils';
// import semver from 'semver';
// const {LCBStatusBarManager} = NativeModules;

export const window = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
};

export const width = {
    borderBase: 1 / PixelRatio.get()
};

// iPhoneX SafeArea
export const safeArea = {
    default: {
        top: 20
    },
    portrait: {
        top: Deviceinfo.isIphoneX() ? 44 : 20,
        left: 0,
        right: 0,
        bottom: Deviceinfo.isIphoneX() ? 34 : 0
    },
    landscape: {
        top: 20,
        left: 44,
        right: 44,
        bottom: 21
    }
};

export const colors = {
    primary: '#4E8CEE',
    secondary: '#254B5A',
    tertiary: '#5DA6A7',
    red: '#f44528',
    yellow: '#ffcd6b',
    green: '#44d97c',
    // 文本颜色
    textBase: '#666',
    textLight: '#999',
    textExtraLight: '#ccc',
    textDark: '#333',
    // 边框颜色
    borderBase: '#d7d7dc',
    borderLight: '#e9e9e9',
    borderShadow: '#d7d7dc'
};

export const fill = {
    body: '#f4f4f8',
    mask: 'rgba(0, 0, 0, 0.5)',
    maskDark: 'rgba(0, 0, 0, 0.75)'
};

// 间距
export const spacing = {
    sm: 6,
    md: 10,
    lg: 15,
    xl: 20
};

export const height = {
    listItem: 50
};

export const font = {
    xs: 12,
    sm: 13,
    md: 15,
    lg: 18,
    primary: 'Cochin'
};

// 图标大小
export const icon = {
    xxs: 9,
    xs: 12,
    md: 16,
    lg: 18
};

// export const paddingTop = Platform.select({
//     ios: Deviceinfo.isIphoneX() ? safeArea.portrait.top : safeArea.default.top,
//     android: semver.gte(Deviceinfo.getVersion(), '2.0.0') && Deviceinfo.getAPILevel() >= 23 ? (LCBStatusBarManager.statusBarHeight) || 25 : 0});

// export default StyleSheet.create({
//     pageContainer: {
//         backgroundColor: fill.body
//     },
//     middle: {
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     drawerContainer: {
//         ...Platform.select({
//             ios: Deviceinfo.isIphoneX() ? {
//                 paddingTop: safeArea.portrait.top,
//                 paddingBottom: safeArea.portrait.bottom
//             } : {
//                 paddingTop: safeArea.default.top
//             },
//             android: semver.gte(Deviceinfo.getVersion(), '2.0.0') && Deviceinfo.getAPILevel() >= 23 ? {
//                 paddingTop: LCBStatusBarManager.statusBarHeight || 25
//             } : {
//                 paddingTop: 0
//             }
//         }),
//         backgroundColor: fill.body
//     }
// });
