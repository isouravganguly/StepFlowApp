import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  //   withSpring,
} from 'react-native-reanimated';

type ProgressBarProps = {
  progress: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({progress}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress * 100}%`,
  }));

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[styles.progress, animatedStyle]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
  progress: {
    height: '100%',
    backgroundColor: '#2196F3',
  },
});

export default ProgressBar;
