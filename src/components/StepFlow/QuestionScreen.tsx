import React, {useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Step, Option} from './types';
import OptionTile from './OptionTile';

type QuestionScreenProps = {
  step: Step;
  selectedOptions: string[];
  onOptionSelect: (optionId: string) => void;
  onBack?: () => void;
  onNext?: () => void;
  renderTile?: (option: Option, isSelected: boolean) => React.ReactNode;
  isProcessing?: boolean;
};

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  step,
  selectedOptions,
  onOptionSelect,
  onBack,
  onNext,
  renderTile,
  isProcessing,
}) => {
  const renderItem = useCallback(
    ({item}: {item: Option}) => (
      <OptionTile
        key={item.id}
        option={item}
        isSelected={selectedOptions.includes(item.id)}
        onSelect={() => onOptionSelect(item.id)}
        customRender={renderTile}
        isProcessing={isProcessing}
      />
    ),
    [selectedOptions, onOptionSelect, renderTile, isProcessing],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
      </View>

      <Animated.Text entering={FadeIn.duration(400)} style={styles.question}>
        {step.question}
      </Animated.Text>

      <FlatList
        data={step.options}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.optionsContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />

      <Pressable
        style={[
          styles.nextButton,
          (!selectedOptions.length || isProcessing) && styles.nextButtonDisabled,
        ]}
        onPress={onNext}
        disabled={!selectedOptions.length || isProcessing}>
        <Text style={styles.nextButtonText}>NEXT</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: '#fff',
    fontSize: 24,
  },
  question: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 30,
    lineHeight: 40,
  },
  optionsContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  separator: {
    height: 12,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default React.memo(QuestionScreen);
