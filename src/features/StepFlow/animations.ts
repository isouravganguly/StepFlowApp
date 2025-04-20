// Future-case : StepFlow Animations

import {withTiming} from 'react-native-reanimated';

export const questionTransition = (direction: 'left' | 'right') => {
  'worklet';
  const multiplier = direction === 'left' ? 1 : -1;
  
  return {
    entering: () => {
      'worklet';
      return {
        transform: [{
          translateX: withTiming(0, {
            duration: 300,
          }, () => {
            'worklet';
          }),
        }],
        opacity: withTiming(1, {duration: 300}),
      };
    },
    exiting: () => {
      'worklet';
      return {
        transform: [{
          translateX: withTiming(300 * multiplier, {
            duration: 300,
          }),
        }],
        opacity: withTiming(0, {duration: 300}),
      };
    },
  };
};