import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';

const INITIAL_DELAY = 20;

const GradientTimer = () => {
  const [colorTop, setColorTop] = useState('#000000');
  const [colorBottom, setColorBottom] = useState('#cccccc');

  const [delay, setDelay] = useState(INITIAL_DELAY);
  const [nextDelay, setNextDelay] = useState(INITIAL_DELAY);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(() => {
    setColorTop(incrementColor(colorTop, 1));
    setColorBottom(incrementColor(colorBottom, -1));
  }, delay);

  const incrementColor = (color: string, step: number) => {
    const intColor = parseInt(color.substring(1), 16);
    const newIntColor = (intColor + step).toString(16);
    return `#${'0'.repeat(6 - newIntColor.length)}${newIntColor}`;
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          if (isRunning) {
            setIsRunning(false);
            setNextDelay(delay);
            setDelay(0);
          } else {
            setDelay(nextDelay);
            setIsRunning(true);
          }
        }}>
        <LinearGradient
          colors={[colorTop, colorBottom]}
          style={styles.gradient}
        />
      </Pressable>
      <View style={styles.rightContainer}>
        <Slider
          minimumValue={10}
          maximumValue={100}
          onSlidingStart={() => {
            setDelay(0);
            setIsRunning(true);
          }}
          onSlidingComplete={value => setDelay(value)}
          onValueChange={value => setNextDelay(value)}
          step={1}
          value={delay}
        />
        <Text>
          Timer: {isRunning ? `${delay ? delay : nextDelay} ms` : 'Paused'}
        </Text>
        <Text style={{color: colorTop}}>{colorTop}</Text>
        <Text style={{color: colorBottom}}>{colorBottom}</Text>
      </View>
    </View>
  );
};

// https://overreacted.io/making-setinterval-declarative-with-react-hooks
function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    if (delay > 0) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default GradientTimer;
