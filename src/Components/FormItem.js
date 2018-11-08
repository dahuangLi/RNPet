import React, { PureComponent } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { colors, font } from '../Styles/Base';

import List from './AList';
import Modal from './Modal';
import Switch from './Switch';

// 一些特殊类型的表单输入项
class FormItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isPickerVisible: false
        };
    }
    hidePicker = () => {
        this.setState({
            isPickerVisible: false
        });
    };
    showPicker = () => {
        this.setState({
            isPickerVisible: true
        });
    };
    onPickerSelect = ({value}) => {
        this.hidePicker();
        const { onValueChange } = this.props;
        onValueChange && onValueChange(value);
    };
    render() {
        const {
            type,
            label,
            value,
            placeholder,
            textAlign,
            // 输入框属性
            maxLength,
            keyboardType,
            returnKeyType,
            // 单选输入选项
            options,
            onValueChange
        } = this.props;
        let optionsSelected = null;
        // app-项目类型 1-勾选 2-输入 3-单选 4-乘积型(天数*保额) 5-勾选+输入
        switch (type) {
            case 1:
                return (
                    <List.Item
                        disabled
                        extra={
                            <Switch
                                value={value}
                                onValueChange={onValueChange}
                            />
                        }
                    >
                        {label}
                    </List.Item>
                );
            case 2:
                return (
                    <List.Item
                        disabled
                        extra={
                            <TextInput 
                                underlineColorAndroid="transparent"
                                keyboardType={keyboardType || 'default'}
                                returnKeyType={returnKeyType || 'default'}
                                maxLength={maxLength}
                                value={value}
                                placeholder={placeholder}
                                style={[styles.textInput, { textAlign: textAlign || 'left'}]}
                                onChangeText={onValueChange}
                            />
                        }
                    >
                        {label}
                    </List.Item>
                );
            case 3:
                optionsSelected = options.find(opt => opt.value === value);
                return (
                    <List.Item
                        disabled
                        arrow="right"
                        extra={optionsSelected ? optionsSelected.label : (placeholder || '请选择')}
                        onClick={this.showPicker}
                    >
                        {label}
                        <Modal
                            picker2
                            visible={this.state.isPickerVisible}
                            selected={value}
                            data={options}
                            onClose={this.hidePicker}
                            onSelect={this.onPickerSelect}
                        />
                    </List.Item>
                );
            default:
                return (
                    <List.Item {...this.props} />
                );
        }
    }
}

export default FormItem;

const styles = StyleSheet.create({
    textInput: {
        width: 215,
        fontSize: font.md,
        color: colors.textDark,
        fontWeight: '300',
        padding: 0
    }
});
