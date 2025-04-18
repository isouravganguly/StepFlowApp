import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import 'react-native-reanimated';
import StepFlow from './src/components/StepFlow/StepFlow';
import {Step} from './src/components/StepFlow/types';

const sampleSteps: Step[] = [
  {
    id: 'experience',
    question: 'How many years of coding experience do you have?',
    type: 'single' as const,
    options: [
      {id: 'junior', label: '0-2 years'},
      {id: 'mid', label: '2-5 years'},
      {id: 'senior', label: '5+ years'},
    ],
  },
  {
    id: 'frameworks',
    question: 'Which frameworks do you use regularly?',
    type: 'multi' as const,
    options: [
      {id: 'react', label: 'React'},
      {id: 'vue', label: 'Vue'},
      {id: 'angular', label: 'Angular'},
      {id: 'svelte', label: 'Svelte'},
    ],
  },
  {
    id: 'preferred_stack',
    question: 'Whats your preferred mobile stack?',
    type: 'single' as const,
    options: [
      {id: 'rn', label: 'React Native'},
      {id: 'flutter', label: 'Flutter'},
      {id: 'native', label: 'Native (iOS/Android)'},
    ],
  },
];

function App(): React.JSX.Element {
  const handleComplete = (results: Record<string, string[]>) => {
    console.log('Survey completed!', results);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StepFlow steps={sampleSteps} onComplete={handleComplete} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
