/**
 * 列表的总数栏，可能带更多筛选
 */
import {
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { colors, font, icon, spacing } from '../../Styles/Base';

import React from 'react';
import Svg from '../../SVGUri/Svg';
import { Text } from '../../Components';

const ListCountBar = ({
    content,
    count,
    extra,
    onPressExtra
}) =>
    <View style={styles.wrapper}>
        <View>
            <Text style={styles.countTxt}>{content || `共${count}条记录` }</Text>
        </View>
        {extra &&
            <TouchableOpacity
                activeOpacity={1}
                style={styles.row} 
                onPress={onPressExtra}
            >
                <Text style={styles.extraTxt}>{extra}</Text>
                <Svg title="arrow-r" size={icon.xxs} color={'#c2c3c3'} />
            </TouchableOpacity>
        }
    </View>;

export default ListCountBar;

const styles = StyleSheet.create({
    wrapper: {
        height: 36,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg
    },
    countTxt: {
        color: colors.textBase,
        fontSize: font.xs
    },
    extraTxt: {
        marginRight: -4,
        color: colors.textBase,
        fontSize: font.xs
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
