declare module "react-native-linear-gradient" {
  import * as React from "react";
  import * as ReactNative from "react-native";

  type DeepReadonly<T> = Readonly<{
    [K in keyof T]: T[K] extends number | string | symbol // Is it a primitive? Then make it readonly
      ? Readonly<T[K]>
      : // Is it an array of items? Then make the array readonly and the item as well
        T[K] extends Array<infer A>
        ? Readonly<Array<DeepReadonly<A>>>
        : // It is some other object, make it readonly as well
          DeepReadonly<T[K]>;
  }>;

  export type LinearGradientProps = ReactNative.ViewProps &
    DeepReadonly<{
      colors: (string | number)[];
      start?: { x: number; y: number };
      end?: { x: number; y: number };
      locations?: number[];
      useAngle?: boolean;
      angleCenter?: { x: number; y: number };
      angle?: number;
    }>;

  export class LinearGradient extends React.Component<LinearGradientProps> {}

  export default LinearGradient;
}
