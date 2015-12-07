'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var TimerMixin = require('react-timer-mixin');
var LinearGradient = require('react-native-linear-gradient');
var incrementColor = require('./incrementColor');

var AnimatedGradient = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      count: 0,
      colorTop: '#000000',
      colorBottom: '#cccccc',
    }
  },

  componentDidMount: function() {
    this.setInterval(() => {
      this.setState({
        count: this.state.count + 1,
        colorTop: incrementColor(this.state.colorTop, 1),
        colorBottom: incrementColor(this.state.colorBottom, -1),
      });
    }, 20);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[this.state.colorTop, this.state.colorBottom]}
          style={styles.gradient} />

        <Text style={{color: this.state.colorTop}}>{this.state.colorTop}</Text>
        <Text style={{color: this.state.colorBottom}}>{this.state.colorBottom}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  gradient: {
    width: 200,
    height: 200,
  },
});

AppRegistry.registerComponent('AnimatedGradient', () => AnimatedGradient);
