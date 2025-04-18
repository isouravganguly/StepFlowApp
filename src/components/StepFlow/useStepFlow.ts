import {useEffect, useState, useCallback, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Step, StepFlowError, StepFlowResult} from './types';

const STORAGE_KEY = '@stepflow_answers';

export const useStepFlow = (
  steps: Step[],
  onComplete: (result: StepFlowResult) => void,
  onError?: (error: StepFlowError) => void,
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const saveTimeout = useRef<NodeJS.Timeout>(null);

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

  const debouncedSave = useCallback(
    (newAnswers: StepFlowResult) => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
      saveTimeout.current = setTimeout(async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
        } catch (error) {
          onError?.({
            code: 'STORAGE_ERROR',
            message: 'Failed to save answers',
            details: error,
          });
        }
      }, 1000);
    },
    [onError],
  );

  const handleOptionSelect = useCallback(
    async (optionId: string) => {
      setAnswers(currentAnswers => {
        const newAnswers = {...currentAnswers};
        const currentStep = steps[currentStepIndex];

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

  const handleNext = useCallback(async () => {
    const currentStep = steps[currentStepIndex];
    const currentAnswers = answers[currentStep.id] || [];

    if (!validateAnswer(currentStep, currentAnswers)) {
      onError?.({
        code: 'VALIDATION_ERROR',
        message: 'Please complete the question according to the requirements',
      });
      return;
    }

    setDirection('left');
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
        onComplete(answers);
      } catch (error) {
        onError?.({
          code: 'STORAGE_ERROR',
          message: 'Failed to save answers',
          details: error,
        });
      }
    }
  }, [currentStepIndex, steps, answers, onComplete, onError]);

  const handleBack = useCallback(() => {
    setDirection('right');
    setCurrentStepIndex(prev => Math.max(0, prev - 1));
  }, []);

  const canGoBack = currentStepIndex > 0;
  const canGoNext = answers[steps[currentStepIndex]?.id]?.length > 0;

  const progress = (currentStepIndex + 1) / steps.length;

  return {
    currentStep: steps[currentStepIndex],
    progress,
    answers,
    handleOptionSelect,
    handleBack,
    handleNext,
    canGoBack,
    canGoNext,
    direction,
  };
};
