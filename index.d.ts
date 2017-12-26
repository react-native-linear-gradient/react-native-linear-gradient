import * as React from "react";
import * as ReactNative from "react-native";

declare module "react-native-linear-gradient" {

    interface LinearGradientProps extends ReactNative.ViewProperties {
        colors: string[],
        startPoint?: { x: number, y: number },
        endPoint?: { x: number, y: number },
        locations?: number[]
    }

    export default class LinearGradient extends React.Component<LinearGradientProps, any> { }
}
