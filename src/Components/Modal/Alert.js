/**
 * {@link https://github.com/ant-design/ant-design-mobile-rn/tree/master/components/modal}
 */

import AlertContainer from './AlertContainer';
import React from 'react';
import topView from 'rn-topview';

export default function alert(
    title,
    content,
    actions = [{ text: '确定' }],
) {
    const onAnimationEnd = (visible) => {
        if (!visible) {
            topView.remove();
        }
    };

    topView.set(
        <AlertContainer
            title={title}
            content={content}
            actions={actions}
            onAnimationEnd={onAnimationEnd}
        />,
    );
}
