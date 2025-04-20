import {useState, useCallback} from 'react';
import {Step, StepFlowError, StepFlowResult} from '../types';

export const useStepFlow = (
  steps: Step[],
  onComplete: (result: StepFlowResult) => void,
  onError?: (error: StepFlowError) => void,
  onBackFromFirst?: () => void,
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const validateAnswer = (step: Step, selectedOptions: string[]) => {
    const validation = step.validation || {};
    if (validation.required && selectedOptions.length === 0) {
      return false;
    }
    if (
      validation.minSelections &&
      selectedOptions.length < validation.minSelections
    ) {
      return false;
    }
    if (
      validation.maxSelections &&
      selectedOptions.length > validation.maxSelections
    ) {
      return false;
    }
    return true;
  };

  const handleOptionSelect = useCallback(
    (optionId: string) => {
      setAnswers(currentAnswers => {
        const newAnswers = {...currentAnswers};
        const currentStep = steps[currentStepIndex];

        if (!currentStep) return currentAnswers;

        if (currentStep.type === 'single') {
          newAnswers[currentStep.id] = [optionId];
        } else {
          const current = newAnswers[currentStep.id] || [];
          newAnswers[currentStep.id] = current.includes(optionId)
            ? current.filter(id => id !== optionId)
            : [...current, optionId];
        }
        return newAnswers;
      });
    },
    [currentStepIndex, steps],
  );

  const handleNext = useCallback(() => {
    const currentStep = steps[currentStepIndex];
    if (!currentStep) return;

    const currentStepAnswers = answers[currentStep.id] || [];

    if (!validateAnswer(currentStep, currentStepAnswers)) {
      onError?.({
        code: 'VALIDATION_ERROR',
        message: 'Please complete the question according to the requirements',
      });
      return;
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  }, [currentStepIndex, steps, answers, onComplete, onError]);

  const handleBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else if (onBackFromFirst) {
      onBackFromFirst();
    }
  }, [currentStepIndex, onBackFromFirst]);

  const currentStep = steps[currentStepIndex];
  const progress = steps.length > 0 ? (currentStepIndex + 1) / steps.length : 0;
  const canGoBack = currentStepIndex > 0;
  const canGoNext = validateAnswer(currentStep, answers[currentStep?.id] || []);

  return {
    currentStep,
    progress,
    answers,
    handleOptionSelect,
    handleBack,
    handleNext,
    canGoBack,
    canGoNext,
  };
};
