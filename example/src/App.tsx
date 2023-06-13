import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SimpleGradient from './SimpleGradient';
import AngleGradient from './AngleGradient';
import AnimatedGradient from './AnimatedGradient';
import GradientButtons from './GradientButtons';
import GradientTimer from './GradientTimer';
import LinearGradient from 'react-native-linear-gradient';

const pkg = require('../package.json');

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle]}>{title}</Text>
      {children}
    </View>
  );
};

const App = () => {
  const rnVersion = pkg.dependencies['react-native'];
  // @ts-ignore
  const jsEngine = global?.HermesInternal ? 'Hermes' : 'JSC';
  // @ts-ignore
  const uiManager = global?.nativeFabricUIManager ? 'Fabric' : 'Paper';
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#ffffff00"
        barStyle={'dark-content'}
        translucent={true}
      />
      <ImageBackground
        source={require('react-native/Libraries/NewAppScreen/components/logo.png')}
        style={styles.titleContainer}
        imageStyle={styles.logo}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            React Native {rnVersion} ({jsEngine}; {uiManager})
          </Text>
        </View>
        <LinearGradient
          colors={['#ffffff00', '#fff']}
          locations={[0.5, 1]}
          style={styles.titleGradient}>
          <Text style={styles.titleText}>react-native-linear-gradient</Text>
        </LinearGradient>
      </ImageBackground>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Section title="Simple Gradient">
          <SimpleGradient />
        </Section>
        <Section title="Angle Gradient">
          <AngleGradient />
        </Section>
        <Section title="Animated Gradient">
          <AnimatedGradient />
        </Section>
        <Section title="Gradient Timer">
          <GradientTimer />
        </Section>
        <Section title="Gradient Buttons">
          <GradientButtons />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 24,
  },
  titleContainer: {
    marginBottom: 8,
  },
  titleGradient: {
    height: 96,
    justifyContent: 'center',
  },
  logo: {
    marginLeft: -48,
    marginTop: -48,
    opacity: 0.2,
    width: '55%',
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  badge: {
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  badgeText: {
    color: '#777',
    padding: 4,
  },
  sectionContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    margin: 4,
  },
});

export default App;
