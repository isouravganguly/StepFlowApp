export type Option = {
  id: string;
  label: string;
};

export type ValidationRule = {
  minSelections?: number;
  maxSelections?: number;
  required?: boolean;
};

export type Step = {
  id: string;
  question: string;
  type: 'single' | 'multi';
  options: Option[];
  validation?: ValidationRule;
};

export type StepFlowResult = Record<string, string[]>;

export type StepFlowError = {
  code: 'STORAGE_ERROR' | 'VALIDATION_ERROR' | 'NAVIGATION_ERROR'; // Keep relevant codes
  message: string;
  details?: unknown;
};

export type StepFlowProps = {
  steps: Step[];
  onComplete: (result: StepFlowResult) => void;
  onError?: (error: StepFlowError) => void;
  onBackFromFirst?: () => void;
  // Remove unused render props
  // renderHeader?: (progress: number) => React.ReactNode;
  // renderTile?: (option: Option, isSelected: boolean) => React.ReactNode;
  // renderError?: (error: StepFlowError) => React.ReactNode;
};
