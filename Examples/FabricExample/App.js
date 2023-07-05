/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, {Component, Fragment} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
 } from 'react-native';
 
 import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
 
 import LinearGradient from 'react-native-linear-gradient';
 
 class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       count: 0,
       colorTop: '#000000',
       colorBottom: '#cccccc',
     };
   }
 
   incrementColor = (color, step) => {
     const intColor = parseInt(color.substr(1), 16);
     const newIntColor = (intColor + step).toString(16);
     return `#${'0'.repeat(6 - newIntColor.length)}${newIntColor}`;
   };
 
   componentDidMount() {
     setInterval(() => {
       this.setState({
         count: this.state.count + 1,
         colorTop: this.incrementColor(this.state.colorTop, 1),
         colorBottom: this.incrementColor(this.state.colorBottom, -1),
       });
     }, 20);
   }
 
   render() {
     return (
       <Fragment>
         <StatusBar barStyle="dark-content" />
         <SafeAreaView>
           <ScrollView
             contentInsetAdjustmentBehavior="automatic"
             style={styles.scrollView}>
             <Header />
             {global.HermesInternal == null ? null : (
               <View style={styles.engine}>
                 <Text style={styles.footer}>Engine: Hermes</Text>
               </View>
             )}
             <View style={styles.body}>
               <LinearGradient
                 colors={[this.state.colorTop, this.state.colorBottom]}
                 style={styles.gradient}
               />
               <Text style={{color: this.state.colorTop}}>
                 {this.state.colorTop}
               </Text>
               <Text style={{color: this.state.colorBottom}}>
                 {this.state.colorBottom}
               </Text>
             </View>
           </ScrollView>
         </SafeAreaView>
       </Fragment>
     );
   }
 }
 
 const styles = StyleSheet.create({
   scrollView: {
     backgroundColor: Colors.lighter,
   },
   engine: {
     position: 'absolute',
     right: 0,
   },
   body: {
     backgroundColor: Colors.white,
   },
   highlight: {
     fontWeight: '700',
   },
   gradient: {
     width: 200,
     height: 200,
   },
   footer: {
     color: Colors.dark,
     fontSize: 12,
     fontWeight: '600',
     padding: 4,
     paddingRight: 12,
     textAlign: 'right',
   },
 });
 
 export default App;
 