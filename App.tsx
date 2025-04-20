import React, {useState} from 'react';
import {StyleSheet, ActivityIndicator, Text} from 'react-native';
import StepFlow from './src/features/StepFlow/StepFlow';
import ResultsScreen from './src/features/Results/ResultsScreen';
import {stepFlowService} from './src/services/stepFlowService';
import {Step, StepFlowResult} from './src/features/StepFlow/types';

import HomeScreen from './src/screens/HomeScreen';
import ScreenContainer from './src/components/common/ScreenContainer';
import StyledButton from './src/components/common/StyledButton';

// TODO: Implement authentication and retrieve actual user ID

// Type for the cache
type TestConfigCache = {
  [key: string]: Step[];
};

const App = () => {
  const [testConfig, setTestConfig] = useState<Step[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finalAnswers, setFinalAnswers] = useState<StepFlowResult | null>(null);
  const [resultsSteps, setResultsSteps] = useState<Step[] | null>(null);
  // Add state for caching configurations
  const [cachedConfigs, setCachedConfigs] = useState<TestConfigCache>({});

  const fetchAndStartTest = async (testId: 'HAIR' | 'SKIN') => {
    setError(null);
    setFinalAnswers(null);
    setTestConfig(null);
    setResultsSteps(null);

    // Check cache first
    if (cachedConfigs[testId]) {
      console.log(`Using cached config for ${testId}`);
      setTestConfig(cachedConfigs[testId]);
      return; // Exit early if cached
    }

    // If not cached, proceed to fetch
    console.log(`Fetching config for ${testId} from Firebase...`);
    setIsLoading(true);
    try {
      const config = await stepFlowService.getTestConfiguration(testId);
      if (config) {
        setTestConfig(config);
        // Store in cache
        setCachedConfigs(prevCache => ({
          ...prevCache,
          [testId]: config,
        }));
      } else {
        setError(`Could not load configuration for ${testId} test.`);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unknown error occurred fetching config.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Use this revised handler
  const handleCompleteRevised = async (result: StepFlowResult) => {
    console.log('StepFlow completed:', result);
    setFinalAnswers(result); // Store answers to show results screen
    setResultsSteps(testConfig); // Store the steps used for the results screen
    setTestConfig(null); // Clear the active test config

    // TODO: Get the actual authenticated user ID here
    const currentUserId = null; // Replace null with actual user ID retrieval logic

    if (currentUserId) {
      setIsLoading(true); // Show loading while saving
      try {
        // Pass the actual userId to the service
        await stepFlowService.saveAnswers(currentUserId, result);
      } catch (saveError) {
        console.error('Failed to save results:', saveError);
        // Show error, but still proceed to show results
        // Consider more specific error feedback based on saveError type
        setError(
          saveError instanceof Error
            ? saveError.message
            : 'Failed to save results, but here they are.',
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn('No user ID available, skipping save.');
      // Optionally set an error or notification if saving is critical
      // setError("Could not save results: User not identified.");
    }
  };

  const handleRestart = () => {
    setTestConfig(null);
    setFinalAnswers(null);
    setError(null);
    setResultsSteps(null);
  };

  // Define the handler for when back is pressed on the first step
  const handleBackToHome = () => {
    console.log('Navigating back to home from first step.');
    handleRestart(); // Reset state to show the home screen
  };

  const renderContent = () => {
    if (isLoading) {
      // Use ScreenContainer for consistent background/status bar
      return (
        <ScreenContainer contentContainerStyle={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </ScreenContainer>
      );
    }

    if (error && !isLoading) {
      // Use ScreenContainer for consistent background/status bar
      return (
        <ScreenContainer contentContainerStyle={styles.centeredContainer}>
          {/* Provide more context if possible, e.g., "Configuration Error:" */}
          <Text style={styles.errorText}>{error}</Text>
          {/* Use StyledButton */}
          <StyledButton
            title="Try Again"
            onPress={handleRestart}
            style={styles.retryButtonContainer} // Add container style if needed for spacing
          />
        </ScreenContainer>
      );
    }

    if (finalAnswers) {
      // ResultsScreen now includes ScreenContainer
      if (!resultsSteps) {
        // Error state within results - use ScreenContainer
        return (
          <ScreenContainer contentContainerStyle={styles.centeredContainer}>
            <Text style={styles.errorText}>
              Error displaying results. Steps missing.
            </Text>
            {/* Optionally add a back/restart button here too */}
          </ScreenContainer>
        );
      }
      return (
        <ResultsScreen
          answers={finalAnswers}
          steps={resultsSteps}
          onRestart={handleRestart}
        />
      );
    }

    if (testConfig) {
      return (
        <StepFlow
          steps={testConfig}
          onComplete={handleCompleteRevised}
          onError={err => setError(err.message)}
          onBackFromFirst={handleBackToHome}
        />
      );
    }

    return <HomeScreen onStartTest={fetchAndStartTest} />;
  };

  return renderContent();
};

const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF453A',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  retryButtonContainer: {
    width: '80%',
    marginTop: 10,
  },
});

export default App;
