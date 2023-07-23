/**
 * @providesModule LinearGradient
 * @flow
 */
import React, { Component, createRef } from 'react';
import { processColor, StyleSheet, View } from 'react-native';

import NativeLinearGradient, { type Props } from './common';

const convertPoint = (name, point) => {
  if (Array.isArray(point)) {
    console.warn(
      `LinearGradient '${name}' property should be an object with fields 'x' and 'y', ` +
      'Array type is deprecated.'
    );
  }
  // TODO: Update Android native code to receive a {x, y} object, not an array
  if (point !== null && typeof point === 'object') {
    return [point.x, point.y];
  }
  return point;
};

/**
 * Checks if value is a valid number. Otherwise, defaults to defaultValue.
 *
 * @param {number} defaultValue
 */
const validNumber = (defaultValue) => (value) => {
  return typeof value === 'number' ? value : defaultValue;
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
      children,
      colors,
      end,
      locations,
      useAngle,
      angleCenter,
      angle,
      start,
      style,
      ...otherProps
    } = this.props;

    if ((colors && locations) && (colors.length !== locations.length)) {
      console.warn('LinearGradient colors and locations props should be arrays of the same length');
    }

    // inherit container borderRadius until this issue is resolved:
    // https://github.com/facebook/react-native/issues/3198
    const flatStyle = StyleSheet.flatten(style) || {};
    const borderRadius = flatStyle.borderRadius || 0;
    const validRadius = validNumber(borderRadius);

    // this is the format taken by:
    // http://developer.android.com/reference/android/graphics/Path.html#addRoundRect(android.graphics.RectF, float[], android.graphics.Path.Direction)
    const borderRadiiPerCorner = [
      validRadius(flatStyle.borderTopLeftRadius),
      validRadius(flatStyle.borderTopLeftRadius),
      validRadius(flatStyle.borderTopRightRadius),
      validRadius(flatStyle.borderTopRightRadius),
      validRadius(flatStyle.borderBottomRightRadius),
      validRadius(flatStyle.borderBottomRightRadius),
      validRadius(flatStyle.borderBottomLeftRadius),
      validRadius(flatStyle.borderBottomLeftRadius)
    ];

    return (
      <View ref={this.gradientRef} {...otherProps} style={style}>
        <NativeLinearGradient
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
          colors={colors.map(processColor)}
          startPoint={convertPoint('start', start)}
          endPoint={convertPoint('end', end)}
          locations={locations ? locations.slice(0, colors.length) : null}
          useAngle={useAngle}
          angleCenter={convertPoint('angleCenter', angleCenter)}
          angle={angle}
          borderRadii={borderRadiiPerCorner}
        />
        {children}
      </View>
    );
  }
}
