import {
    Animated,
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import React, { PureComponent } from 'react';

import Badge from './Badge';
import Button from 'react-native-scrollable-tab-view/Button';
import PropTypes from 'prop-types';
import { colors, font } from '../Styles/Base';

const WINDOW_WIDTH = Dimensions.get('window').width;

const WEEKS = [
    '周日',
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六'
];

const getMDW = dateStr => {
    const date = new Date(dateStr.replace(/-/g, '/'));
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const time = date.getTime();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const week = time === today.getTime() ? '今天' : WEEKS[date.getDay()];
    return [month, day, week];
};

class TabBarItem extends PureComponent {
    render() {
        const { dateStr, onPressHandler, width, dateColor, weekColor, badge } = this.props;
        const backgroundColor = 'transparent';
        const [month, day, week] = getMDW(dateStr);
        let badgeColor = '';
        switch (badge) {
            // 红
            case 1:
                badgeColor = '#f44528';
                break;
            // 黄
            case 2:
                badgeColor = '#ff8644';
                break;
            // 绿
            case 3:
                badgeColor = '#38d774';
                break;
        }
        const badgeStyle = { position: 'absolute', top: 5, right: 5, backgroundColor: badgeColor };
        return (
            <Button
                accessible={true}
                accessibilityLabel={dateStr}
                accessibilityTraits='button'
                onPress={() => onPressHandler(dateStr)}
            >
                <View>
                    <View style={[styles.tab, { width }]}>
                        <Text style={[{ backgroundColor, color: dateColor, fontSize: font.sm }]}>{month}-{day}</Text>
                        <Text style={[{ backgroundColor, color: weekColor, marginTop: 5, fontSize: font.xs }]}>{week}</Text>
                    </View>
                    {!!badgeColor && <Badge dot style={badgeStyle} />}
                </View>
            </Button>
        );
    }
}


export default class DateTabBar extends PureComponent {
    static propTypes = {
        num: PropTypes.number,
        active: PropTypes.string,
        dates: PropTypes.array,
        flags: PropTypes.object,
        backgroundColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string,
        onPressDate: PropTypes.func
    };

    static defaultProps = {
        num: 6,
        activeTextColor: 'white',
        inactiveTextColor: 'black',
        backgroundColor: 'white'
    };

    constructor(props) {
        super(props);
        this._tabWidth = WINDOW_WIDTH / this.props.num;
        this._containerWidth = WINDOW_WIDTH;
        this.state = {
            isActiveBgShow: false,
            _leftTabBackground: new Animated.Value(0),
            _contentWidth: null
        };
        this.onTabContainerLayout = this.onTabContainerLayout.bind(this);
        this.onContainerLayout = this.onContainerLayout.bind(this);
        this.updateView = this.updateView.bind(this);
        this.updateTabPanel = this.updateTabPanel.bind(this);
        this.animateTabBackground = this.animateTabBackground.bind(this);
        this.updateTabBackground = this.updateTabBackground.bind(this);
    }

    findActivePos(active) {
        let activeIndex = null;
        this.props.dates.some((date, index) => {
            if (date === active) {
                activeIndex = index;
                return true;
            }
        });
        return activeIndex;
    }

    updateView(active, animated = true) {
        const position = this.findActivePos(active);
        if (typeof position !== 'number') {
            return;
        }
        const pageOffset = position % 1;
        const tabCount = this.props.dates.length;
        const lastTabPosition = tabCount - 1;

        if (!tabCount === 0 || position < 0 || position > lastTabPosition) {
            return;
        }

        this.updateTabPanel(position, pageOffset, animated);
        this.updateTabBackground(position, pageOffset, tabCount, animated);
    }

    updateTabPanel(position, pageOffset, animated = true) {
        const containerWidth = this._containerWidth;
        const tabWidth = this._tabWidth;
        const tabOffset = tabWidth * position;
        const absolutePageOffset = pageOffset * tabWidth;
        let newScrollX = tabOffset + absolutePageOffset;

        // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
        newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * tabWidth) / 2;
        newScrollX = newScrollX >= 0 ? newScrollX : 0;

        if (Platform.OS === 'android') {
            this._scrollView.scrollTo({ x: newScrollX, y: 0, animated });
        } else {
            const rightBoundScroll = this.state._contentWidth - this._containerWidth;
            newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
            this._scrollView.scrollTo({ x: newScrollX, y: 0, animated });
        }

    }

    animateTabBackground(toValue, animated) {
        Animated.timing(this.state._leftTabBackground, {
            toValue,
            duration: animated ? 300 : 0
        }).start();
    }

    updateTabBackground(position, pageOffset, tabCount, animated = true) {
        const lineLeft = this._tabWidth * position;

        if (position < tabCount - 1) {
            const nextTabLeft = lineLeft + this._tabWidth;
            const newLineLeft = (pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft);
            this.animateTabBackground(newLineLeft, animated);
        } else {
            this.animateTabBackground(lineLeft, animated);
        }
    }

    render() {
        const tabBackgroundStyle = {
            position: 'absolute',
            width: this._tabWidth,
            backgroundColor: colors.primary,
            borderRadius: 5,
            top: 0,
            bottom: 0
        };

        const dynamicTabBackground = {
            left: this.state._leftTabBackground
        };

        return <View
            style={[styles.container, { backgroundColor: this.props.backgroundColor }]}
            onLayout={this.onContainerLayout}
        >
            <ScrollView
                ref={(scrollView) => { this._scrollView = scrollView; }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                directionalLockEnabled={true}
                bounces={false}
                scrollEnabled={false}
                scrollsToTop={false}
            >
                <View
                    style={[styles.tabs, { width: this.state._contentWidth }]}
                    onLayout={this.onTabContainerLayout}
                >
                    {this.state.isActiveBgShow && !!this.props.dates.find(item => item === this.props.active) &&
                        <Animated.View style={[tabBackgroundStyle, dynamicTabBackground]} />}
                    {this.props.dates.map((dateStr) => {
                        const { active, activeTextColor, inactiveTextColor, onPressDate, flags } = this.props;
                        const isTabActive = active === dateStr;
                        const dateColor = isTabActive ? activeTextColor : inactiveTextColor;
                        const weekColor = isTabActive ? activeTextColor : '#9f9f9f';
                        return (
                            <TabBarItem
                                badge={flags && flags[dateStr]}
                                key={dateStr}
                                dateStr={dateStr}
                                width={this._tabWidth}
                                dateColor={dateColor}
                                weekColor={weekColor}
                                onPressHandler={onPressDate}
                            />
                        );
                    })}
                </View>
            </ScrollView>
        </View>;
    }

    componentWillReceiveProps(nextProps) {
        // If the tabs change, force the width of the tabs container to be recalculated
        // if (JSON.stringify(this.props.dates) !== JSON.stringify(nextProps.dates) && this.state._contentWidth) {
        //     this.setState({ _contentWidth: null });
        // }
        if (nextProps.active !== this.props.active) {
            this.updateView(nextProps.active);
        }
    }

    onTabContainerLayout(e) {
        this.setState({
            _contentWidth: e.nativeEvent.layout.width,
            isActiveBgShow: true
        }, () => {
            this.updateView(this.props.active, false);
        });
    }

    onContainerLayout(e) {
        this._containerWidth = e.nativeEvent.layout.width;
        this.updateView(this.props.active, false);
    }
}

const styles = StyleSheet.create({
    tab: {
        alignItems: 'center',
        paddingVertical: 8,
        height: 50,
        width: 60
    },
    container: {
        paddingVertical: 5
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
