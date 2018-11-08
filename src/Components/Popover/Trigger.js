import {
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native';
import React, { PureComponent } from 'react';

import Menu from './Menu';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

export default class PopoverTrigger extends PureComponent {
    state = {
        menuVisible: false,
        menuPos: {}
    };

    componentDidMount() {
        const menuTop = typeof this.props.menuTop === 'number' ? this.props.menuTop : 14;
        const { top, right } = this.props;
        // Bug notes: https://stackoverflow.com/questions/30096038/react-native-getting-the-position-of-an-element
        setTimeout(() => {
            this.touchRef.measure((fx, fy, width, height, px, py) => {
                // android ios 给的x值不一样，无法理解，按现象兼容
                const xVal = Platform.OS === 'ios' ? fx : px;
                this.setState({
                    menuPos: {
                        top: typeof top === 'number' ? top : py + height + menuTop,
                        right: typeof right === 'number' ? right : WINDOW_WIDTH - xVal - width / 2 - 12
                    }
                });
            });
        }, 0);
    }

    render() {
        const {
            style,
            children,
            menu
        } = this.props;
        return (
            <TouchableOpacity
                ref={ref => this.touchRef = ref}
                onPress={() => {
                    this.setState({
                        menuVisible: true
                    });
                }}
                style={style}
            >
                {children}
                <Menu
                    visible={this.state.menuVisible}
                    position={this.state.menuPos}
                    items={menu.map(item => ({
                        ...item,
                        onPress: () => {
                            this.setState({
                                menuVisible: false
                            }, () => {
                                setTimeout(() => {
                                    item.onPress && item.onPress();
                                }, 0);
                            });
                        }
                    }))}
                    onPressMask={() => {
                        this.setState({
                            menuVisible: false
                        });
                    }}
                />
            </TouchableOpacity>
        );
    }
}
