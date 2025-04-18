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
  code: 'STORAGE_ERROR' | 'VALIDATION_ERROR' | 'NAVIGATION_ERROR';
  message: string;
  details?: unknown;
};

export type StepFlowProps = {
  steps: Step[];
  onComplete: (result: StepFlowResult) => void;
  onError?: (error: StepFlowError) => void;
  renderHeader?: (progress: number) => React.ReactNode;
  renderTile?: (option: Option, isSelected: boolean) => React.ReactNode;
  renderError?: (error: StepFlowError) => React.ReactNode;
};

export type AnimationConfig = {
  initialValues: {
    transform: Array<{ [key: string]: number }>;
  };
  animations: {
    transform: Array<{ [key: string]: unknown }>;
  };
};

export type StepFlowState = {
  currentStepIndex: number;
  answers: Record<string, string[]>;
};