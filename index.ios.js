/**
 * @providesModule LinearGradient
 * @flow
 */
import React, { Component, createRef } from 'react';
import { processColor } from 'react-native';

import NativeLinearGradient, { type Props } from './src';

const isNewArch = () => global.nativeFabricUIManager != null;

const convertColors = colors => {
  if (!Array.isArray(colors)) {
    console.error(
      "LinearGradient: 'colors' prop must be an array of color values. " +
        `Received: ${
          typeof colors === 'object' ? JSON.stringify(colors) : colors
        } (${typeof colors})`,
    );
    return [];
  }

  if (colors.length < 2) {
    console.warn(
      "LinearGradient: 'colors' prop should contain at least 2 colors. " +
        `Received ${colors.length} color(s).`,
    );
  }

  // New Architecture (Fabric) handles color conversion automatically in the C++ layer
  if (isNewArch()) {
    return colors;
  }

  // Old architecture (Paper) needs pre-processed colors (processColor)
  return colors.map(processColor);
};

const convertPoint = (name, point) => {
  if (Array.isArray(point)) {
    console.warn(
      `LinearGradient '${name}' property should be an object with fields 'x' and 'y', ` +
        'Array type is deprecated.',
    );

    return {
      x: point[0],
      y: point[1],
    };
  }
  return point;
};

export default class LinearGradient extends Component<Props> {
  props: Props;
  gradientRef = createRef<NativeLinearGradient>();

  static defaultProps = {
    start: { x: 0.5, y: 0.0 },
    end: { x: 0.5, y: 1.0 },
  };

  setNativeProps(props: Props) {
    this.gradientRef.current.setNativeProps(props);
  }

  render() {
    const {
      start,
      end,
      colors,
      locations,
      useAngle,
      angleCenter,
      angle,
      ...otherProps
    } = this.props;

    if (colors && locations && colors.length !== locations.length) {
      console.warn(
        'LinearGradient colors and locations props should be arrays of the same length',
      );
    }

    return (
      <NativeLinearGradient
        ref={this.gradientRef}
        {...otherProps}
        startPoint={convertPoint('start', start)}
        endPoint={convertPoint('end', end)}
        colors={convertColors(colors)}
        locations={locations ? locations.slice(0, colors.length) : null}
        useAngle={useAngle}
        angleCenter={convertPoint('angleCenter', angleCenter)}
        angle={angle}
      />
    );
  }
}
