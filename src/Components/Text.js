import React from 'react';
import {
    Text
} from 'react-native';

export default props =>
    <Text allowFontScaling={false} {...props} style={[{fontWeight: '300'}, props.style]} />;
