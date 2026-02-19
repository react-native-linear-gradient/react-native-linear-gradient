import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

import type { LinearGradientProps } from 'react-native-linear-gradient';
import NativeLinearGradient from 'react-native-linear-gradient';

class LinearGradient extends Component<Record<string, unknown>> {
  render() {
    const { children, ...props } = this.props;
    const colors: string[] = [];
    const forwardProps: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(props)) {
      if (key.startsWith('animatedColor') && typeof value === 'string') {
        colors.push(value);
      } else {
        forwardProps[key] = value;
      }
    }

    const nativeLinearProps = forwardProps as Omit<
      LinearGradientProps,
      'colors'
    >;

    return (
      <NativeLinearGradient {...nativeLinearProps} colors={colors}>
        {children as React.ReactNode}
      </NativeLinearGradient>
    );
  }
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface AnimationConfig {
  toValue?: number;
  duration?: number;
  easing?: (value: number) => number;
}

interface AnimatedGradientTransitionProps
  extends Omit<LinearGradientProps, 'colors'> {
  colors: string[];
  animation?: AnimationConfig;
}

interface AnimatedGradientTransitionState {
  colors: string[];
  prevColors: string[];
  animatedColors: Animated.Value[];
}

const defaultAnimation: Required<AnimationConfig> = {
  toValue: 1,
  duration: 500,
  easing: Easing.linear,
};

function arraysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function getColorSafely(colors: string[], index: number): string {
  return colors[index] ?? colors[colors.length - 1];
}

class AnimatedGradientTransition extends Component<
  AnimatedGradientTransitionProps,
  AnimatedGradientTransitionState
> {
  static defaultProps = {
    animation: defaultAnimation,
  };

  constructor(props: AnimatedGradientTransitionProps) {
    super(props);

    this.state = {
      colors: props.colors,
      prevColors: props.colors,
      animatedColors: props.colors.map(() => new Animated.Value(0)),
    };
  }

  static getDerivedStateFromProps(
    nextProps: AnimatedGradientTransitionProps,
    prevState: AnimatedGradientTransitionState,
  ): Partial<AnimatedGradientTransitionState> | null {
    const { colors: nextColors } = nextProps;
    let { animatedColors } = prevState;

    if (!arraysEqual(prevState.colors, nextColors)) {
      if (animatedColors.length !== nextColors.length) {
        animatedColors = nextColors.map(() => new Animated.Value(0));
      } else {
        animatedColors.forEach(v => v.setValue(0));
      }

      const anim = { ...defaultAnimation, ...nextProps.animation };
      Animated.parallel(
        animatedColors.map(animatedColor =>
          Animated.timing(animatedColor, {
            toValue: anim.toValue,
            duration: anim.duration,
            easing: anim.easing,
            useNativeDriver: false,
          }),
        ),
      ).start();

      return {
        colors: nextColors,
        prevColors: prevState.colors,
        animatedColors,
      };
    }

    return null;
  }

  render() {
    const { children, ...props } = this.props;
    const { colors, prevColors, animatedColors } = this.state;

    const animatedColorsProps = Object.fromEntries(
      animatedColors.map((animatedColor, index) => [
        `animatedColor${index}`,
        animatedColor.interpolate({
          inputRange: [0, 1],
          outputRange: [
            getColorSafely(prevColors, index),
            getColorSafely(colors, index),
          ],
        }),
      ]),
    );

    return (
      <AnimatedLinearGradient {...props} {...animatedColorsProps}>
        {children}
      </AnimatedLinearGradient>
    );
  }
}

export default AnimatedGradientTransition;
