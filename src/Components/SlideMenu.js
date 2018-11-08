import {
    Animated,
    FlatList,
    Image,
    Platform,
    SectionList,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import React, { PureComponent } from 'react';
import { colors, fill, font, spacing } from '../Styles/Base';

import List from './AList';
import Svg from '../SVGUri/Svg';
import Text from './Text';

const maxMenuHeight = 300;
const defaultDuration = 300;

class SlideMenu extends PureComponent {
    static defaultProps = {
        level: 1
    };
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.isShow,
            topVal: new Animated.Value(this.props.isShow ? 0 : 1)
        };
        this.menuHeight = maxMenuHeight;
    }
    animateTo = (isShow) => {
        const duration = defaultDuration;
        if (isShow) {
            this.setState({
                visible: true
            }, () => {
                Animated.timing(this.state.topVal, {
                    toValue: 0,
                    duration
                }).start();
            });
        } else {
            Animated.timing(this.state.topVal, {
                toValue: 1,
                duration
            }).start(() => {
                this.setState({
                    visible: false
                });
            });
        }
    };
    onMenuLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        this.menuHeight = height;
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.isShow === this.props.isShow) {
            return;
        }
        this.animateTo(nextProps.isShow);
    }
    // 获取侧栏数据
    getSideList = () => {
        const { active, level, list } = this.props;
        if (!(active instanceof Array)) {
            return null;
        }
        const mainListActive = active[0];
        const activeItem = list.find(({value}) =>
            value === mainListActive);
        if (!activeItem || !activeItem.children) {
            return null;
        }
        const sideList = activeItem.children;
        if (!sideList.length) {
            return null;
        }
        if (level === 3) {
            return sideList.map(item => {
                return {
                    ...item,
                    data: item.children
                };
            });
        } else {
            return [{
                label: '',
                value: null,
                data: sideList
            }];
        }
    };
    render() {
        const { isShow, active, onPressMask, onPressItem, onPressSubItem, list, level, style, contentContainerStyle } = this.props;
        const sideList = this.getSideList();
        return this.state.visible ?
            <View
                style={[styles.bgBox, style]}
                removeClippedSubviews={Platform.OS === 'android'}
            >
                {isShow &&
                    <TouchableOpacity
                        style={styles.mask}
                        activeOpacity={1}
                        onPress={onPressMask}
                    />
                }
                <Animated.View
                    style={[styles.contentBox, contentContainerStyle, {
                        top: this.state.topVal.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -this.menuHeight]
                        })
                    }]}
                    onLayout={this.onMenuLayout}
                >
                    <View
                        style={{ flex: 29, height: '100%' }}
                    >
                        <FlatList
                            keyExtractor={(item, index) => index}
                            data={list}
                            extraData={{
                                active: this.props.active
                            }}
                            renderItem={({item, index}) => {
                                const isActive = active instanceof Array ? active[0] === item.value : active === item.value;
                                return (
                                    <List.Item
                                        disabled
                                        style={sideList && isActive && { backgroundColor: fill.body }}
                                        onClick={() => onPressItem(item, index)}
                                        extra={isActive && !sideList && <Svg title={'gou'} size={15} color={colors.primary} />}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            {!!item.imgUrl &&
                                            <Image
                                                style={styles.icon}
                                                source={{uri: item.imgUrl}}
                                            />
                                            }
                                            {isActive
                                                ? <Text style={styles.selectTxt}>{item.label}</Text>
                                                : <Text style={styles.normalTxt}>{item.label}</Text>
                                            }
                                        </View>
                                    </List.Item>
                                );
                            }}
                        />

                    </View>
                    {sideList &&
                        <View
                            style={{ flex: 46, height: '100%', backgroundColor: fill.body }}
                        >
                            <SectionList
                                keyExtractor={(item, index) => index}
                                sections={sideList}
                                extraData={{
                                    active: this.props.active
                                }}
                                renderItem={({item, section, index}) => {
                                    const isActive = level === 3 ? active[2] === item.value : active[1] === item.value;
                                    return (
                                        <List.Item
                                            disabled
                                            style={{ backgroundColor: fill.body }}
                                            onClick={() => onPressSubItem(item, section, index)}
                                            extra={isActive && <Svg title={'gou'} size={20} color={colors.primary} />}
                                        >
                                            {isActive
                                                ? <Text style={styles.selectTxt}>{item.label}</Text>
                                                : item.label
                                            }
                                        </List.Item>
                                    );
                                }}
                                renderSectionHeader={({section: {label}}) => !!label && (
                                    <View style={styles.sideTitle}>
                                        <Text style={styles.titleText}>
                                            {label}
                                        </Text>
                                    </View>
                                )}
                            />

                        </View>
                    }
                </Animated.View>
            </View> : null;
    }

}

export default SlideMenu;

const styles = StyleSheet.create({
    mask: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.75)'
    },
    bgBox: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        top: 41,
        position: 'absolute'
    },
    contentBox: {
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        maxHeight: maxMenuHeight,
        backgroundColor: '#fff'
    },
    icon: {
        width: 35,
        height: 35,
        marginRight: 3
    },
    normalTxt: {
        fontSize: font.md,
        color: colors.textDark
    },
    selectTxt: {
        fontSize: font.md,
        color: colors.primary
    },
    sideTitle: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: 25,
        paddingLeft: spacing.lg
    },
    titleText: {
        fontSize: font.xs,
        color: colors.textBase
    }
});
