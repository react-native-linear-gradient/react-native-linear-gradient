/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';

import AnimatedGradientTransition from './src/AnimatedGradientTransition';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  gradient: {
    width: 200,
    height: 200,
  },
});

export default class App extends Component {

  constructor() {
    super();

    this.handleBtnPress = this.handleBtnPress.bind(this);

    this.state = {
      clicked: false,
    };
  }

  render() {
    const {
      clicked,
    } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Animated Gradient Transition
        </Text>
        <AnimatedGradientTransition
          style={ styles.gradient }
          colors={ clicked ? ['#F37144', '#F0A148'] : ['#2b32b2', '#1488cc'] }
        />
        <Button
          title="Click"
          onPress={ this.handleBtnPress }
        />
      </View>
    );
  }

  handleBtnPress() {
    this.setState({
      clicked: !this.state.clicked,
    });
  }
}
