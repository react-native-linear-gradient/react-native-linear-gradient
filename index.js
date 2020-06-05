import { Platform } from "react-native";
import LinearGradientIos from "./index.ios.js";
import LinearGradientAndroid from "./index.android.js";
import LinearGradientWindows from "./index.windows.js";

export const LinearGradient = Platform.OS === "ios"
  ? LinearGradientIos : Platform.OS === "android"
  ? LinearGradientAndroid : LinearGradientWindows;

export default LinearGradient;
