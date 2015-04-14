var React = require('React');
var NativeModules = require('NativeModules');
var ReactIOSViewAttributes = require('ReactIOSViewAttributes');
var StyleSheet = require('StyleSheet');
var createReactIOSNativeComponentClass = require('createReactIOSNativeComponentClass');
var PropTypes = require('ReactPropTypes');
var NativeMethodsMixin = require('NativeMethodsMixin');
var flattenStyle = require('flattenStyle');
var merge = require('merge');
var deepDiffer = require('deepDiffer');

var LinearGradient = createReactIOSNativeComponentClass({
  validAttributes: merge(ReactIOSViewAttributes.UIView, {
    colors:    {diff: deepDiffer},
    start:     {diff: deepDiffer},
    end:       {diff: deepDiffer},
    locations: {diff: deepDiffer},
  }),
  uiViewClassName: 'BVLinearGradient',
});

module.exports = LinearGradient;
