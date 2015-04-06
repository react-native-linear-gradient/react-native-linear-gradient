var React = require('React');
var NativeModules = require('NativeModules');
var ReactIOSViewAttributes = require('ReactIOSViewAttributes');
var StyleSheet = require('StyleSheet');
var createReactIOSNativeComponentClass = require('createReactIOSNativeComponentClass');
var PropTypes = require('ReactPropTypes');
var NativeMethodsMixin = require('NativeMethodsMixin');
var flattenStyle = require('flattenStyle');
var merge = require('merge');

var LinearGradient = React.createClass({
  propTypes: {
    colors: PropTypes.array,
    start: PropTypes.array,
    end: PropTypes.array,
    locations: PropTypes.array,
  },

  mixins: [NativeMethodsMixin],

  viewConfig: {
    uiViewClassName: 'UIView',
    validAttributes: ReactIOSViewAttributes.UIView
  },

  render: function() {
    var style = flattenStyle([styles.base, this.props.style]);

    var nativeProps = merge(this.props, {
      style,
    });

    return <BVLinearGradient {... nativeProps} />
  },
});

var strictEquality = (a, b) => { return a !== b; };

var BVLinearGradient = createReactIOSNativeComponentClass({
  validAttributes: merge(ReactIOSViewAttributes.UIView, {
    colors:    {diff: strictEquality},
    start:     {diff: strictEquality},
    end:       {diff: strictEquality},
    locations: {diff: strictEquality},
  }),
  uiViewClassName: 'BVLinearGradient',
});


var styles = StyleSheet.create({
  base: { },
});

module.exports = LinearGradient;
