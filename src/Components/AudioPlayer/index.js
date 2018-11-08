import {
    DeviceEventEmitter,
    Image,
    NativeEventEmitter,
    NativeModules,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    PixelRatio
} from 'react-native';
import React, { PureComponent } from 'react';

const { RNAudioPlayerEventEmitter, ReactNativeAudioStreaming } = NativeModules;

// Possibles states
const PLAYING = 'PLAYING';
const STREAMING = 'STREAMING';
const PAUSED = 'PAUSED';
const STOPPED = 'STOPPED';
const ERROR = 'ERROR';
const METADATA_UPDATED = 'METADATA_UPDATED';
const BUFFERING = 'BUFFERING';
const START_PREPARING = 'START_PREPARING'; // Android only
const BUFFERING_START = 'BUFFERING_START'; // Android only

const manager = {
    nextId: 1,
    currentPlayer: null
};

class Player extends PureComponent {
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
        this.state = {
            status: STOPPED,
            song: ''
        };
        this.playerId = manager.nextId;
        manager.nextId++;
    }

    componentDidMount() {
        const listener = evt => {
            // 已挂载，非正在操作的player
            if (manager.currentPlayer !== this.playerId) {
                this.setState({
                    status: STOPPED,
                    song: ''
                });
                return;
            }
            if (evt && ((evt.status !== STOPPED && evt.duration === 0) || evt.status === ERROR)) {
                alert('该音频无效');
                this.setState({
                    status: STOPPED
                });
                return;
            }
            // 播放完毕后，停不了，需要修复
            if (evt && evt.status === STOPPED && evt.duration === 0) {
                this.setState({
                    status: STOPPED,
                    song: ''
                });
                return;
            }
            if (evt.status === METADATA_UPDATED && evt.key === 'StreamTitle') {
                this.setState({ song: evt.value });
            } else if (evt.status !== METADATA_UPDATED) {
                this.setState(evt);
            }
        };
        if (Platform.OS === 'android') {
            this.subscription = DeviceEventEmitter.addListener('AudioBridgeEvent', listener);
        } else {
            const eventEmitter = new NativeEventEmitter(RNAudioPlayerEventEmitter);
            this.subscription = eventEmitter.addListener('AudioBridgeEvent', listener);
        }

        ReactNativeAudioStreaming.getStatus((error, status) => {
            (error) ? console.log(error) : this.setState(status);
        });
    }

    componentWillUnmount() {
        if (manager.currentPlayer !== this.playerId) {
            ReactNativeAudioStreaming.stop();
        }
        if (this.subscription) {
            this.subscription.remove();
        }
    }

    _onPress() {
        manager.currentPlayer = this.playerId;
        this.props.onPress && this.props.onPress();
        switch (this.state.status) {
            case PLAYING:
            case STREAMING:
                ReactNativeAudioStreaming.pause();
                break;
            case PAUSED:
                ReactNativeAudioStreaming.resume();
                break;
            case STOPPED:
            case ERROR:
                ReactNativeAudioStreaming.play(this.props.url, { showIniOSMediaCenter: true, showInAndroidNotifications: false });
                break;
            case BUFFERING:
                ReactNativeAudioStreaming.stop();
                break;
        }
    }

    _renderIcon = () => {
        let icon = <Image source={require('./Assets/voice_default.png')} style={styles.icon} />;
        switch (this.state.status) {
            case PLAYING:
            case STREAMING:
                icon = <Image source={require('./Assets/voice.gif')} style={styles.icon} />;
                break;
            case PAUSED:
            case STOPPED:
            case ERROR:
            case BUFFERING:
            case BUFFERING_START:
            case START_PREPARING:
                icon = <Image source={require('./Assets/voice_default.png')} style={styles.icon} />;
                break;
        }
        return icon;
    };
    render() {

        return (
            <TouchableOpacity
                style={[styles.container, this.props.containerStyle]}
                activeOpacity={1}
                onPress={this._onPress}>
                {this._renderIcon()}
                {this.props.duration && <View style={styles.textContainer}>
                    <Text style={styles.duration}>{this.props.duration}s</Text>
                </View>}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 25,
        width: 65,
        backgroundColor: '#9de555',
        borderRadius: 2,
        borderColor: '#c8c8c8',
        paddingHorizontal: 2,
        borderWidth: 1.0 / PixelRatio.get()
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2
    },
    textLive: {
        color: '#000',
        marginBottom: 5
    },
    icon: {
        width: 15,
        height: 15
    },
    songName: {
        fontSize: 20,
        textAlign: 'center',
        color: '#000'
    },
    duration: {
        color: '#669931',
        fontSize: 12

    }
});

export { Player, ReactNativeAudioStreaming };
