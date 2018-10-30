// @flow

import React, { Component } from 'react';
import { processColor, requireNativeComponent, View } from 'react-native';

const convertPoint = (name, point) => {
  if (Array.isArray(point)) {
    console.error(
      `LinearGradient '${name}' property should be an object with fields 'x' and 'y', Array type is deprecated.`
    );

    return {
      x: point[0],
      y: point[1]
    };
  }
  return point;
};

type Props = {
  start?: {x: number, y: number};
  end?: {x: number, y: number};
  colors: string[];
  locations?: number[];
} & typeof(View);

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
      start,
      end,
      colors,
      locations,
      ...otherProps
    } = this.props;

    if ((colors && locations) && (colors.length !== locations.length)) {
      throw new Error('LinearGradient colors and locations props should be arrays of the same length');
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

const NativeLinearGradient = requireNativeComponent('BVLinearGradient', null);
