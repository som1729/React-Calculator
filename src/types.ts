/**
 * Calculator Types
 */

// Core types
export type ButtonType = 'number' | 'operator' | 'clear' | 'equals' | 'function';

// Calculator state (simplified)
export interface CalculatorState {
  total: string | null;
  next: string | null;
  operation: string | null;
}

// Component props
export interface ButtonProps {
  readonly label: string;
  readonly onClick: (label: string) => void;
  readonly type?: ButtonType;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly 'aria-label'?: string;
  readonly 'data-testid'?: string;
}

export interface DisplayProps {
  readonly value: string;
  readonly expression?: string;
  readonly isError?: boolean;
  readonly 'data-testid'?: string;
}

export interface KeypadProps {
  readonly onButtonClick: (label: string) => void;
  readonly disabled?: boolean;
  readonly 'data-testid'?: string;
}

export interface CalculatorProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
}
