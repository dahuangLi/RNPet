import React, { PureComponent } from 'react';
import { colors, fill, font, safeArea } from '../Styles/Base';

import { ActionSheetCustom } from 'react-native-actionsheet';
import { StyleSheet } from 'react-native';

const styles = {
    body: {
        backgroundColor: fill.body
    },
    buttonBox: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.borderLight
    },
    buttonText: {
        fontSize: font.md
    },
    cancelButtonBox: {
        marginTop: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: 50 + safeArea.portrait.bottom,
        paddingBottom: safeArea.portrait.bottom
    }
};

class ActionSheet extends PureComponent {
    show = () => {
        this.sheet.show();
    };
    render() {
        return (
            <ActionSheetCustom
                styles={styles}
                {...this.props}
                ref={o => this.sheet = o}
                tintColor={colors.textDark}
                onPress={(index) => {
                    if (this.props.onPress) {
                        // 异步调用绕过ios bug
                        setTimeout(() => {
                            this.props.onPress(index);
                        }, 0);
                    }
                }}
            />
        );
    }
}

export default ActionSheet;
