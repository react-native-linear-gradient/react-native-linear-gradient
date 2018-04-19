import * as React from "react";
import * as ReactNative from "react-native";

declare module "react-native-linear-gradient" {

    export interface LinearGradientProps extends ReactNative.ViewProperties {
        colors: string[],
        startPoint?: { x: number, y: number },
        endPoint?: { x: number, y: number },
        locations?: number[]
    }

    export class LinearGradient extends React.Component<LinearGradientProps, any> { }

    export default LinearGradient
}
