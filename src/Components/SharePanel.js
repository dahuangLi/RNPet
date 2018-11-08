import { Image, NativeModules, StyleSheet, TouchableOpacity, View, TextInput, Dimensions, PixelRatio } from 'react-native';
import { colors, font, spacing } from '../Styles/Base';

import Badge from './Badge';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Modal from './Modal';
import PropTypes from 'prop-types';
import React from 'react';
import Text from './Text';

const { width } = Dimensions.get('window');
const { SocialShareModule } = NativeModules;

// 支持的项目
const itemMap = {
    wechat: {
        img: require('./Assets/wchat.png'),
        text: '微信',
        method: 'shareWithWechat',
        scene: 0
    },
    friend: {
        img: require('./Assets/friend.png'),
        text: '朋友圈',
        method: 'shareWithWechat',
        scene: 1
    },
    qq: {
        img: require('./Assets/QQ.png'),
        text: 'QQ',
        method: 'shareWithQQ',
        scene: 0
    },
    space: {
        img: require('./Assets/space.png'),
        text: 'QQ空间',
        method: 'shareWithQQ',
        scene: 1
    }
};

// 默认项目和排序
const defaultItems = [
    {
        key: 'wechat'
    },
    {
        key: 'friend'
    },
    {
        key: 'qq'
    },
    {
        key: 'space'
    }
];

const TaskItem = ({ img, text, badge, onPress }) =>
    <TouchableOpacity
        style={styles.itemBox}
        onPress={onPress}
    >
        <Image style={styles.ImageStyle} source={img} />
        <Text style={styles.itemText}>{text}</Text>
        {!!badge &&
            <Badge style={styles.icon} text={badge} />}
    </TouchableOpacity>;

/**
 * @param props.items eg: defaultItems [{key: 'wechat', text: '微信'}]
 * @param props.params https://confluence.lechebang.com/display/Tech/SocialShareModule
 */
const SharePanel = props => {
    let items = props.items || defaultItems;
    items = items.map(item => {
        return {
            ...itemMap[item.key],
            ...item
        };
    });
    const length = props.customTitleValue ? props.customTitleValue.length : 0;
    return (
        <Modal
            popup
            fixed
            maskClosable
            animationType="slide-up"
            visible={props.visible}
            onClose={props.onClose}
        >
            <KeyboardAwareScrollView>
                {!!props.customTitle && <View style={styles.customTitleBox}>
                    <View style={styles.customTitleHeaderBox}>
                        <Text style={styles.customTitleHeaderTitleText}>分享标题</Text>
                        <Text style={styles.customTitleHeaderWordText}>（建议不超过36字，超过部分可能会被隐藏）</Text>
                    </View>
                    <View style={styles.customTitleContentBox}>
                        <Image
                            style={styles.img}
                            source={{ uri: props.params.thumbnailUrl }}
                        />
                        <TextInput
                            multiline={true}
                            style={styles.textInput}
                            underlineColorAndroid='transparent'
                            returnKeyType={'done'}
                            blurOnSubmit={true}
                            placeholder={props.placeholder || '最佳购车时机，政策给力，购车即送大礼包！'}
                            placeholderTextColor={'#333333'}
                            value={props.customTitleValue}
                            onChangeText={value => props.onChangeText(value)}
                        />
                    </View>
                    <View style={styles.customTitleFooterBox}>
                        <Text style={styles.customTitleFooterText}>
                            {
                                length > 36 ?
                                    <Text>
                                        超出<Text style={{ color: '#EE6723' }}>{length - 36}</Text>个字
                                    </Text> :
                                    <Text>
                                        还剩<Text>{36 - length}</Text>个字
                                    </Text>
                            }
                        </Text>
                    </View>
                </View>}
                <View style={styles.titleBox}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#fff', '#D8D8D8']} style={styles.line} />
                    <View style={styles.txtBox}>
                        <Text style={styles.titleTxt}>分享至</Text>
                    </View>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#D8D8D8', '#fff']} style={styles.line} />
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: spacing.lg }}>
                    {
                        items.map(item =>
                            <TaskItem
                                {...item}
                                onPress={() => {
                                    if (!SocialShareModule) {
                                        alert('Native暂不支持分享');
                                        return;
                                    }
                                    let copyParams = Object.assign({}, props.params);
                                    if (props.customTitle) {
                                        copyParams = Object.assign({}, props.params, { title: props.customTitleValue });
                                    }
                                    const shareMethod = SocialShareModule[item.method];
                                    if (props.params.mediaType === 3) {
                                        if (!(item.method === 'shareWithWechat' && item.scene === 0)) {// 不支持小程序分享的自动转成H5分享
                                            shareMethod && shareMethod({
                                                ...props.params,
                                                mediaType: 2,
                                                scene: item.scene
                                            });
                                            props.onClose && props.onClose();
                                            return;
                                        }
                                    }
                                    shareMethod && shareMethod({
                                        ...copyParams,
                                        scene: item.scene
                                    }).then(() => props.addRecord(item));
                                    props.onClose && props.onClose();
                                }}
                            />
                        )
                    }
                </View>
            </KeyboardAwareScrollView>
        </Modal>
    );
};

SharePanel.propsTypes = {
    items: PropTypes.array,
    params: PropTypes.object
};

export default SharePanel;

const styles = StyleSheet.create({
    customTitleBox: {
        marginHorizontal: 15,
        backgroundColor: '#FFFFFF'
    },
    customTitleHeaderBox: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 22,
        marginBottom: 13
    },
    customTitleHeaderTitleText: {
        lineHeight: 21,
        fontSize: 15,
        color: colors.textBase
    },
    customTitleHeaderWordText: {
        lineHeight: 21,
        fontSize: 12,
        color: '#3F3F3F'
    },
    customTitleContentBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: 70,
        backgroundColor: '#FFFFFF',
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#CCCCCC'
    },
    img: {
        height: 50,
        width: 50,
        margin: 10
    },
    textInput: {
        // 文本垂直方向对齐方式
        textAlignVertical: 'top',
        height: 34,
        width: width - 118,
        fontSize: 12,
        color: '#333333',
        lineHeight: 17,
        marginTop: 15,
        padding: 0
    },
    ImageStyle: {
        width: 50,
        height: 50,
        marginBottom: spacing.md
    },
    customTitleFooterBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 10
    },
    customTitleFooterText: {
        lineHeight: 17,
        fontSize: 12,
        color: colors.textLight
    },

    itemBox: {
        width: (100 / 3) + '%',
        paddingTop: 4,
        paddingBottom: spacing.lg,
        alignItems: 'center'
    },
    line: {
        height: 1,
        width: 90
    },
    titleBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: spacing.lg,
        alignItems: 'center'
    },
    txtBox: {
        paddingHorizontal: spacing.lg
    },
    titleTxt: {
        color: colors.textDark,
        fontSize: font.md
    },
    itemText: {
        fontSize: font.xs,
        color: colors.textLight
    },
    icon: {
        position: 'absolute',
        top: 0,
        left: '50%'
    }
});
