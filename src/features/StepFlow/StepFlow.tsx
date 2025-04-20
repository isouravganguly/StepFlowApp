import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useStepFlow} from './hooks/useStepFlow';
import {StepFlowProps} from './types';
import ProgressBar from './components/ProgressBar';
import QuestionScreen from './components/QuestionScreen';

export const StepFlow: React.FC<StepFlowProps> = ({
  steps,
  onComplete,
  onError,
  onBackFromFirst,
}) => {
  const {
    currentStep,
    progress,
    answers,
    handleOptionSelect,
    handleBack,
    handleNext,
  } = useStepFlow(steps, onComplete, onError, onBackFromFirst);

  if (!currentStep) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ProgressBar progress={progress} />
      <View style={styles.questionContainer}>
        <QuestionScreen
          step={currentStep}
          selectedOptions={answers[currentStep.id] || []}
          onOptionSelect={handleOptionSelect}
          onBack={handleBack}
          onNext={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  questionContainer: {
    flex: 1,
  },
});

export default StepFlow;
