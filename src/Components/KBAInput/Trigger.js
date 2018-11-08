import { KeyboardAvoidingView, Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { PureComponent } from 'react';

import Input from './Input';

class Trigger extends PureComponent {
    state = {
        modalVisible: false
    };
    openModal = () => {
        this.setState({
            modalVisible: true
        });
    };
    closeModal = () => {
        this.setState({
            modalVisible: false
        });
    };
    renderModal() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={this.closeModal}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,.75)' }}
                    onPress={this.closeModal}
                >
                    <KeyboardAvoidingView
                        style={{
                            position: 'absolute',
                            bottom: 0
                        }}
                        behavior={Platform.OS === 'ios' ? 'position' : null}
                    >
                        <Input
                            {...this.props.input}
                            value={this.props.inputValue}
                            onChangeText={this.props.onInputChange}
                            onCancel={this.closeModal}
                            onSubmit={() => {
                                this.closeModal();
                                this.props.onInputSubmit();
                            }}
                        />
                    </KeyboardAvoidingView>
                </TouchableOpacity>
            </Modal>
        );
    }
    render() {
        const { children } = this.props;
        return (
            <View
                style={this.props.style}
            >
                {children && React.isValidElement(children) && React.cloneElement(children, {
                    onClick: this.openModal
                })}
                {this.renderModal()}
            </View>
        );
    }
}

export default Trigger;

