/**
 * @providesModule LinearGradient
 * @flow
 */

'use strict';
import React, { PropTypes } from 'react';
import { processColor, requireNativeComponent, View } from 'react-native';

var LinearGradient = React.createClass({
  propTypes: {
    start: PropTypes.arrayOf(PropTypes.number),
    end: PropTypes.arrayOf(PropTypes.number),
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    locations: PropTypes.arrayOf(PropTypes.number),
    ...View.propTypes,
  },

  render: function() {
    var { colors, locations, ...otherProps } = this.props;

    if ((colors && locations) && (colors.length !== locations.length)) {
      console.warn('LinearGradient colors and locations props should be arrays of the same length');
    }

    return (
      <NativeLinearGradient
        {...otherProps}
        colors={colors.map(processColor)}
        locations={locations ? locations.slice(0, colors.length) : null}
      />
    );
  }
});

var NativeLinearGradient = requireNativeComponent('BVLinearGradient', null);

module.exports = LinearGradient;
