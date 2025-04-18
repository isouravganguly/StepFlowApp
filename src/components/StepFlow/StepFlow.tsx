import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {StepFlowProps} from './types';
import {useStepFlow} from './useStepFlow';
import ProgressBar from './ProgressBar';
import QuestionScreen from './QuestionScreen';

export const StepFlow: React.FC<StepFlowProps> = ({
  steps,
  onComplete,
  onError,
  renderHeader,
  renderTile,
}) => {
  const {
    currentStep,
    progress,
    answers,
    handleOptionSelect,
    handleBack,
    handleNext,
    canGoBack,
    canGoNext,
  } = useStepFlow(steps, onComplete, onError);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderHeader ? (
        renderHeader(progress)
      ) : (
        <ProgressBar progress={progress} />
      )}
      <QuestionScreen
        step={currentStep}
        selectedOptions={answers[currentStep.id] || []}
        onOptionSelect={handleOptionSelect}
        onBack={canGoBack ? handleBack : undefined}
        onNext={canGoNext ? handleNext : undefined}
        renderTile={renderTile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
});

export default StepFlow;
