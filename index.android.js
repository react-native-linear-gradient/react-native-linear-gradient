import React, { Component, PropTypes } from 'react';
import { processColor, requireNativeComponent, StyleSheet, View } from 'react-native';

export default class LinearGradient extends Component {
  static propTypes = {
    start: PropTypes.arrayOf(PropTypes.number),
    end: PropTypes.arrayOf(PropTypes.number),
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    locations: PropTypes.arrayOf(PropTypes.number),
    ...View.propTypes,
  };

  render() {
    const {
      children,
      colors,
      end,
      locations,
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

    // this is the format taken by:
    // http://developer.android.com/reference/android/graphics/Path.html#addRoundRect(android.graphics.RectF, float[], android.graphics.Path.Direction)
    const borderRadiiPerCorner = [
      flatStyle.borderTopLeftRadius || borderRadius,
      flatStyle.borderTopLeftRadius || borderRadius,
      flatStyle.borderTopRightRadius || borderRadius,
      flatStyle.borderTopRightRadius || borderRadius,
      flatStyle.borderBottomRightRadius || borderRadius,
      flatStyle.borderBottomRightRadius || borderRadius,
      flatStyle.borderBottomLeftRadius || borderRadius,
      flatStyle.borderBottomLeftRadius || borderRadius
    ];

    return (
      <View {...otherProps} style={style}>
        <NativeLinearGradient
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
          colors={colors.map(processColor)}
          start={start}
          end={end}
          locations={locations ? locations.slice(0, colors.length) : null}
          borderRadii={borderRadiiPerCorner}
        />
        { children }
      </View>
    );
  }
}

const NativeLinearGradient = requireNativeComponent('BVLinearGradient', null);
