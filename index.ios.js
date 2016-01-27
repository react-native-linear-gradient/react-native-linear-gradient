/**
 * @providesModule LinearGradient
 * @flow
 */

'use strict';

var React = require('react-native');
var { requireNativeComponent, processColor, PropTypes, View } = React;

var LinearGradient = React.createClass({
  propTypes: {
    start: PropTypes.arrayOf(PropTypes.number),
    end: PropTypes.arrayOf(PropTypes.number),
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    locations: PropTypes.arrayOf(PropTypes.number),
    ...View.propTypes,
  },

  render: function() {
    var { colors, ...otherProps } = this.props;
    return (
      <NativeLinearGradient {...otherProps} colors={colors.map(processColor)} />
    );
  }
});

var NativeLinearGradient = requireNativeComponent('BVLinearGradient', null);

module.exports = LinearGradient;
