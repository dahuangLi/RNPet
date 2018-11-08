import { Platform, WebView } from 'react-native';
import React, { PureComponent } from 'react';

import Container from './Container';
import { Deviceinfo } from '../Utils';
import SharePanel from './SharePanel';
import { action } from '../Redux';
import { store } from '../Store/Store';

const injectedJavaScript = '(function(w){if(w.wvjb){return};var sendMessageQueue=[];var receiveMessageQueue=[];var timeoutHandlers={};var processing=false;var responseCallbacks={};var uniqueId=1;function callHandler(handlerName,data,responseCallback){_doSend({handler:handlerName,data},responseCallback)};function _doSend(message,responseCallback){if(responseCallback){var callbackId="cb_"+(uniqueId++)+"_"+new Date().getTime();responseCallbacks[callbackId]=responseCallback;message["callbackId"]=callbackId;if(message.data&&message.data.timeout&&typeof message.data.timeout=="number"){timeoutHandlers[callbackId]=setTimeout(function(){var responseCallback=responseCallbacks[callbackId];delete responseCallbacks[callbackId];responseCallback({status:{code:wvjb.StatusCode.Timeout,msg:"timeout"}});},message.data.timeout)}}else{var callbackId="cb_"+(uniqueId++)+"_"+new Date().getTime();responseCallbacks[callbackId]=function(){};message["callbackId"]=callbackId;}if(processing){sendMessageQueue.push(message)}else{processing=true;window.postMessage(JSON.stringify(message));}};function _continue(callbackId,data){processing=false;if(responseCallbacks[callbackId]){responseCallbacks[callbackId](data);delete responseCallbacks[callbackId];}_flushMessageQueue();};function _flushMessageQueue(){if(sendMessageQueue.length>0){var message=sendMessageQueue.shift();window.postMessage(JSON.stringify(message));}};w.wvjb={callHandler:callHandler,_continue:_continue,StatusCode:{Success:0,NotFound:404,Failed:101,Timeout:102}};var doc=document;var readyEvent=doc.createEvent("Events");readyEvent.initEvent("WVJBReady");readyEvent.bridge=wvjb;doc.dispatchEvent(readyEvent);})(window);';

const UserAgent = Deviceinfo.getUserAgent();

export default class extends PureComponent {
    state = {
        shareVisible: false,
        shareParams: null
    };
    webViewRef = null;

    nativeAPI = {
        share: (params, callbackId) => {
            this.setState({
                shareVisible: true,
                shareParams: params
            });
            this.sendH5Callback(callbackId, true);
        },
        invalidateToken: () => {
            store.dispatch(action.user.invalidToken());
        },
        setNavigateBar: (barSettings, callbackId) => {
            if (!this.props.setNavigateBar) {
                return;
            }
            // 头部点击回调替换成向WebView发点击事件message
            ['leftItems', 'rightItems'].forEach(k => {
                if (barSettings[k]) {
                    barSettings = {
                        ...barSettings,
                        [k]: barSettings[k].map(item => {
                            const onPress = item.onPress;
                            if (onPress && typeof onPress === 'string') {
                                item = {
                                    ...item,
                                    onPress: () => this.postWebViewMessage(onPress)
                                };
                            }
                            return item;
                        })
                    };
                }
            });
            this.props.setNavigateBar(barSettings);
            this.sendH5Callback(callbackId, true);
        },
        getUserInfo: (params, callbackId) => {
            const saasUserInfo = store.getState().saasUserInfo;
            this.sendH5Callback(callbackId, true, saasUserInfo);
        }
    };

    sendH5Callback = (callbackId, success, data) => {
        const response = success ? { data, state: 'success', status: { code: 0 } } : { data, state: 'fail', status: { code: 101 } };
        let callback = `window.wvjb._continue('${callbackId}',${JSON.stringify(response)})`;
        this.webViewRef.injectJavaScript(callback);
    };

    postWebViewMessage = (handler) => {
        this.webViewRef.injectJavaScript(`${handler}()`);
    };

    onH5Message = (data) => {
        const request = JSON.parse(data);
        const handler = request.handler;
        const params = request.data;
        if (this.nativeAPI[handler]) {
            this.nativeAPI[handler](params, request.callbackId);
        }
    };

    render() {
        return (
            <Container>
                <WebView
                    ref={ref => this.webViewRef = ref}
                    style={{ flex: 1 }}
                    source={{ uri: this.props.url }}
                    {...(Platform.OS === 'android' ? { userAgent: UserAgent } : {})}
                    onLoadEnd={() => {
                        this.webViewRef.injectJavaScript(injectedJavaScript);
                        const wvjbInfo = {};
                        for (const key in this.nativeAPI) {
                            if (this.nativeAPI.hasOwnProperty(key)) {
                                wvjbInfo[key] = true;
                            }
                        }
                        this.webViewRef.injectJavaScript(`window.wvjb.info=${JSON.stringify(wvjbInfo)}`);
                        this.webViewRef.injectJavaScript('window.wvjb.__shareWithCallback=true;wvjb.__isReady=true;var readyEvent=document.createEvent("Events");readyEvent.initEvent("LCBWVJBReady");document.dispatchEvent(readyEvent)');
                    }}
                    javaScriptEnabled={true}
                    bounces={false}
                    scalesPageToFit={false}
                    backgroundColor='#f4f4f8'
                    onMessage={(event) => {
                        this.onH5Message(event.nativeEvent.data);
                    }}
                />
                <SharePanel
                    visible={this.state.shareVisible}
                    params={this.state.shareParams}
                    onClose={() => this.setState({
                        shareVisible: false,
                        shareParams: null
                    })}
                />
            </Container>
        );
    }
}
