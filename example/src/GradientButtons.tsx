import React from 'react';
import {Alert, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';

const LinearGradientButton: React.FC<{
  colors: string[];
  onPress: () => void;
  title: string;
}> = ({colors, onPress, title}) => {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient colors={colors} style={buttonStyles.button}>
        <Text style={buttonStyles.buttonText}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const GradientButtons = () => {
  return (
    <View style={styles.container}>
      <LinearGradientButton
        colors={['#4c669f', '#3b5998', '#192f6a']}
        onPress={() => Alert.alert('Sign in', 'Success')}
        title={'Sign in with Facebook'}
      />
      <LinearGradientButton
        colors={['#d02828', '#832020']}
        onPress={() => Alert.alert('Logout', 'Success')}
        title={'Logout'}
      />
    </View>
  );
};
const buttonStyles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 4,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'normal',
    fontSize: 18,
    margin: 10,
  },
});

export default GradientButtons;
