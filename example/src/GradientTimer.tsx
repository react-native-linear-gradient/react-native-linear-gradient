import React, {useEffect, useState} from 'react';
import {AppState, Pressable, Text, View} from 'react-native';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';

const incrementColor = (color: string, step: number) => {
  const intColor = parseInt(color.substring(1), 16);
  const newIntColor = (intColor + step).toString(16);
  return `#${'0'.repeat(6 - newIntColor.length)}${newIntColor}`;
};

const GradientTimer = () => {
  const [colorTop, setColorTop] = useState('#000000');
  const [colorBottom, setColorBottom] = useState('#cccccc');

  const [delay, setDelay] = useState(20);

  const pause = () => setDelay(prev => (prev > 0 ? -prev : prev));
  const resume = () => setDelay(prev => (prev < 0 ? -prev : prev));

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        setDelay(prev => (prev < 0 ? -prev : prev));
      } else if (nextAppState === 'background') {
        setDelay(prev => (prev > 0 ? -prev : prev));
      }
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (delay <= 0) {
      return;
    }
    const id = setInterval(() => {
      setColorTop(prev => incrementColor(prev, 1));
      setColorBottom(prev => incrementColor(prev, -1));
    }, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => (delay <= 0 ? resume() : pause())}>
        <LinearGradient
          colors={[colorTop, colorBottom]}
          style={styles.gradient}
        />
      </Pressable>
      <View style={styles.rightContainer}>
        <Slider
          minimumValue={10}
          maximumValue={100}
          onSlidingStart={() => pause()}
          onSlidingComplete={() => resume()}
          onValueChange={value => setDelay(prev => (prev < 0 ? -value : value))}
          step={1}
          value={Math.abs(delay)}
        />
        <Text>
          Timer: {Math.abs(delay)} ms{delay <= 0 && ' [Paused]'}
        </Text>
        <Text style={{color: colorTop}}>{colorTop}</Text>
        <Text style={{color: colorBottom}}>{colorBottom}</Text>
      </View>
    </View>
  );
};

export default GradientTimer;
