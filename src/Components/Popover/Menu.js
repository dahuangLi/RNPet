import {
    Modal,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import React from 'react';
import Svg from '../../SVGUri/Svg';
import Text from '../Text';
import { width } from '../../Styles';

const PopoverMenu = props => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={props.onPressMask}
    >
        <TouchableOpacity
            activeOpacity={1}
            style={{ ...StyleSheet.absoluteFillObject }}
            onPress={props.onPressMask}
        >
            <View style={[styles.container, props.position]}>
                <View style={[styles.upBg, styles.bg]} />
                <View style={styles.bg}>
                    {
                        props.items.map((item, index) =>
                            <TouchableOpacity key={item.key || index} activeOpacity={1} style={styles.wayItem}
                                onPress={item.onPress}>
                                <Svg title={item.icon} size={18} color={'#FFFFFF'} />
                                <Text style={styles.selectTxt}>{item.text}</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        </TouchableOpacity>
    </Modal>
);

export default PopoverMenu;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#414649',
        // minHeight: 100,
        // minWidth: 150,
        // zIndex: 10,
        position: 'absolute',
        paddingTop: 3,
        borderRadius: 3
    },
    bg: {
        backgroundColor: '#414649',
        borderRadius: 3
    },
    upBg: {
        width: 15,
        height: 15,
        transform: [{ rotate: '45deg' }],
        alignSelf: 'flex-end',
        marginRight: 5,
        marginBottom: -9,
        borderRadius: 3
    },
    wayItem: {
        height: 40,
        flexDirection: 'row',
        borderBottomWidth: width.borderBase,
        borderBottomColor: '#515558',
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 3
    },
    selectTxt: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 10
    },
    defaultTxt: {
        fontSize: 16,
        color: '#C6C8C9',
        marginLeft: 10
    }
});
