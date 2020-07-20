// @flow

import type { ElementProps } from 'react';
import { requireNativeComponent, typeof View } from 'react-native';

export default requireNativeComponent('BVLinearGradient');

export type Point = $ReadOnly<{| x: number, y: number |}>;

type LinearGradientProps = $ReadOnly<{|
  start?: Point;
  end?: Point;
  colors: $ReadOnlyArray<string>;
  locations?: $ReadOnlyArray<number>;
  useAngle?: boolean;
  angleCenter?: Point;
  angle?: number;
|}>;

type ViewProps = ElementProps<View>;

export type Props = {| ...LinearGradientProps, ...ViewProps |}
