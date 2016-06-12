/**
 * @providesModule LinearGradient
 * @flow
 */
import React, { PropTypes } from 'react';
import { processColor, requireNativeComponent, View } from 'react-native';

type Props = {
  start?: Array<number>;
  end?: Array<number>;
  colors: Array<string>;
  locations?: Array<number>;
};

export default function LinearGradient({
  colors,
  locations,
  ...otherProps
}: Props) {

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

LinearGradient.propTypes = {
  start: PropTypes.arrayOf(PropTypes.number),
  end: PropTypes.arrayOf(PropTypes.number),
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  locations: PropTypes.arrayOf(PropTypes.number),
  ...View.propTypes,
};

const NativeLinearGradient = requireNativeComponent('BVLinearGradient', null);
