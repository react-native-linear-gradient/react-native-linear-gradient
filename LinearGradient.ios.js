/**
 * @providesModule LinearGradient
 * @flow
 */

'use strict';

var ReactIOSViewAttributes = require('ReactIOSViewAttributes');
var createReactIOSNativeComponentClass = require('createReactIOSNativeComponentClass');
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
