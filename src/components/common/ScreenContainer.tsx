import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  contentContainerStyle,
  ...rest
}) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.container, contentContainerStyle]} {...rest}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  container: {
    flex: 1,
  },
});

export default ScreenContainer;