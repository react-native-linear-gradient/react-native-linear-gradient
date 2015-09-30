var React = require('react-native');
var { requireNativeComponent, PropTypes, View, processColor } = React;


var LinearGradient = React.createClass({
  propTypes: {
    colors: PropTypes.array.isRequired,
    positions: PropTypes.array
  },

  render: function() {
    var {style, children, colors, positions, ...otherProps} = this.props;
    return (
      <View style={style}>
        <NativeLinearGradient
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
          colors={colors.map(processColor)}
          positions={positions} />
        { children }
      </View>
    );
  }
})

 var NativeLinearGradient = requireNativeComponent('BVLinearGradient', LinearGradient);

 module.exports = LinearGradient;
