'use strict';

import {
    StyleSheet,
    View,
    WebView
} from 'react-native';

import Dimensions from 'Dimensions';
import React from 'react';
import RootSiblings from 'react-native-root-siblings';

const staticHtml = '<!DOCTYPE html><html><head><script src="https://ssl.captcha.qq.com/TCaptcha.js"></script></head><body style="background-color: transparent"><script> var captcha1 = new TencentCaptcha(\'2072642366\', function (result) {if (result.ret === 0) { let jsonstring = JSON.stringify(result);window.postMessage(jsonstring);} });captcha1.show();</script></body></html>';

const patchPostMessageFunction = function () {
    var originalPostMessage = window.postMessage;

    var patchedPostMessage = function (message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
    };

    patchedPostMessage.toString = function () {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };

    window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

class TencentCaptcha {
    static show = (callbackfn) => {
        let sibling = new RootSiblings(
            <View style={StyleSheet.absoluteFill}>
                <WebView
                    source={{ html: staticHtml }}
                    automaticallyAdjustContentInsets={false}
                    injectedJavaScript={patchPostMessageJsCode}
                    javaScriptEnabled={true}
                    style={styles.webview}
                    onMessage={(e) => {
                        let stringResult = e.nativeEvent.data.data;
                        let jsonrResult = JSON.parse(stringResult);
                        callbackfn && callbackfn(jsonrResult);
                        sibling.destroy();
                    }}
                />
            </View>
        );
    };
}

const webviewSize = { width: 750, height: 1000 };
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    webview: {
        position: 'absolute',
        top: (height - webviewSize.height) / 2.,
        left: (width - webviewSize.width) / 2.,
        width: webviewSize.width,
        height: webviewSize.height,
        backgroundColor: 'transparent'
    }
});

export default TencentCaptcha;
