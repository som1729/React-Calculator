/**
 * Simple Calculator Component
 */

import React, { memo, useState, useCallback, useEffect } from 'react';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { CalculatorProps, CalculatorState } from '../types';
import { 
  calculate, 
  CalculatorError
} from '../utils';
import styles from './Calculator.module.css';

// Keyboard shortcuts mapping
const KEYBOARD_MAP: Record<string, string> = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  '+': '+', '-': '−', '*': '×', '/': '÷',
  'Enter': '=', '=': '=', '.': '.', 
  'c': 'AC', 'C': 'AC', 'Escape': 'AC', 'Backspace': 'AC'
};

export const Calculator = memo<CalculatorProps>(({ 
  className = '',
  'data-testid': testId,
}) => {
  const [state, setState] = useState<CalculatorState>({ total: null, next: null, operation: null });
  const [isError, setIsError] = useState(false);

  // Calculate display value and expression from state
  const displayValue = state.next || state.total || '0';
  const expression = state.operation && state.total 
    ? `${state.total} ${state.operation} ${state.next || ''}`
    : '';

  const handleInput = useCallback((button: string) => {
    try {
      // Validate input - allow specific calculator characters and button labels
      const allowedInputs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                            '+', '−', '×', '÷', '=', 'AC', '±', '%', '.'];
      
      if (!allowedInputs.includes(button)) {
        setIsError(true);
        setTimeout(() => setIsError(false), 2000);
        return;
      }

      // Calculate the result
      const result = calculate(state, button);
      setState(result);
    } catch (error) {
      // For CalculatorError, show the error message in the display
      if (error instanceof CalculatorError) {
        setState({
          total: error.message, // This will show "Error" in the display
          next: null,
          operation: null
        });
      } else {
        // For other errors, show generic error state
        setIsError(true);
        setTimeout(() => setIsError(false), 2000);
      }
    }
  }, [state]);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const mappedKey = KEYBOARD_MAP[event.key];
      if (mappedKey) {
        event.preventDefault();
        handleInput(mappedKey);
        // Remove focus from any active element when using device keyboard
        if (document.activeElement && document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleInput]);

  return (
    <main 
      className={`${styles.calculator} ${className}`.trim()}
      role="application"
      aria-label="Calculator"
      data-testid={testId || 'calculator'}
    >
      <h1 className={styles.srOnly}>Calculator Application</h1>
      
      <Display 
        value={displayValue}
        expression={expression}
        isError={isError}
        data-testid="calculator-display"
      />
      
      <Keypad 
        onButtonClick={handleInput}
        data-testid="calculator-keypad"
      />
      
      <a 
        href="#calculator-keypad" 
        className={styles.skipLink}
        aria-label="Skip to calculator buttons"
      >
        Skip to calculator buttons
      </a>
    </main>
  );
});

Calculator.displayName = 'Calculator';
