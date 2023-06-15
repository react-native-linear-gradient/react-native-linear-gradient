import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';

const AngleGradient = () => {
  const [angle, setAngle] = useState(135);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setAngle(Math.floor(Math.random() * 360))}>
        <LinearGradient
          angle={angle}
          colors={['red', 'blue']}
          style={styles.gradient}
          useAngle={true}
        />
      </Pressable>
      <View style={styles.rightContainer}>
        <Slider
          maximumValue={359}
          minimumValue={0}
          onValueChange={value => {
            setAngle(value);
          }}
          step={1}
          value={angle}
        />
        <Text>Slide to change the angle</Text>
        <Text>Angle: {angle}</Text>
      </View>
    </View>
  );
};

export default AngleGradient;
