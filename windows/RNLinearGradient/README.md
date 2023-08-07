# [module name here] Windows Implementation

## Module Installation
You can either use autolinking on react-native-windows 0.63 and later or manually link the module on earlier releases.

## Automatic install with autolinking on RNW >= 0.63
RNLinearGradient supports autolinking. Just call: `npm i [module name here] --save`

## Manual installation on RNW >= 0.62
1. `npm install [module name here] --save`
2. Open your solution in Visual Studio 2019 (eg. `windows\yourapp.sln`)
3. Right-click Solution icon in Solution Explorer > Add > Existing Project...
4. Add `node_modules\[module name here]\windows\RNLinearGradient\RNLinearGradient.vcxproj`
5. Right-click main application project > Add > Reference...
6. Select `RNLinearGradient` in Solution Projects
7. In app `pch.h` add `#include "winrt/RNLinearGradient.h"`
8. In `App.cpp` add `PackageProviders().Append(winrt::RNLinearGradient::ReactPackageProvider());` before `InitializeComponent();`

## Module development

If you want to contribute to this module Windows implementation, first you must install the [Windows Development Dependencies](https://aka.ms/rnw-deps).

You must temporarily install the `react-native-windows` package. Versions of `react-native-windows` and `react-native` must match, e.g. if the module uses `react-native@0.62`, install `npm i react-native-windows@^0.62 --dev`.

Now, you will be able to open corresponding `RNLinearGradient...sln` file, e.g. `RNLinearGradient62.sln` for `react-native-windows@0.62`.
