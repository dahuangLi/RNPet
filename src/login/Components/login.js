import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';


export default class App extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
          width: 50,
          height: 50, 
      };
    }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.saveMessage("hello")}>
            <Text style={styles.welcome}>Hello Word!</Text>
            <Text style={styles.welcome}>{this.props.loginStatus}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'#333'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
