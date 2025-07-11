import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';

const AngleGradient = () => {
  const [angle, setAngle] = useState(135);
  const [angleCenterX, setAngleCenterX] = useState(0.5);
  const [angleCenterY, setAngleCenterY] = useState(0.5);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={e => {
          const {locationX, locationY} = e.nativeEvent;
          setAngleCenterX(locationX / styles.gradient.width);
          setAngleCenterY(locationY / styles.gradient.height);
        }}>
        <LinearGradient
          angle={angle}
          angleCenter={{x: angleCenterX, y: angleCenterY}}
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
        <Text>Angle: {angle}</Text>
        <Text style={styles.hintText}>Slide to change the angle</Text>
        <Text style={styles.hintText}>Tap to change angle center</Text>
      </View>
    </View>
  );
};

export default AngleGradient;
