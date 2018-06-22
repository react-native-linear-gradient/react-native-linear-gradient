import { Platform } from "react-native";
import LinearGradientIos from "./index.ios.js";
import LinearGradientAndroid from "./index.android.js";

const LinearGradient = Platform.OS === "ios"
  ? LinearGradientIos
  : LinearGradientAndroid;

export default LinearGradient;
