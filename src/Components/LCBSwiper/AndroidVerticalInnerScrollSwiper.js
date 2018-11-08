'use strict';

import React, { Component } from 'react';
import {
    ScrollView, StyleSheet, Dimensions, View
} from 'react-native';

const height = Math.ceil(Dimensions.get('window').height);

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            wrapScrollable: false,
            direction: 'none'
        };
        this.contentHeightMap = {};
        this.containerHeightMap = {};
        this.childLength = 0;
    }

    componentDidMount(){
        this.props.children && this.props.children.map((item) => {
            if (item) ++this.childLength;
        });
    }

    onScrollEndDrag = ({nativeEvent}) => {
        const y = nativeEvent.contentOffset.y;
        if (this.state.direction === 'bottom'){
            if (y > (this.state.currentIndex + 0.25) * height){
                this.scroll.scrollTo({x: 0, y: (this.state.currentIndex + 1) * height});
                this.setState({
                    currentIndex: this.state.currentIndex + 1,
                    wrapScrollable: this.contentHeightMap[this.state.currentIndex + 1] <= this.containerHeightMap[this.state.currentIndex + 1],
                    direction: this.contentHeightMap[this.state.currentIndex + 1] <= this.containerHeightMap[this.state.currentIndex + 1] ? 'both' : 'none'
                });
            } else {
                this.scroll.scrollTo({x: 0, y: this.state.currentIndex * height});
                this.setState({
                    wrapScrollable: false,
                    direction: 'none'
                });
            }
        } else if (this.state.direction === 'top'){
            if (y < (this.state.currentIndex - 0.25) * height){
                this.scroll.scrollTo({x: 0, y: (this.state.currentIndex - 1) * height});
                this.setState({
                    currentIndex: this.state.currentIndex - 1,
                    wrapScrollable: this.contentHeightMap[this.state.currentIndex - 1] <= this.containerHeightMap[this.state.currentIndex - 1],
                    direction: this.contentHeightMap[this.state.currentIndex - 1] <= this.containerHeightMap[this.state.currentIndex - 1] ? 'both' : 'none'
                });
            } else {
                this.scroll.scrollTo({x: 0, y: this.state.currentIndex * height});
                this.setState({
                    wrapScrollable: false,
                    direction: 'none'
                });
            }
        } else if (this.state.direction === 'both'){
            if (y > (this.state.currentIndex + 0.25) * height){
                this.scroll.scrollTo({x: 0, y: (this.state.currentIndex + 1) * height});
                this.setState({
                    currentIndex: this.state.currentIndex + 1,
                    wrapScrollable: this.contentHeightMap[this.state.currentIndex + 1] <= this.containerHeightMap[this.state.currentIndex + 1],
                    direction: this.contentHeightMap[this.state.currentIndex + 1] <= this.containerHeightMap[this.state.currentIndex + 1] ? 'both' : 'none'
                });
            } else if (y < (this.state.currentIndex - 0.25) * height){
                this.scroll.scrollTo({x: 0, y: (this.state.currentIndex - 1) * height});
                this.setState({
                    currentIndex: this.state.currentIndex - 1,
                    wrapScrollable: this.contentHeightMap[this.state.currentIndex - 1] <= this.containerHeightMap[this.state.currentIndex - 1],
                    direction: this.contentHeightMap[this.state.currentIndex - 1] <= this.containerHeightMap[this.state.currentIndex - 1] ? 'both' : 'none'
                });
            } else {
                this.scroll.scrollTo({x: 0, y: this.state.currentIndex * height});
            }
        } else {
            this.scroll.scrollTo({x: 0, y: this.state.currentIndex * height});
            this.setState({
                wrapScrollable: false,
                direction: 'none'
            });
        }
    };

    setContentHeight = (containerHeight, contentHeight, index) => {
        this.containerHeightMap[index] = Math.ceil(containerHeight);
        this.contentHeightMap[index] = Math.ceil(contentHeight);
        if (index === this.state.currentIndex) {
            if (contentHeight <= containerHeight) {
                this.setState({
                    wrapScrollable: true,
                    direction: 'both'
                });
            } else {
                this.setState({
                    wrapScrollable: false,
                    direction: 'none'
                });
            }
        }
    };

    childOnScrollEndDrag = ({nativeEvent}) => {
        const y = Math.ceil(nativeEvent.contentOffset.y);
        if (y >= this.contentHeightMap[this.state.currentIndex] - this.containerHeightMap[this.state.currentIndex] && this.state.currentIndex !== this.childLength - 1){
            this.setState({
                wrapScrollable: true,
                direction: 'bottom'
            });
        } else if (y <= 0 && this.state.currentIndex !== 0){
            this.setState({
                wrapScrollable: true,
                direction: 'top'
            });
        } else {
            this.setState({
                wrapScrollable: false,
                direction: 'none'
            });
        }
    };
    
    wrapChildren = (children) => {
        return children.map((item, index) => {
            if (item) {
                return (
                    <ScrollView style={{height: height, width: '100%'}} key={index}
                        onScrollEndDrag={this.childOnScrollEndDrag}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            this.contentHeightMap[index] = Math.ceil(contentHeight);
                            if (contentHeight <= height && index === this.state.currentIndex) {
                                this.setState({
                                    wrapScrollable: true,
                                    direction: 'both'
                                });
                            }
                        }}
                        onLayout={({nativeEvent}) => {this.containerHeightMap[index] = Math.ceil(nativeEvent.layout.height);}}>
                        {item}
                    </ScrollView>
                );
            }
        });
    };

    scrollBy = (index, animated) => {
        this.scroll && this.scroll.scrollTo({x: 0, y: (index + this.state.currentIndex) * height, animated});
        this.setState({
            currentIndex: (index + this.state.currentIndex),
            wrapScrollable: this.contentHeightMap[index + this.state.currentIndex] <= this.containerHeightMap[index + this.state.currentIndex],
            direction: this.contentHeightMap[index + this.state.currentIndex] <= this.containerHeightMap[index + this.state.currentIndex] ? 'both' : 'none'
        });
    };

    render() {
        return (
            <View style={[{flex: 1}, this.props.style]}>
                {this.props.renderPagination ? this.props.renderPagination(this.state.currentIndex) : null}
                <ScrollView scrollEnabled={this.state.wrapScrollable} style={[styles.wrap, this.props.style]} ref={(c) => {this.scroll = c;}}
                    onScrollEndDrag={this.onScrollEndDrag} onScroll={this.props.onScroll}>
                    {this.wrapChildren(this.props.children)}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        zIndex: -999
    }
});
