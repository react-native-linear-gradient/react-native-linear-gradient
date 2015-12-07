var React = require('react-native');
var { requireNativeComponent, PropTypes, View, processColor } = React;


var LinearGradient = React.createClass({
  propTypes: {
    start: PropTypes.array,
    end: PropTypes.array,
    colors: PropTypes.array.isRequired,
    locations: PropTypes.array,
    ...View.propTypes,
  },

  render: function() {
    var {style, children, colors, locations, start, end, ...otherProps} = this.props;
    return (
      <View style={style}>
        <NativeLinearGradient
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
          colors={colors.map(processColor)}
          start={start}
          end={end}
          locations={locations} />
        { children }
      </View>
    );
  }
})

 var NativeLinearGradient = requireNativeComponent('BVLinearGradient', LinearGradient);

 module.exports = LinearGradient;
