import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { action, selector } from '../Redux';

import Modal from './Modal';
import React from 'react';
import Svg from '../SVGUri/Svg';
import Text from './Text';
import { connect } from 'react-redux';
import { safeArea } from '../Styles/Base';

let width = Dimensions.get('window').width; // full width

@connect(
    (state) => {
        const defaultRole = selector.getDefaultRole(state);
        const roles = selector.getUserRoles(state);
        const userInfo = selector.getUserInfo(state);
        return {
            userImgUri: userInfo && userInfo.faceImageUrl,
            userName: userInfo && userInfo.realName,
            roleId: defaultRole && defaultRole.id,
            roleName: defaultRole && defaultRole.name,
            roleDesc: defaultRole && defaultRole.desc,
            roles: roles || []
        };
    },
    (dispatch) => {
        return {
            onSelectRole(role) {
                dispatch(action.user.changeDefaultRole(role));
                dispatch(action.user.requestRoutes());
            }
        };
    }
)
export default class UserInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pickerVisable: false
        };
    }
    showPicker = () => {
        this.setState({
            pickerVisable: true
        });
    };
    closePicker = () => {
        this.setState({
            pickerVisable: false
        });
    };
    onPickerSelect = ({ value }) => {
        this.closePicker();
        this.props.onSelectRole(this.props.roles.find(({id}) => value === id));
    };
    render() {
        const {
            heightSelf,
            disableRole,
            userImgUri,
            userName,
            roleId,
            roleName,
            roleDesc,
            roles
        } = this.props;
        return (
            <ImageBackground
                style={[styles.miTop, heightSelf ? {height: heightSelf + safeArea.portrait.top} : null]}
                source={require('./Assets/uc_topbg.png')}>
                <View style={styles.miTopCont}>
                    <Image
                        style={{ borderRadius: 25, width: 48, height: 48, borderWidth: 2, borderColor: 'white' }}
                        source={userImgUri ? { uri: userImgUri } : require('./Assets/man.png')}
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.miName}>{userName}</Text>
                            {/* 切换角色是否可点击 */}
                            {disableRole
                                ? (
                                    <View
                                        style={styles.roleName}
                                    >
                                        <Text style={styles.miJob}>{roleName}</Text>
                                    </View>
                                )
                                : (

                                    <TouchableOpacity
                                        style={styles.roleName}
                                        onPress={this.showPicker}
                                    >
                                        <Text style={[styles.miJob, { marginRight: -4 }]}>{roleName}</Text>
                                        <Svg title="arrow-r" size={9} color={'#fff'} />
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        <Text style={styles.miCompany}>{roleDesc}</Text>
                    </View>
                </View>
                <Modal
                    picker
                    title="请选择所属角色"
                    data={roles.map(role => ({
                        label: role.roleName,
                        value: role.id
                    }))}
                    selected={roleId}
                    visible={this.state.pickerVisable}
                    onClose={this.closePicker}
                    onSelect={this.onPickerSelect}
                />
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    miTop: {
        width: width,
        height: 97 + safeArea.portrait.top,
        backgroundColor: 'transparent'
    },
    miTopCont: {
        flex: 1,
        marginTop: safeArea.portrait.top,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    miName: {
        color: '#fff',
        fontSize: 16
    },
    miJob: {
        color: '#fff',
        fontSize: 12
    },
    miCompany: {
        paddingRight: 15,
        marginTop: 8,
        color: '#fff',
        fontSize: 15
    },
    roleName: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
        borderColor: '#fff',
        borderRadius: 2,
        borderWidth: 0.5,
        height: 17,
        justifyContent: 'center',
        paddingHorizontal: 2
    }
});
