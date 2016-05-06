import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import LinearGradient from 'react-native-linear-gradient';

function incrementColor(color, step) {
  const intColor = parseInt(color.substr(1), 16);
  const newIntColor = (intColor + step).toString(16);
  return `#${'0'.repeat(6 - newIntColor.length)}${newIntColor}`;
};

const AnimatedGradient = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      count: 0,
      colorTop: '#000000',
      colorBottom: '#cccccc',
    }
  },

  componentDidMount() {
    this.setInterval(() => {
      this.setState({
        count: this.state.count + 1,
        colorTop: incrementColor(this.state.colorTop, 1),
        colorBottom: incrementColor(this.state.colorBottom, -1),
      });
    }, 20);
  },

  render() {
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

const styles = StyleSheet.create({
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

export default AnimatedGradient;
