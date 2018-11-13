import React, {Component} from 'react';

import SvgUri from './index';
import svgs from './svgs';

export default class Svg extends Component {
    render() {
        const {
            color,
            size,
            style,
            uri
        } = this.props;
        if (uri) {
            return (
                <SvgUri width={size} height={size} fill={color} style={style}
                    source={{uri: uri}}/>
            );
        }
        let svgXmlData = svgs[this.props.title];

        if (!svgXmlData) {
            return (
                <SvgUri width={size} height={size} fill={color} style={style}
                    svgXmlData={'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><title>showBlank</title><path d="" fill="#fff"></path></svg>'}/>
            );
        }
        return (
            <SvgUri width={size} height={size} svgXmlData={svgXmlData} fill={color} style={style}/>
        );
    }
}
