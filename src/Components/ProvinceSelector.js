import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Modal from './Modal';
import {LCBGridView} from './LCBGridView';
import { colors, width as widthStyle } from '../Styles';

const width = Dimensions.get('window').width;
const items = [{name: '京'}, {name: '沪'}, {name: '浙'}, {name: '苏'}, {name: '粤'}, {name: '鲁'}, {name: '晋'}, {name: '冀'},
    {name: '豫'}, {name: '川'}, {name: '渝'}, {name: '辽'}, {name: '吉'}, {name: '黑'}, {name: '皖'}, {name: '鄂'},
    {name: '湘'}, {name: '赣'}, {name: '闽'}, {name: '陕'}, {name: '甘'}, {name: '宁'}, {name: '蒙'}, {name: '津'},
    {name: '贵'}, {name: '云'}, {name: '桂'}, {name: '琼'}, {name: '青'}, {name: '新'}, {name: '藏'}, {name: '台'} ];
export default class ProvinceSelector extends React.PureComponent {
    static propTypes = {};

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal
                popup
                visible={this.props.visible}
                onClose={this.props.onClose}>
                <View style={styles.sliderContainer}>
                    <LCBGridView style={styles.modalStyle}
                        itemWidth={width * 0.125}
                        items={items}
                        renderItem={item => (
                            <TouchableOpacity style={styles.item} onPress={() => {this.props.onPress(item.name);}} activeOpacity={1}>
                                <View
                                    style={[styles.itemView, {backgroundColor: this.props.province == item.name ? '#a7a7a7' : '#fff' }]}>
                                    <Text style={styles.text}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>);
    }
}

const styles = StyleSheet.create({
    sliderContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#fff'
    },
    modalStyle: {
        width: '100%',
        backgroundColor: '#eaebec',
        paddingTop: 10
    },
    item: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        paddingRight: 5,
        paddingLeft: 5,
        width: '100%',
        height: 46
    },
    itemView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderBottomWidth: widthStyle.borderBase,
        borderBottomColor: '#b8babb'
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'PingFang SC',
        color: colors.textDark,
        textAlign: 'center'
    }
});
