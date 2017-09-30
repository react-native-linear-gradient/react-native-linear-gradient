import * as React from "react";
import * as ReactNative from "react-native";

declare module "react-native-linear-gradient" {

    interface LinearGradientProps extends ReactNative.ViewProperties {
        colors: string[],
        start?: { x: number, y: number },
        end?: { x: number, y: number },
        locations?: number[]
    }

    export default class LinearGradient extends React.Component<LinearGradientProps, any> { }
}
