import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';

const SimpleGradient = () => {
  const colors = ['red', 'green', 'blue'];
  return (
    <View style={styles.container}>
      {colors.map((value, index) => (
        <LinearGradient
          colors={[value, 'white']}
          key={index}
          style={styles.gradient}
        />
      ))}
    </View>
  );
};

export default SimpleGradient;
