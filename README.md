## react-native-linear-gradient

A `<LinearGradient>` component for react-native, as seen in
[react-native-login](https://github.com/brentvatne/react-native-login).

### Add it to your project

1. Run `npm install react-native-linear-gradient --save`
2. Open your project in XCode, right click on `Libraries` and click `Add
   Files to "Your Project Name" [(Screenshot)](http://url.brentvatne.ca/g9Wp).
3. Add `libBVLinearGradient.a` to `Build Phases -> Link Binary With Libraries`
   [(Screenshot)](http://url.brentvatne.ca/g9Wp).
4. Click on `BVLinearGradient.xcodeproj` in `Libraries` and go the `Build
   Phases` tab. Double click the text to the right of `Header Search
   Paths` and verify that it has `$(SRCROOT)../react-native/React` - if it
   isn't, then add it. This is so XCode is able to find the headers that
   the `BVLinearGradient` source files are referring to by pointing to the
   header files installed within the `react-native` `node_modules`
   directory. [(Screenshot)](http://url.brentvatne.ca/7wE0).
5. Whenever you want to use it within React code now you can: `var LinearGradient =
   require('react-native-linear-gradient');`

## Example

The following code will produce something like this:

![Example code result](https://raw.githubusercontent.com/brentvatne/react-native-linear-gradient/master/example.png)

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
  },
});
```

See the example in context [here](https://github.com/brentvatne/react-native-login/blob/master/index.ios.js).

## TODOS

- [ ] Support start/end points, angles
- [ ] Radial gradient
