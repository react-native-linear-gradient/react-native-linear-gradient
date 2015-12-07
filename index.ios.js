/**
 * @providesModule LinearGradient
 * @flow
 */

'use strict';

var React = require('react-native');
var { requireNativeComponent, processColor, View } = React;
var NativeLinearGradient = requireNativeComponent('BVLinearGradient', null);

var LinearGradient = React.createClass({
  propTypes: {
    ...View.propTypes,
  },

  render: function() {
    var { colors, ...otherProps } = this.props;
    return (
      <NativeLinearGradient {...otherProps} colors={colors.map(processColor)} />
    );
  }
});

module.exports = LinearGradient;
