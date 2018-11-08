import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {festival, monthNum} from './data.js';

import Button from '../Button';
import Modal from '../Modal';
import PropTypes from 'prop-types';
import React from 'react';
import Text from '../Text';
import { colors, width as widthStyle, font } from '../../Styles/Base';

const {width} = Dimensions.get('window');
const DateItem = ({date, day, days, start, end, onPress, disable}) => {
    if (day < 1 || day > days){
        return <View style= {styles.ItemBox}></View>;
    } else {
        txt = festival[(date.getMonth() + 1) + '/' + date.getDate()];
        if (disable) {
            return (
                <View style={styles.ItemBox}>
                    <Text style={styles.disableTxt}>{txt ? txt + '节' : day}</Text>
                </View>
            );
        }
        const nowTime = date && date.getTime();
        const startTime = start && start.getTime();
        const endTime = end && end.getTime();
        let style = null;
        switch (true) {
            case nowTime === startTime && nowTime === endTime:
                style = styles.aloneBox;
                break;
            case nowTime === startTime:
                style = styles.ItemLeftBox;
                break;
            case nowTime === endTime && startTime < endTime:
                style = styles.ItemRightBox;
                break;
            case startTime < nowTime && nowTime < endTime:
                style = styles.ItemMidBox;
                break;
        }
        return (
            <TouchableOpacity style={[styles.ItemBox, style]} onPress={onPress}>
                <Text style={txt ? styles.dayOff : styles.txt}>{txt ? txt + '节' : day}</Text>
            </TouchableOpacity>
        );
    }
    
};
const MonthTable = ({year, month, range, selected, onSelect}) => {
    let days, spareNum, lineNum, lines, Dates;
    if (monthNum[month]){
        days = monthNum[month];
    } else if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0){
        days = 29;
    } else {
        days = 28;
    }
    spareNum = new Date(`${year}/${month}/1`).getDay();
    lineNum = Math.ceil((days + spareNum) / 7);
    // lines = new Array(lineNum);
    lines = Array.from(new Array(lineNum), (item, index) => index++);
    Dates = Array.from(new Array(7), (item, index) => index++);
    // Dates = Array.from(new Array(lineNum * 7), (item, index) => index < spareNum && index > (spareNum + days) ? 0 : index + 1 - spareNum);
    return <View style={styles.listBox}>
        <View style={styles.monthBox}>
            <Text style={styles.monthtxt}>{year}年{month}月</Text> 
        </View>
        {  
            lines.map((item, lineIndex) => 
                <View key={lineIndex} style={styles.rowBox}>
                    {
                        Dates.map((item, dataIndex) => {
                            const day = item + lineIndex * 7 - spareNum + 1;
                            const date = new Date(year + '/' + month + '/' + day);
                            const disable = date < range[0] || date > range[1];
                            return (
                                <DateItem
                                    key={dataIndex}
                                    date={date}
                                    day={day}
                                    days={days}
                                    disable={disable}
                                    start={selected[0]}
                                    end={selected[1]}
                                    onPress={() => onSelect(date)}
                                />
                            );
                        })
                    }
                </View> 
            )
        }
    </View>;
};

const Header = ({text}) =>
    <View style={styles.txtBox}>
        <Text style={{fontSize: font.sm, color: colors.textDark}}>{text}</Text>   
    </View>;

const Title = () =>
    <View style={styles.rowBox}> 
        <View style= {styles.ItemBox}>
            <Text style={styles.dayOff}>日</Text>
        </View>
        <View style= {styles.ItemBox}>
            <Text style={styles.dayTxt}>一</Text>
        </View>
        <View style= {styles.ItemBox}>
            <Text style={styles.dayTxt}>二</Text>
        </View>
        <View style= {styles.ItemBox}>
            <Text style={styles.dayTxt}>三</Text>
        </View>
        <View style= {styles.ItemBox}>
            <Text style={styles.dayTxt}>四</Text>
        </View>
        <View style= {styles.ItemBox}>
            <Text style={styles.dayTxt}>五</Text>
        </View>
        <View style= {styles.ItemBox}>
            <Text style={styles.dayOff}>六</Text>    
        </View>
    </View>; 

const getMonthList = (minDate, maxDate) => {
    const firstYear = minDate.getFullYear();
    const firstMonth = minDate.getMonth();
    const lastMonth = (maxDate.getFullYear() - firstYear) * 12 + maxDate.getMonth();
    const list = [];
    for (let m = firstMonth; m < lastMonth + 1; m++) {
        list.push(new Date(firstYear, m));
    }
    return list;
};

export default class Calendar extends React.PureComponent {
    static propTyps = {
        minDate: PropTypes.instanceOf(Date),
        maxDate: PropTypes.instanceOf(Date),
        visible: PropTypes.bool,
        title: PropTypes.string,
        defaultValue: PropTypes.array,
        onCancel: PropTypes.func,
        onConfirm: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.defaultValue || [null, null]
        };
    }
    onSelectDate = date => {
        const first = this.state.selected[0];
        if (!first || this.state.selected[1]) {
            this.setState({
                selected: [date, null]
            });
        } else if (date < first) {
            this.setState({
                selected: [date, first]
            });
        } else {
            this.setState({
                selected: [first, date]
            });
        }
    };
    onConfirm = () => {
        this.props.onConfirm && this.props.onConfirm(this.state.selected);
    };
    render() {
        const { minDate, title, maxDate, visible, onCancel } = this.props;
        return (
            <Modal
                popup
                visible={visible}
                onClose={onCancel}
            >
                <View style={styles.content}>
                    <Header text={title} />
                    <Title />
                    <ScrollView>
                        <View style={styles.ScrollBox}>
                            {
                                getMonthList(minDate, maxDate).map(date => {
                                    const year = date.getFullYear();
                                    const month = date.getMonth() + 1;
                                    return (
                                        <MonthTable
                                            key={date.toString()}
                                            year={year}
                                            month={month}
                                            range={[minDate, maxDate]}
                                            selected={this.state.selected}
                                            onSelect={this.onSelectDate}
                                        />
                                    );
                                })
                            }
                        </View>
                    </ScrollView>
                    <Button
                        disabled={!this.state.selected[0] || !this.state.selected[1]}
                        flat
                        type="primary"
                        onClick={this.onConfirm}
                    >
                        完成
                    </Button>
                </View>
            </Modal>
        );
    }
}
  
const styles = StyleSheet.create({
    bgBox: { 
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.75)', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    content: {
        backgroundColor: '#fff',
        // width: '100%',
        height: 500
        // position: 'absolute',
        // bottom: 0
    },
    txtBox: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#F4F6FA',
        borderBottomWidth: widthStyle.borderBase
    },
    txt: {
        fontSize: 14
    },
    selectTxt: {
        color: '#fff',
        fontSize: 14
    },
    disableTxt: {
        color: colors.textExtraLight,
        fontSize: 14
    },
    dayTxt: {
        fontSize: font.xs,
        color: colors.textDark
    },
    dayOff: {
        fontSize: font.xs,
        color: '#EE5252'
    },
    rowBox: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: '#F4F6FA',
        borderBottomWidth: widthStyle.borderBase
    }, 
    ItemBox: {
        width: Math.floor(width / 7),
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ItemLeftBox: {
        backgroundColor: '#4E8CEE',
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
    },
    ItemRightBox: {
        backgroundColor: '#4E8CEE',
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5
    },
    aloneBox: {
        backgroundColor: '#4E8CEE',
        borderRadius: 5
    },
    ItemMidBox: {
        backgroundColor: '#E1ECFC'
    },
    btnBox: {
        backgroundColor: '#4E8CEE',
        width: '100%',
        height: 50,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0
    },
    btnTxt: {
        color: '#fff',
        fontSize: 20
    },
    monthBox: {
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderBottomColor: '#F4F6FA',
        borderBottomWidth: widthStyle.borderBase
    },
    monthtxt: {
        fontSize: font.xs,
        color: colors.textDark
    },
    ScrollBox: {
        paddingBottom: 60
    }
});
