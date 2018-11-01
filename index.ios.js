/**
 * @providesModule LinearGradient
 * @flow
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { processColor, PointPropType, View, ViewPropTypes } from 'react-native';
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
const deprecatedPropType = require('react-native/Libraries/Utilities/deprecatedPropType.js');
const ColorPropType = require('react-native/Libraries/StyleSheet/ColorPropType.js');

import NativeLinearGradient from './nativeLinearGradient';

const convertPoint = (name, point) => {
  if (Array.isArray(point)) {
    console.warn(
      `LinearGradient '${name}' property should be an object with fields 'x' and 'y', ` +
      'Array type is deprecated.'
    );

    return {
      x: point[0],
      y: point[1]
    };
  }
  return point;
};

type PropsType = {
  start?: Array<number> | {x: number, y: number};
  end?: Array<number> | {x: number, y: number};
  colors: Array<string>;
  locations?: Array<number>;
} & ViewProps;

export default class LinearGradient extends Component {
  static propTypes = {
    start: PropTypes.oneOfType([
      PointPropType,
      deprecatedPropType(
        PropTypes.arrayOf(PropTypes.number),
        'Use point object with {x, y} instead.'
      )
    ]),
    end: PropTypes.oneOfType([
      PointPropType,
      deprecatedPropType(
        PropTypes.arrayOf(PropTypes.number),
        'Use point object with {x, y} instead.'
      )
    ]),
    colors: PropTypes.arrayOf(ColorPropType).isRequired,
    locations: PropTypes.arrayOf(PropTypes.number),
    ...ViewPropTypes,
  };
  props: PropsType;
  gradientRef: any;

  static defaultProps = {
    start: { x: 0.5, y: 0.0 },
    end: { x: 0.5, y: 1.0 },
  };

  setNativeProps(props: PropsType) {
    this.gradientRef.setNativeProps(props);
  }

  render() {
    const {
      start,
      end,
      colors,
      locations,
      ...otherProps
    } = this.props;
    if ((colors && locations) && (colors.length !== locations.length)) {
      console.warn('LinearGradient colors and locations props should be arrays of the same length');
    }

    return (
      <NativeLinearGradient
        ref={(component) => { this.gradientRef = component; }}
        {...otherProps}
        startPoint={convertPoint('start', start)}
        endPoint={convertPoint('end', end)}
        colors={colors.map(processColor)}
        locations={locations ? locations.slice(0, colors.length) : null}
      />
    );
  }
}
