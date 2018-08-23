import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    Animated,
    Easing,
} from 'react-native';
import _ from 'lodash';

import NativeLinearGradient from 'react-native-linear-gradient';

class LinearGradient extends Component {

    static propTypes = {
        ...NativeLinearGradient.propTypes,
    };

    // Generate back the colors array with all transformed props
    _generateColorsArray(props) {
        const propsKeys = Object.keys(props);
        const colorsArray = [];

        propsKeys.forEach((key) => {
            if (key.indexOf('animatedColor') !== -1
                && props[key]
                && typeof props[key] === 'string') {
                colorsArray.push(props[key]);
            }
        });

        return colorsArray;
    }

    render() {
        const {
            children,
            ...props
        } = this.props;
        const colorsArray = this._generateColorsArray(props);
        const nativeLinearProps = _.omit(props, Object.keys(colorsArray));

        return (
            <NativeLinearGradient
                { ...nativeLinearProps }
                colors={ colorsArray }
            >
                { children }
            </NativeLinearGradient>
        );
    }

}

Animated.LinearGradient = Animated.createAnimatedComponent(LinearGradient);

class AnimatedGradientTransition extends Component {

    static propTypes = {
        ...NativeLinearGradient.propTypes,
        animation: PropTypes.shape({
            toValue: PropTypes.number,
            duration: PropTypes.number,
            easing: PropTypes.func,
        }),
    };

    static defaultProps = {
        animation: {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
        },
    }

    constructor(props) {
        super(props);

        this.state = {
            colors: props.colors,
            prevColors: props.colors,
            animatedColors: props.colors.map(() => new Animated.Value(0)),
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const keys = [
            'colors',
        ];
        const mutableProps = _.pick(nextProps, keys);
        const stateToCompare = _.pick(prevState, keys);
        let animatedColors = prevState.animatedColors;

        animatedColors = AnimatedGradientTransition.animateGradientTransition(
            animatedColors,
            mutableProps.colors,
            prevState.colors,
            nextProps.animation,
        );

        if (!_.isEqual(mutableProps, stateToCompare)) {
            return {
                ...mutableProps,
                animatedColors,
                prevColors: prevState.colors,
            };
        }

        return null;
    }

    static animateGradientTransition(animatedColors, curColors, prevColors, animation) {
        // Animate only if the new colors are different
        if (!_.isEqual(prevColors, curColors)) {

            // Update number of animatedValue if the length is different
            if (animatedColors.length !== curColors.length) {
                animatedColors = curColors.map(() => new Animated.Value(0));
            } else {
                animatedColors.forEach((animatedColor) => animatedColor.setValue(0));
            }

            // Parallel animation of all background colors
            Animated.parallel(
                animatedColors.map((animatedColor) => {
                    return Animated.timing(
                        animatedColor,
                        {
                            toValue: animation.toValue,
                            duration: animation.duration,
                            easing: animation.easing,
                        }
                    );
                })
            ).start();
        }

        return animatedColors;
    }

    _getColorSafely(colors, index) {
        if (colors[index]) {
            return colors[index];
        }

        return colors.slice(-1)[0];
    }

    _getInterpolatedColors() {
        const {
            colors,
            prevColors,
            animatedColors,
        } = this.state;

        return animatedColors.map((animatedColor, index) => {
            return animatedColor.interpolate({
                inputRange: [0, 1],
                outputRange: [
                    this._getColorSafely(prevColors, index),
                    this._getColorSafely(colors, index),
                ],
            });
        });
    }

    // Send all colors as props to enable Animated api to transform it
    _generateColorsProps(interpolatedColors) {
        let props = {};

        interpolatedColors.forEach((interpolateColor, index) => {
            const key = `animatedColor${index}`;

            props = _.merge(
                props,
                {
                    [key]: interpolateColor,
                }
            );

            return {
                [key]: interpolateColor,
            };
        });

        return props;
    }

    render() {
        const {
            children,
            ...props
        } = this.props;
        const interpolatedColors = this._getInterpolatedColors();
        const animatedColorsProps = this._generateColorsProps(interpolatedColors);

        return (
            <Animated.LinearGradient
                { ...props }
                { ...animatedColorsProps }
            >
                { children }
            </Animated.LinearGradient>
        );
    }

}

export default AnimatedGradientTransition;
