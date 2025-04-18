import {withTiming, withSpring, withSequence} from 'react-native-reanimated';

export const slideTransition = (direction: 'left' | 'right') => {
  'worklet';
  const multiplier = direction === 'left' ? -1 : 1;
  return {
    entering: (targetValues: any) => {
      'worklet';
      return {
        transform: [{
          translateX: withSpring(0, {
            damping: 20,
            stiffness: 90,
            from: 400 * multiplier,
          }),
        }],
        opacity: withTiming(1, {duration: 300}),
      };
    },
    exiting: (targetValues: any) => {
      'worklet';
      return {
        transform: [{
          translateX: withSpring(-400 * multiplier, {
            damping: 20,
            stiffness: 90,
          }),
        }],
        opacity: withTiming(0, {duration: 300}),
      };
    },
  };
};