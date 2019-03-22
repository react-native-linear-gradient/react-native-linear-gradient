// @flow

import type { ElementProps } from 'react';
import { requireNativeComponent, View } from 'react-native';

export default requireNativeComponent('BVLinearGradient');

export type Point = $Exact<{x: number, y: number}>;
type LinearGradientProps = {
  start?: Point;
  end?: Point;
  colors: string[];
  locations?: number[];
  useAngle?: boolean;
  angleCenter?: Point;
  angle?: number;
};

type ViewProps = ElementProps<typeof View>;
export type Props = {| ...$Exact<LinearGradientProps>, ...ViewProps |}
