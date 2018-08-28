declare module "react-native-linear-gradient" {
    import * as React from "react";
    import * as ReactNative from "react-native";

    type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
    type ReactNativeViewProps = Omit<ReactNative.ViewProps, 'start' | 'end'>;
    
    export interface LinearGradientProps extends ReactNativeViewProps {
        colors: (string|number)[],
        start?: { x: number, y: number },
        end?: { x: number, y: number },
        locations?: number[]
    }

    export class LinearGradient extends React.Component<LinearGradientProps, any> { }

    export default LinearGradient
}
