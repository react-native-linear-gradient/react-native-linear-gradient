import type { ColorValue, HostComponent, ViewProps } from 'react-native';
// @ts-expect-error PointValue is exported in Flow but not in TypeScript definitions
import type { PointValue } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  startPoint?: PointValue;
  endPoint?: PointValue;
  colors: ReadonlyArray<ColorValue>;
  locations?: ReadonlyArray<Float>;
  useAngle?: boolean;
  angleCenter?: PointValue;
  angle?: Float;
  borderRadii?: ReadonlyArray<Float>;
}

export default codegenNativeComponent<NativeProps>(
  'RNLinearGradient',
) as HostComponent<NativeProps>;
