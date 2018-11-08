import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { PureComponent } from 'react';

import WhiteSpace from './WhiteSpace';

const maxMenuHeight = 500;
const defaultDuration = 300;

class BottomSlider extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            bottomVal: new Animated.Value(this.props.visible ? 0 : 1)
        };
        this.menuHeight = maxMenuHeight;
    }
    animateTo = (visible) => {
        const duration = defaultDuration;
        if (visible) {
            this.setState({
                visible: true
            }, () => {
                Animated.timing(this.state.bottomVal, {
                    toValue: 0,
                    duration
                }).start();
            });
        } else {
            Animated.timing(this.state.bottomVal, {
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
        if (nextProps.visible === this.props.visible) {
            return;
        }
        this.animateTo(nextProps.visible);
    }
    render() {
        if (!this.state.visible) {
            return null;
        }
        const props = this.props;
        const WrappedView = props.scrollable ? Animated.ScrollView : Animated.View;
        return (
            <View style={StyleSheet.absoluteFill}>
                {props.visible &&
                    <TouchableOpacity
                        style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        onPress={props.onClose}
                    />
                }
                <WrappedView
                    style={[{ position: 'absolute', width: '100%', backgroundColor: 'white' }, props.contentContainerStyle, {
                        bottom: this.state.bottomVal.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -this.menuHeight]
                        })
                    }]}
                    onLayout={this.onMenuLayout}
                >
                    {props.children}
                    <WhiteSpace bottom />
                </WrappedView>
            </View>
        );
    }
}

export default BottomSlider;
