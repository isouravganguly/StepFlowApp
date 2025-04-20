import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface StyledButtonProps extends PressableProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  title,
  buttonStyle,
  textStyle,
  pressedStyle,
  style,
  disabled,
  ...rest
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        buttonStyle,
        disabled ? styles.buttonDisabled : styles.buttonEnabled,
        pressed && !disabled ? [styles.buttonPressed, pressedStyle] : null,
        style,
      ]}
      disabled={disabled}
      {...rest}>
      <Text style={[styles.text, textStyle, disabled && styles.textDisabled]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    width: '100%',
  },
  buttonEnabled: {
    backgroundColor: '#FFFFFF',
  },
  buttonDisabled: {
    backgroundColor: '#555',
  },
  buttonPressed: {
    backgroundColor: '#E5E5EA',
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
  },
  textDisabled: {
    color: '#AAA',
  },
});

export default StyledButton;
