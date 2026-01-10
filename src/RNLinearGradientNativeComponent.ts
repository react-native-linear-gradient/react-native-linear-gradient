import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ColorValue } from 'react-native/Libraries/StyleSheet/StyleSheet';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';
// @ts-expect-error PointValue is exported in Flow but not in TypeScript definitions
import type { PointValue } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

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
