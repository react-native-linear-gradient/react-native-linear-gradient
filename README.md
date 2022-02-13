# react-native-linear-gradient

A `<LinearGradient>` element for React Native

[![ci][1]][2]
[![npm version][3]][4]
[![npm downloads][5]][4]

## Table of Contents

- [Installation](#installation)
- [Usage and Examples](#examples)
- [Props](#props)
- [Example App](#an-example-app)
- [Troubleshooting](#troubleshooting)
- [Other Platforms](#other-platforms)

## Installation

Using Yarn

```sh
yarn add react-native-linear-gradient
```

Using npm

```sh
npm install react-native-linear-gradient --save
```

### With React Native >= 0.60

Run `npx pod-install`

## Linking (for React Native <= 0.59 only)

Note: If you are using react-native version 0.60 or higher you don't need to link [react-native-linear-gradient](https://github.com/react-native-community/react-native-linear-gradient).

### Automatic

```sh
react-native link react-native-linear-gradient
```

### Manual

<details>

  <summary>iOS (with CocoaPods)</summary>

  Add the following line to your Podfile:

  ```sh
  pod 'BVLinearGradient', :path => '../node_modules/react-native-linear-gradient'
  ```

  Run `npx pod-install`

</details>

<details>

  <summary>iOS (without CocoaPods)</summary>

  1. Open your project in Xcode
  2. Right click on `Libraries` and click `Add Files to "Your Project Name"`.
  3. Look under `node_modules/react-native-linear-gradient/ios` and add `BVLinearGradient.xcodeproj`.  [(Screenshot 1)](https://drive.google.com/open?id=1ynspo3wZjCLav23teGwKtzh7pcXpeREO) [(Screenshot 2)](https://drive.google.com/open?id=1cXW4DZ-hz-DiugZ3E30msd_4JoUWNE4Z).
  4. Add `libBVLinearGradient.a` to `Build Phases -> Link Binary With Libraries`
    [(Screenshot 1)](https://drive.google.com/open?id=12qT0Z7rfYrhnHYYECzVOAEMTjiPS2vJr) [(Screenshot 2)](https://drive.google.com/open?id=1LZ2CrOHydBjy479r9aEyMkvqqSbIdDLm).
  5. Click on `BVLinearGradient.xcodeproj` in `Libraries` and go the `Build
    Settings` tab.
  6. Double click the text to the right of `Header Search Paths` and verify that it has `$(SRCROOT)/../react-native/React` - if it isn't, then add it. [(Screenshot)](https://drive.google.com/open?id=1-m3KasC8xudkppVe_E2RsuFaxOfyx6FO).

</details>

<details>

  <summary>Android</summary>

  In `android/settings.gradle`

  ```groovy
  include ':react-native-linear-gradient'
  project(':react-native-linear-gradient').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-linear-gradient/android')
  ```

  In `android/app/build.gradle` add:

  ```groovy
  dependencies {
      ...
      implementation project(':react-native-linear-gradient')
  }
  ```

  In `android/app/src/main/java/com/{YOUR_APP_NAME}/MainActivity.java` for react-native < 0.29,
    or `android/app/src/main/java/com/{YOUR_APP_NAME}/MainApplication.java` for react-native >= 0.29 add:

  ```java
  // ...

  import com.BV.LinearGradient.LinearGradientPackage; // <--- This!

  // ...

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new LinearGradientPackage() // <---- and This!
    );
  }
  ```

</details>

<details>

  <summary>Windows (WPF)</summary>

  1. in `windows/MyApp.sln` Add -> Existing Project: `node_modules/react-native-linear-gradient/windows/LinearGradientWPF/LinearGradientWPF.csproj`

  2. in `windows/MyApp/MyAppWPF/MyAppWPF.csproj` Add -> Reference -> LinearGradientWPF

  3. in `windows/MyApp/MyAppWPF/AppReactPage.cs` add: `using LinearGradient;`
    and

  ```csharp
  public override List<IReactPackage> Packages => new List<IReactPackage>
  {
    ...
    new LinearGradientPackage()
  }
  ```

</details>

## Examples

[react-native-login](https://github.com/brentvatne/react-native-login) is a
legacy component which showcases the use of `<LinearGradient>`.

### Simple

The following code will produce something like this:

![Example code result](https://raw.githubusercontent.com/react-native-community/react-native-linear-gradient/master/images/example.png)

```javascript
import LinearGradient from 'react-native-linear-gradient';

// Within your render function
<LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Sign in with Facebook
  </Text>
</LinearGradient>

// Later on in your styles..
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
```

### Horizontal gradient

Using the styles from above, set `start` and `end` like this to make the gradient go from left to right, instead of from top to bottom:

```javascript
<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Sign in with Facebook
  </Text>
</LinearGradient>
```

### Text gradient (iOS)

On iOS you can use the `MaskedViewIOS` to display text with a gradient. The trick here is to render the text twice; once for the mask, and once to let the gradient have the correct size (hence the `opacity: 0`):

```jsx
<MaskedViewIOS maskElement={<Text style={styles.text} />}>
  <LinearGradient colors={['#f00', '#0f0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
    <Text style={[styles.text, { opacity: 0 }]} />
  </LinearGradient>
</MaskedViewIOS>
```

### Animated Gradient

Check out [Examples/AnimatedGradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient/blob/master/Examples/AnimatedGradient/App.js) (`git clone` this project, cd into it, npm install, open in Xcode and run) to see how this is done:

![Example with extra props](https://raw.githubusercontent.com/react-native-community/react-native-linear-gradient/master/images/example-animated.gif)

*This gif was created using [licecap](http://www.cockos.com/licecap/) - a great piece of free OSS*

### Transparent Gradient

The use of `transparent` color will most likely not lead to the expected result. `transparent` is actually a transparent black color (`rgba(0, 0, 0, 0)`). If you need a gradient in which the color is "fading", you need to have the same color with changing alpha channel. Example:

```jsx
// RGBA

<LinearGradient colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']} {...otherGradientProps} />

// Hex

<LinearGradient colors={['#FFFFFF00', '#FFFFFF']} {...otherGradientProps} />
```

## Props

In addition to regular `View` props, you can also provide additional props to customize your gradient look:

#### colors

An array of at least two color values that represent gradient colors. Example: `['red', 'blue']` sets gradient from red to blue.

#### start

An optional object of the following type: `{ x: number, y: number }`. Coordinates declare the position that the gradient starts at, as a fraction of the overall size of the gradient, starting from the top left corner. Example: `{ x: 0.1, y: 0.1 }` means that the gradient will start 10% from the top and 10% from the left.

#### end

Same as start, but for the end of the gradient.

#### locations

An optional array of numbers defining the location of each gradient color stop, mapping to the color with the same index in `colors` prop. Example: `[0.1, 0.75, 1]` means that first color will take 0% - 10%, second color will take 10% - 75% and finally third color will occupy 75% - 100%.

```javascript
<LinearGradient
  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
  locations={[0,0.5,0.6]}
  colors={['#4c669f', '#3b5998', '#192f6a']}
  style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Sign in with Facebook
  </Text>
</LinearGradient>
```

![Example with extra props](https://raw.githubusercontent.com/react-native-community/react-native-linear-gradient/master/images/example-other-props.png)

#### useAngle / angle / angleCenter

You may want to achieve an angled gradient effect, similar to those in image editors like Photoshop.
One issue is that you have to calculate the angle based on the view's size, which only happens asynchronously and will cause unwanted flickr.

In order to do that correctly you can set `{ useAngle: true, angle: 45, angleCenter: { x: 0.5, y: 0.5} }`, to achieve a gradient with a 45 degrees angle, with its center positioned in the view's exact center.

`useAngle` is used to turn on/off angle based calculation (as opposed to `start`/`end`).
`angle` is the angle in degrees.
`angleCenter` is the center point of the angle (will control the weight and stretch of the gradient like it does in photoshop.

## An example app

You can see this component in action in [brentvatne/react-native-login](https://github.com/brentvatne/react-native-login/blob/master/App/Screens/LoginScreen.js#L58-L62).

## Troubleshooting

### iOS build fails: library not found, "BVLinearGradient" was not found in the UIManager

1. Ensure you have followed the [installations steps](#installation) correctly. (`react-native link` for React Native < 0.60 and `npx pod-install` instead for > 0.60).
2. Ensure `pod 'BVLinearGradient', :path => '../node_modules/react-native-linear-gradient'` is present in your `ios/Podfile`
3. Ensure you use `ios/**.xcworkspace` file instead of `ios./**.xcodeproj`

### Invariant Violation: Element type is invalid

Ensure you import the `LinearGradient` correctly:

```javascript
// Like that:
import LinearGradient from 'react-native-linear-gradient';

// Not like that:
import { LinearGradient } from 'react-native-linear-gradient';
```

### Other

Clearing build caches and reinstalling dependencies sometimes solve some issues. Try next steps:

1. Reinstalling `node_modules` with `rm -rf node_modules && yarn`
2. Clearing Android Gradle cache with `(cd android && ./gradlew clean)`
3. Reinstalling iOS CocoaPods with `(cd ios && rm -rf ./ios/Pods/**) && npx pod-install`
4. Clearing Xcode Build cache (open Xcode and go to Product -> Clean Build Folder)

For other troubleshooting issues, go to [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting.html)

## Other platforms

- Web: [react-native-web-community/react-native-web-linear-gradient](https://github.com/react-native-web-community/react-native-web-linear-gradient)

## License

MIT

[1]: https://github.com/react-native-linear-gradient/react-native-linear-gradient/workflows/ci/badge.svg
[2]: https://github.com/react-native-linear-gradient/react-native-linear-gradient/actions
[3]: https://img.shields.io/npm/v/react-native-linear-gradient.svg
[4]: https://www.npmjs.com/package/react-native-linear-gradient
[5]: https://img.shields.io/npm/dm/react-native-linear-gradient.svg
