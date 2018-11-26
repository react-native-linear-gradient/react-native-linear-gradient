/**
 * @providesModule LinearGradient
 * @flow
 */
import React, { Component } from 'react';
import { processColor, View } from 'react-native';

import NativeLinearGradient from './common';

// TODO: Update Windows native code + update Props to share the same API with iOS/android
type Props = {
  start?: number[];
  end?: number[];
  colors: string[];
  locations?: number[];
} & typeof(View);

export default class LinearGradient extends Component<Props> {
  props: Props;
  gradientRef: any;

  setNativeProps(props: Props) {
    this.gradientRef.setNativeProps(props);
  }

  render() {
    const {
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
        colors={colors.map(processColor)}
        locations={locations ? locations.slice(0, colors.length) : null}
      />
    );
  }
}
