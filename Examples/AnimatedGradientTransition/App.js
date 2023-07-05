/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';

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
  },
  gradient: {
    width: 200,
    height: 200,
    margin: 20,
  },
});

export default class App extends Component<{}, {clicked: boolean}> {
  constructor() {
    super();

    this.state = {
      clicked: false,
    };
  }

  handleBtnPress = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
  };

  render() {
    const {clicked} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Animated Gradient Transition</Text>
        <AnimatedGradientTransition
          style={styles.gradient}
          colors={clicked ? ['#F37144', '#F0A148'] : ['#2b32b2', '#1488cc']}
        />
        <Button title="Click" onPress={this.handleBtnPress} />
      </View>
    );
  }
}
