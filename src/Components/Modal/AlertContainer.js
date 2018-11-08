import { ScrollView, Text } from 'react-native';

import Modal from './Modal';
/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import { colors } from '../../Styles/Base';

export default class AlertContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    onClose = (callback) => {
        this.setState({
            visible: false
        }, () => {
            setTimeout(callback, 100);
        });
    };

    render() {
        const { title, actions, content, onAnimationEnd } = this.props;
        const footer = actions.map(button => {
            // tslint:disable-next-line:only-arrow-functions
            const orginPress = button.onPress || function () { };
            button.onPress = () => {
                // 改一下orginPress的调用时机，到onClose结束之后
                // 修复在onPress里跳转页面，导致modal报错问题
                this.onClose(orginPress);
                // const res = orginPress();
                // if (res && res.then) {
                //     res.then(() => {
                //         this.onClose();
                //     });
                // } else {
                //     this.onClose();
                // }
            };
            return button;
        });

        return (
            <Modal
                transparent
                title={title}
                visible={this.state.visible}
                footer={footer}
                onAnimationEnd={onAnimationEnd}
                bodyStyle={{
                    marginTop: title ? 8 : 0,
                    paddingHorizontal: 12,
                    alignItems: 'center'
                }}
            >
                <ScrollView>
                    <Text style={{
                        color: colors.textBase,
                        fontSize: 15,
                        lineHeight: 20,
                        textAlign: 'center'
                    }}>{content}</Text>
                </ScrollView>
            </Modal>
        );
    }
}
