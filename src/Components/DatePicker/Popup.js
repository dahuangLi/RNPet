import React from 'react';
import PopupPicker from 'rmc-picker/lib/Popup';

export default class PopupDatePicker extends React.Component {

    static defaultProps = {
        pickerValueProp: 'date',
        pickerValueChangeProp: 'onDateChange'
    };

    constructor(props) {
        super(props);
        this.onOk = (v) => {
            const { onChange, onOk } = this.props;
            if (onChange) {
                onChange(v);
            }
            if (onOk) {
                onOk(v);
            }
        };
    }
    render() {
        return (<PopupPicker
            picker={this.props.datePicker}
            value={this.props.date}
            {...this.props}
            onOk={this.onOk}
        />);
    }
}
