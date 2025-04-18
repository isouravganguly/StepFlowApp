import React from 'react';
import {StyleSheet} from 'react-native';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

type SwipeContainerProps = {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  enabled?: boolean;
};

const SwipeContainer: React.FC<SwipeContainerProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  enabled = true,
}) => {
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .enabled(enabled)
    .onUpdate(e => {
      translateX.value = e.translationX;
    })
    .onEnd(e => {
      if (Math.abs(e.translationX) > 100) {
        if (e.translationX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (e.translationX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.content, animatedStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default SwipeContainer;