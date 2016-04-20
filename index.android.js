var React = require('react-native');
var flattenStyle = React.StyleSheet.flatten;
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
    var { style, children, colors, locations, start, end, ...otherProps } = this.props;

    // inherit container borderRadius until this issue is resolved:
    // https://github.com/facebook/react-native/issues/3198
    var flatStyle = style && flattenStyle(style);
    var borderRadius = flatStyle.borderRadius || 0;

    // this is the format taken by:
    // http://developer.android.com/reference/android/graphics/Path.html#addRoundRect(android.graphics.RectF, float[], android.graphics.Path.Direction)
    var borderRadiiPerCorner = [
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
          locations={locations}
          borderRadii={borderRadiiPerCorner}
        />
        { children }
      </View>
    );
  }
})

 var NativeLinearGradient = requireNativeComponent('BVLinearGradient', null);

 module.exports = LinearGradient;
