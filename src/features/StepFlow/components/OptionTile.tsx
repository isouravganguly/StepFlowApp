// StepFlow use-case: This component is used to render the options in the QuestionScreen.
import React, {memo} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';

import {Option} from './types';

type OptionTileProps = {
  option: Option;
  isSelected: boolean;
  onSelect: () => void;
  customRender?: (option: Option, isSelected: boolean) => React.ReactNode;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const OptionTile: React.FC<OptionTileProps> = memo(
  ({option, isSelected, onSelect, customRender}) => {
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          scale: withSpring(isSelected ? 1.02 : 1, {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
    }));

    if (customRender) {
      return customRender(option, isSelected);
    }

    return (
      <AnimatedPressable
        style={[styles.container, isSelected && styles.selected, animatedStyle]}
        onPress={onSelect}>
        <Text style={[styles.label, isSelected && styles.selectedLabel]}>
          {option.label}
        </Text>
      </AnimatedPressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#2C2C2E',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: '#fff',
    backgroundColor: '#3C3C3E',
  },
  label: {
    fontSize: 16,
    color: '#fff',
  },
  selectedLabel: {
    color: '#fff',
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default memo(OptionTile);
