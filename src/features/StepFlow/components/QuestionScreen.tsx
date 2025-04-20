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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
  },
  backButton: {
    padding: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 24,
  },
  navDisabledText: {
    color: '#555',
  },
  question: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 10,
    lineHeight: 40,
  },
  selectionType: {
    fontSize: 14,
    fontWeight: '400',
    color: '#AEAEB2',
    paddingHorizontal: 20,
    marginBottom: 20,
    textAlign: 'left',
  },
  optionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 130, // Ensure space for the absolute positioned button
  },
  separator: {
    height: 12,
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
});

export default React.memo(QuestionScreen);
