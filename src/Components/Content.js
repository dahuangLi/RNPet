import Container from './Container';
/**
 * 内容区，超出部分可以滚动查看
 */
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React from 'react';

const Content = props =>
    <Container style={props.style}>
        <KeyboardAwareScrollView
            resetScrollToCoords={
                props.disableKBDismissScroll ? null : { x: 0, y: 0 }
            }
            {...props}
            contentContainerStyle={[{ backgroundColor: 'transparent' }, props.contentContainerStyle]}
        />
    </Container>;

export default Content;
