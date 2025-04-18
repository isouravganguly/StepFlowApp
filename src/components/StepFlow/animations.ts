import { Dimensions } from 'react-native';
import {
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';
import { AnimationConfig } from './types';

const { width } = Dimensions.get('window');

export const springConfig: WithSpringConfig = {
  damping: 20,
  stiffness: 90,
  mass: 1,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};

export const slideInRight = (): AnimationConfig => {
  'worklet';
  return {
    initialValues: {
      transform: [{ translateX: width }],
    },
    animations: {
      transform: [{ translateX: withSpring(0, springConfig) }],
    },
  };
};

export const slideOutLeft = (): AnimationConfig => {
  'worklet';
  return {
    initialValues: {
      transform: [{ translateX: 0 }],
    },
    animations: {
      transform: [{ translateX: withSpring(-width, springConfig) }],
    },
  };
};