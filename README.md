# react-native-linear-gradient

A `<LinearGradient>` component for react-native, as seen in
[react-native-login](https://github.com/brentvatne/react-native-login).

Version 1.5.0 supports react-native >= 0.19.0

## Add it to your project

You can use [`rnpm`](https://github.com/rnpm/rnpm) to add native dependencies automatically:

`$ rnpm link`

or do it manually as described below:

### iOS




- Run `npm install react-native-linear-gradient --save`

Then either: 
#####Cocoapods
add the following line to your Podfile:

`pod 'BVLinearGradient', :path => ‘../node_modules/react-native-linear-gradient'`

or:
#####Manually

1. Open your project in XCode, right click on `Libraries` and click `Add
   Files to "Your Project Name"` Look under `node_modules/react-native-linear-gradient` and add `BVLinearGradient.xcodeproj`.  [(Screenshot)](http://url.brentvatne.ca/g9Wp).
2. Add `libBVLinearGradient.a` to `Build Phases -> Link Binary With Libraries`
   [(Screenshot)](http://url.brentvatne.ca/g9Wp).
3. Click on `BVLinearGradient.xcodeproj` in `Libraries` and go the `Build
   Settings` tab. Double click the text to the right of `Header Search
   Paths` and verify that it has `$(SRCROOT)/../react-native/React` - if it
   isn't, then add it. This is so XCode is able to find the headers that
   the `BVLinearGradient` source files are referring to by pointing to the
   header files installed within the `react-native` `node_modules`
   directory. [(Screenshot)](http://url.brentvatne.ca/7wE0).
   
Then:

   
- Whenever you want to use it within React code now you can: `import LinearGradient from 'react-native-linear-gradient';`


**If you're having trouble, you can point your `package.json` at github to see if the issue has been fixed.  Simply change the dependency**

`"react-native-linear-gradient": "brentvatne/react-native-linear-gradient",` 

**to get the data right from github instead of npm and then `npm install`**

For instance the podspec file does not contain the right data (author attributes etc..) in npm while it does in the github repo.

#### Android

1. in `android/settings.gradle`
   ```
   ...
   include ':react-native-linear-gradient'
   project(':react-native-linear-gradient').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-linear-gradient/android')
   ```

2. in `android/app/build.gradle` add:
   ```
   dependencies {
       ...
       compile project(':react-native-linear-gradient')
   }
   ```

3. and finally, in `android/src/main/java/com/{YOUR_APP_NAME}/MainActivity.java` add:
   ```java
   //...
   import com.BV.LinearGradient.LinearGradientPackage; // <--- This!
   //...
   @Override
   protected List<ReactPackage> getPackages() {
     return Arrays.<ReactPackage>asList(
       new MainReactPackage(),
       new LinearGradientPackage() // <---- and This!
     );
}
   ```

## Examples


### Simple

The following code will produce something like this:

![Example code result](https://raw.githubusercontent.com/brentvatne/react-native-linear-gradient/master/images/example.png)

```javascript
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

### Additional props

You can also use start and end points, as well as specify the locations
for the gradient color changes with the `start`, `end` and `locations`
props:

```javascript
<LinearGradient
  start={[0.0, 0.25]} end={[0.5, 1.0]}
  locations={[0,0.5,0.6]}
  colors={['#4c669f', '#3b5998', '#192f6a']}
  style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Sign in with Facebook
  </Text>
</LinearGradient>
```

![Example with extra props](https://raw.githubusercontent.com/brentvatne/react-native-linear-gradient/master/images/example-other-props.png)

### Updating the values for fun

Check out [Examples/AnimatedGradient] (`git clone` this project, cd into it, npm install, open in XCode and run) to see how this is done:

![Example with extra props](https://raw.githubusercontent.com/brentvatne/react-native-linear-gradient/master/images/example-animated.gif)

*This gif was created using [licecap](http://www.cockos.com/licecap/) - a great piece of free OSS*

### An example app
You can see this component in action in [brentvatne/react-native-login](https://github.com/brentvatne/react-native-login/blob/master/App/Screens/LoginScreen.js#L58-L62).

### License

License is MIT
