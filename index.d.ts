declare module 'react-native-linear-gradient' {
  import * as React from 'react';
  import { ViewProps } from 'react-native';

  export interface LinearGradientProps extends ViewProps {
    /** Array of color strings, e.g. ['#fff', '#000'] */
    colors: (string | number)[];
    /** Start position of the gradient, e.g. { x: 0, y: 0 }. Default: { x: 0.5, y: 0.0 } */
    start?: { x: number; y: number };
    /** End position of the gradient, e.g. { x: 1, y: 1 }. Default: { x: 0.5, y: 1.0 } */
    end?: { x: number; y: number };
    /** Optional array of numbers (0-1) specifying gradient color stop positions */
    locations?: number[];
    /** Use angle instead of start/end points */
    useAngle?: boolean;
    /** Center point for angle-based gradient, e.g. { x: 0.5, y: 0.5 } */
    angleCenter?: { x: number; y: number };
    /** Angle in degrees for angle-based gradient */
    angle?: number;
  }

  declare const LinearGradient: React.ComponentClass<LinearGradientProps>;
  export default LinearGradient;
}
