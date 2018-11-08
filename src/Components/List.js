import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    PixelRatio
} from 'react-native';
import Svg from '../SVGUri/Svg';
import Text from './Text';

/**
 *
 * 其中除了listLeftName必须之外，其他都非必须
 *
 *
 * 透明度
 * @props.activeOpacity: 透明度
 *
 * 点击操作
 * @props.onPress: 点击事件
 *
 * 页面style
 * @props.style: list style
 * @props.pageStyle: list page style
 *
 * 左侧
 * @props.listLeftType: img为照片、element为自定义element、其他为文本text【默认为text】
 * @props.listLeftTextStyle: listText style
 * @props.listLeftName: listLeftName【必须】
 * @props.listLeftImg: listImg
 * @props.listLeftImgStyle: listImg style
 * @props.listLeftElement: element
 *
 * 右侧
 * @props.listRightType: element为自定义element、其他为文本text【默认为text】
 * @props.listRightElement: element
 * @props.listRightName: listRightName【默认不显示】
 * @props.listRightContainerStyle: listRightContainerStyle
 * @props.listRightTextStyle: listRightTextStyle
 *
 * 右侧svg
 * @props.noListSvg: noListSvg【true表示显示，false表示显示，默认显示】
 * @props.svgContainerStyle: svgContainerStyle
 * @props.svgSize: svg size
 * @props.svgColor: svg color
 *
 * borderBottom
 * @props.showBorder: 【false表示显示，true表示不显示，默认不显示】
 * @props.borderMarginLeft: borderMarginLeft
 * @props.borderBottomWidth: borderBottomWidth
 */
export default (props) => {
    return (
        <TouchableOpacity
            activeOpacity={(props.activeOpacity || props.activeOpacity === 0) ? props.activeOpacity : 1}
            onPress={props.onPress || (() => {
            })}
            style={[styles.Container, props.style]}>
            <View
                style={[styles.pageContainer, props.pageStyle]}>
                {/* 左侧 */}
                {
                    props.listLeftType === 'img' ?
                        <View style={{flex: 1}}>
                            <Image source={props.listLeftImg} style={[{
                                width: 78,
                                height: 35
                            }, props.listLeftImgStyle]}/>
                        </View> :
                        props.listLeftType === 'element' ?
                            props.listLeftElement :
                            <Text style={[{
                                flex: 1,
                                fontSize: 15,
                                color: '#333',
                                fontWeight: '300'
                            }, props.listLeftTextStyle]}>{props.listLeftName}</Text>
                }
                {/* 右侧 */}
                {
                    props.listRightType === 'element' ?
                        props.listRightElement :
                        !!props.listRightName &&
                        <View style={[{
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            justifyContent: 'flex-end'
                        }, props.listRightContainerStyle]}>
                            <Text style={[{
                                fontSize: 15,
                                color: '#333',
                                marginRight: 5
                            }, props.listRightTextStyle]}>{props.listRightName || ''}</Text>
                        </View>
                }
                {/* 右侧svg */}
                {
                    !props.noListSvg &&
                    <View style={[{flexDirection: 'row', flexWrap: 'nowrap'}, props.svgContainerStyle]}>
                        <Svg title="arrow-r" size={props.svgSize || 8} color={props.svgColor || '#c2c3c3'}/>
                    </View>
                }
            </View>
            {/* borderBottom */}
            <View
                style={[{
                    borderBottomColor: '#e9e9e9',
                    marginLeft: (props.borderMarginLeft || props.borderMarginLeft === 0) ? props.borderMarginLeft : 15
                }, props.showBorder ? {borderBottomWidth: props.borderBottomWidth || (1 / PixelRatio.get())} : {}]}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#fff'
    },
    pageContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        paddingRight: 15
    }
});
