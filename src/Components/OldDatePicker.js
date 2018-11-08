/**
 * 不支持设置选中行文字颜色
 */
import { DatePicker as AntdDatePicker } from 'antd-mobile-rn';
import React from 'react';
import { styles } from './Picker';

const DatePicker = props =>
    <AntdDatePicker
        styles={styles}
        {...props}
    />;

export default DatePicker;
