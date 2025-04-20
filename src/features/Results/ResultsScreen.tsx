import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {StepFlowResult, Step} from '../StepFlow/types';
import ScreenContainer from '../../components/common/ScreenContainer';
import StyledButton from '../../components/common/StyledButton';

type ResultsScreenProps = {
  answers: StepFlowResult;
  steps: Step[];
  onRestart: () => void;
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  answers,
  steps,
  onRestart,
}) => {
  // Helper to find the question text for a given step ID
  const getQuestionText = (stepId: string): string => {
    return (
      steps.find(step => step.id === stepId)?.question || 'Unknown Question'
    );
  };

  // Helper to find the option label for a given option ID within a step
  const getOptionLabel = (stepId: string, optionId: string): string => {
    const step = steps.find(s => s.id === stepId);
    return step?.options.find(opt => opt.id === optionId)?.label || optionId;
  };

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Test Results</Text>

        {Object.entries(answers).map(([stepId, selectedOptionIds]) => (
          <View key={stepId} style={styles.resultItem}>
            <Text style={styles.question}>{getQuestionText(stepId)}</Text>
            {selectedOptionIds.map(optionId => (
              <Text key={optionId} style={styles.answer}>
                - {getOptionLabel(stepId, optionId)}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.restartButtonContainer}>
        <StyledButton
          title="Start Over"
          onPress={onRestart}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 100, // Ensure space for the absolute button
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  resultItem: {
    marginBottom: 25,
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 15,
  },
  question: {
    fontSize: 18,
    fontWeight: '500',
    color: '#E5E5EA',
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
    lineHeight: 22,
  },
  restartButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
});

export default ResultsScreen;
