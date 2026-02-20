/**
 * @format
 */

import 'react-native';

import React from 'react';

// Note: import explicitly to use the types shipped with jest.
import { it } from '@jest/globals';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import App from '../src/App';

it('renders', () => {
  const app = renderer.create(<App />);
  app.unmount();
});
