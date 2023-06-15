/**
 * @providesModule LinearGradient
 * @flow
 */
import React, { Component } from 'react';
import { processColor, View } from 'react-native';

import NativeLinearGradient, { type Props } from './common';

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

export default class LinearGradient extends Component<Props> {
  props: Props;
  gradientRef: any;

  static defaultProps = {
    start: { x: 0.5, y: 0.0 },
    end: { x: 0.5, y: 1.0 },
  };

  setNativeProps(props: Props) {
    this.gradientRef.setNativeProps(props);
  }

  render() {
    const {
      children,
      start,
      end,
      colors,
      locations,
      useAngle,
      angleCenter,
      angle,
      style,
      ...otherProps
    } = this.props;
    if ((colors && locations) && (colors.length !== locations.length)) {
      console.warn('LinearGradient colors and locations props should be arrays of the same length');
    }

    return (
      <View ref={(component) => { this.gradientRef = component; }} {...otherProps} style={style}>
        <NativeLinearGradient
          style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
          colors={colors.map(processColor)}
          startPoint={convertPoint('start', start)}
          endPoint={convertPoint('end', end)}
          locations={locations ? locations.slice(0, colors.length) : null}
          useAngle={useAngle}
          angleCenter={convertPoint('angleCenter', angleCenter)}
          angle={angle}
        />
        {children}
      </View>
    );
  }
}
