/**
 * @providesModule LinearGradient
 * @flow
 */

'use strict';

var ReactNativeViewAttributes = require('ReactNativeViewAttributes');
var createReactNativeComponentClass = require('createReactNativeComponentClass');
var merge = require('merge');
var deepDiffer = require('deepDiffer');

var LinearGradient = createReactNativeComponentClass({
  validAttributes: merge(ReactNativeViewAttributes.UIView, {
    colors:    {diff: deepDiffer},
    start:     {diff: deepDiffer},
    end:       {diff: deepDiffer},
    locations: {diff: deepDiffer},
  }),
  uiViewClassName: 'BVLinearGradient',
});

module.exports = LinearGradient;
