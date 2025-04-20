import React, {useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {Step, Option} from '../types';
import OptionTile from './OptionTile';
import StyledButton from '../../../components/common/StyledButton';

type QuestionScreenProps = {
  step: Step;
  selectedOptions: string[];
  onOptionSelect: (optionId: string) => void;
  onBack?: () => void;
  onNext?: () => void;
  isBackDisabled?: boolean;
  isNextDisabled?: boolean;
};

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  step,
  selectedOptions,
  onOptionSelect,
  onBack,
  onNext,
  isBackDisabled,
  isNextDisabled,
}) => {
  const renderItem = useCallback(
    ({item}: {item: Option}) => {
      const isSelected = selectedOptions.includes(item.id);
      const handlePress = () => onOptionSelect(item.id);

      return (
        <OptionTile
          key={item.id}
          option={item}
          isSelected={isSelected}
          onSelect={handlePress}
        />
      );
    },
    [selectedOptions, onOptionSelect],
  );

  // Determine the helper text based on step type
  const selectionTypeText =
    step.type === 'multi' ? '(Select all that apply)' : '(Select one)';

  return (
    // Note: ScreenContainer is likely handled by StepFlow.tsx, so we don't add it here.
    // If QuestionScreen were used standalone, it would need ScreenContainer.
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={onBack}
          disabled={isBackDisabled}
          style={styles.backButton}>
          <Text
            style={[styles.backText, isBackDisabled && styles.navDisabledText]}>
            ←
          </Text>
        </Pressable>
      </View>

      <Text style={styles.question}>{step.question}</Text>
      <Text style={styles.selectionType}>{selectionTypeText}</Text>

      <FlatList
        data={step.options}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.optionsContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.nextButtonContainer}>
        <StyledButton
          title="NEXT"
          onPress={onNext}
          disabled={isNextDisabled || !selectedOptions.length}
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
  // Style for header containing back button
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    height: 50,
  },
  // Style for the back button itself
  backButton: {
    padding: 10,
  },
  // Style for the back arrow text
  backText: {
    color: '#fff',
    fontSize: 24,
  },
  // Style for disabled Back arrow
  navDisabledText: {
    color: '#555',
  },
  question: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
    paddingHorizontal: 20,
    // Adjust marginBottom if needed
    marginBottom: 10, // Reduced margin to make space for the new text
    lineHeight: 40,
  },
  // Style for the new selection type indicator
  selectionType: {
    fontSize: 14,
    fontWeight: '400',
    color: '#AEAEB2', // A slightly muted gray color
    paddingHorizontal: 20,
    marginBottom: 20, // Space before the options list
    textAlign: 'left', // Align to the left like the question
  },
  optionsContainer: {
    paddingHorizontal: 20,
    // Keep or adjust paddingBottom as needed (e.g., 130 from previous fix)
    paddingBottom: 130, // Ensure space for the absolute positioned button
  },
  separator: {
    height: 12,
  },
  // Style for the button's positioning container
  nextButtonContainer: {
    position: 'absolute',
    bottom: 30, // Adjust vertical position as needed
    left: 20, // Add padding from the left edge
    right: 20, // Add padding from the right edge
    // Removed width: '100%', justifyContent, alignItems as StyledButton handles centering text
    // and the container now uses left/right for width control.
  },
  // Remove the nextButton style rule entirely
  // nextButton: {
  //   width: '90%', // Removed
  //   flex: 1,      // Removed
  // },
});

export default React.memo(QuestionScreen);
