import {
    Animated,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import React, { PureComponent } from 'react';

import Svg from '../SVGUri/Svg';
import { colors } from '../Styles/Base';

class TickWrap extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            translateX: new Animated.Value(this.props.openTick ? 30 : 0)
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.openTick !== this.props.openTick) {
            Animated.timing(this.state.translateX, {
                toValue: nextProps.openTick ? 30 : 0,
                duration: 300
            }).start();
        }
    }
    render() {
        const { children, activeTick, style, onPress, onPressTick } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={style}
                onPress={onPress}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.tickBox}
                    onPress={onPressTick}
                >
                    <Svg title='clinentcheck' color={activeTick ? colors.primary : '#e6e6e6'} size={20}/> 
                </TouchableOpacity>
                <Animated.View
                    style={[styles.contentBox, { transform: [{ translateX: this.state.translateX }] }]}
                >
                    {children}
                </Animated.View>
            </TouchableOpacity>
        );
    }
}

export default TickWrap;

const styles = StyleSheet.create({
    tickBox: {
        position: 'absolute',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
});
