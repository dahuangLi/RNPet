import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import listItemStyle from './Style';

/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import Svg from '../../SVGUri/Svg';

const listStyles = StyleSheet.create(listItemStyle);
const listItemStyles = StyleSheet.create(listItemStyle);

export class Brief extends React.Component {
    static defaultProps = {
        styles: listStyles
    };

    render() {
        const { children, style, styles, wrap } = this.props;

        let numberOfLines = {};

        if (wrap === false) {
            numberOfLines = {
                numberOfLines: 1
            };
        }
        return (
            <View style={[styles.Brief]}>
                <Text style={[styles.BriefText, style]} {...numberOfLines}>
                    {children}
                </Text>
            </View>
        );
    }
}

export default class Item extends React.Component {
    static defaultProps = {
        multipleLine: false,
        wrap: false,
        styles: listItemStyles
    };
    static Brief = Brief;
    render() {
        const {
            noline,
            heightSelf,
            styles,
            children,
            multipleLine,
            thumb,
            icon,
            iconColor,
            extra,
            extraSize,
            arrow,
            style,
            onClick,
            onPressIn,
            onPressOut,
            wrap,
            disabled,
            align,
            ...restProps
        } = this.props;
        const itemStyles = styles; // assert none-null none-undefined
        let numberOfLines = {};
        if (wrap === false) {
            numberOfLines = {
                numberOfLines: 1
            };
        }

        let underlayColor = {};

        if (!disabled && onClick) {
            underlayColor = {
                underlayColor: StyleSheet.flatten(itemStyles.underlayColor)
                    .backgroundColor,
                activeOpacity: 0.5
            };
        } else {
            underlayColor = {
                activeOpacity: 1
            };
        }

        let alignStyle = {};

        if (align === 'top') {
            alignStyle = {
                alignItems: 'flex-start'
            };
        } else if (align === 'bottom') {
            alignStyle = {
                alignItems: 'flex-end'
            };
        }

        let contentDom;
        if (Array.isArray(children)) {
            const tempContentDom = [];
            children.forEach((el, index) => {
                if (React.isValidElement(el)) {
                    tempContentDom.push(el);
                } else {
                    tempContentDom.push(
                        <Text
                            style={[itemStyles.Content]}
                            {...numberOfLines}
                            key={`${index}-children`}
                        >
                            {el}
                        </Text>,
                    );
                }
            });
            contentDom = <View style={[itemStyles.column]}>{tempContentDom}</View>;
        } else {
            if (children && React.isValidElement(children)) {
                contentDom = <View style={[itemStyles.column]}>{children}</View>;
            } else {
                contentDom = (
                    <View style={[itemStyles.column]}>
                        <Text style={itemStyles.Content} {...numberOfLines}>
                            {children}
                        </Text>
                    </View>
                );
            }
        }

        let extraDom;
        if (extra) {
            extraDom = (
                <View style={[itemStyles.column]}>
                    <Text style={[itemStyles.Extra, extraSize ? {fontSize: extraSize} : null]} {...numberOfLines}>
                        {extra}
                    </Text>
                </View>
            );
            if (React.isValidElement(extra)) {
                const extraChildren = (extra.props).children;
                if (Array.isArray(extraChildren)) {
                    const tempExtraDom = [];
                    extraChildren.forEach((el, index) => {
                        if (typeof el === 'string') {
                            tempExtraDom.push(
                                <Text
                                    {...numberOfLines}
                                    style={[itemStyles.Extra, extraSize ? {fontSize: extraSize} : null]}
                                    key={`${index}-children`}
                                >
                                    {el}
                                </Text>,
                            );
                        } else {
                            tempExtraDom.push(el);
                        }
                    });
                    extraDom = <View style={[itemStyles.column]}>{tempExtraDom}</View>;
                } else {
                    extraDom = extra;
                }
            }
        }

        const arrEnum = {
            right: (
                <Svg title="arrow-r" size={9} color={'#c2c3c3'} />
            )
            // down: (
            //     <Image
            //         source={require('../style/images/arrow-down.png')}
            //         style={itemStyles.ArrowV}
            //     />
            // ),
            // up: (
            //     <Image
            //         source={require('../style/images/arrow-up.png')}
            //         style={itemStyles.ArrowV}
            //     />
            // ),
        };

        const itemView = (
            <View {...restProps} style={[itemStyles.Item, style, heightSelf ? {height: heightSelf} : null]}>
                {typeof thumb === 'string' ? (
                    <Image
                        source={{ uri: thumb }}
                        style={[itemStyles.Thumb, multipleLine && itemStyles.multipleThumb]}
                    />
                ) : (
                    thumb
                )}
                {typeof icon === 'string' ? (
                    <Svg
                        title={icon}
                        size={16}
                        color={iconColor || '#333'}
                        style={StyleSheet.flatten(itemStyles.Thumb)}
                    />
                ) : (
                    icon
                )}
                <View
                    style={[
                        itemStyles.Line,
                        noline && {borderBottomWidth: 0},
                        multipleLine && itemStyles.multipleLine,
                        multipleLine && alignStyle
                    ]}
                >
                    {contentDom}
                    {extraDom}
                    {arrow
                        ? arrEnum[arrow] || <View style={itemStyles.Arrow} />
                        : null}
                </View>
            </View>
        );

        return (
            <TouchableHighlight
                {...underlayColor}
                onPress={onClick ? onClick : undefined}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                {itemView}
            </TouchableHighlight>
        );
    }
}
