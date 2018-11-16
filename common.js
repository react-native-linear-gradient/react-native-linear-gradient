// @flow

import { requireNativeComponent, View } from 'react-native';

export default requireNativeComponent('BVLinearGradient', null);

export type Point = $Exact<{x: number, y: number}>;
export type Props = $Exact<{
  start?: Point;
  end?: Point;
  colors: string[];
  locations?: number[];
  useAngle?: boolean;
  angleCenter?: Point;
  angle?: number;
}> & typeof(View);
