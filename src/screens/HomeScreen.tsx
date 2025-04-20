import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ScreenContainer from '../components/common/ScreenContainer';
import StyledButton from '../components/common/StyledButton';


type HomeScreenProps = {
  onStartTest: (testId: 'HAIR' | 'SKIN') => void;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartTest }) => {
  return (
    <ScreenContainer contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>
            Let's find the perfect routine for you. Choose a test to begin:
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <StyledButton
            title="The Hair Test"
            onPress={() => onStartTest('HAIR')}
          />

          <View style={styles.spacer} />

          <StyledButton
            title="The Skin Test"
            onPress={() => onStartTest('SKIN')}
          />
        </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#E5E5EA',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '85%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  spacer: {
    height: 15,
  },
});

export default HomeScreen;