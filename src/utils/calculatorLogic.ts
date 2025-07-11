/**
 * Calculator Logic
 */

import { CalculatorState } from '../types';

/**
 * Calculator error class
 */
export class CalculatorError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'CalculatorError';
  }
}

/**
 * Constants for overflow/underflow handling
 */
const MAX_SAFE_VALUE = 999999999999; // 12 digits max
const MIN_SAFE_VALUE = -999999999999;
const MAX_DECIMAL_PLACES = 8;
const MAX_DISPLAY_LENGTH = 12;

/**
 * Format result with proper overflow/underflow handling
 */
function formatResult(value: number): string {
  // Handle special cases
  if (!isFinite(value)) {
    throw new CalculatorError('Error', 'OVERFLOW');
  }
  
  if (value === 0) {
    return '0';
  }
  
  // Check for overflow
  if (value > MAX_SAFE_VALUE || value < MIN_SAFE_VALUE) {
    throw new CalculatorError('Error', 'OVERFLOW');
  }
  
  // Handle very small numbers (underflow to zero)
  if (Math.abs(value) < 1e-8) {
    return '0';
  }
  
  // Convert to string and handle precision
  let result = value.toString();
  
  // Handle scientific notation
  if (result.includes('e')) {
    throw new CalculatorError('Error', 'OVERFLOW');
  }
  
  // Round to reasonable decimal places for display
  if (result.includes('.')) {
    const parts = result.split('.');
    if (parts[1].length > MAX_DECIMAL_PLACES) {
      const rounded = parseFloat(value.toFixed(MAX_DECIMAL_PLACES));
      result = rounded.toString();
    }
  }
  
  // Check final display length
  if (result.length > MAX_DISPLAY_LENGTH) {
    throw new CalculatorError('Error', 'OVERFLOW');
  }
  
  return result;
}

/**
 * Main calculator function - handles all button inputs
 */
export function calculate(state: CalculatorState, buttonName: string): CalculatorState {
  const { total, next, operation } = state;

  // Helper functions
  const isNumber = (item: string) => /[0-9.]/.test(item);
  
  const operations: Record<string, (a: number, b: number) => number> = {
    '+': (a, b) => a + b,
    '−': (a, b) => a - b,
    '×': (a, b) => a * b,
    '÷': (a, b) => {
      if (b === 0) {
        throw new CalculatorError('Error', 'DIVISION_BY_ZERO');
      }
      return a / b;
    },
  };

  try {
    switch (buttonName) {
      case 'AC':
        return { total: null, next: null, operation: null };

      case '±':
        if (next) {
          const value = parseFloat(next);
          const result = -value;
          return { ...state, next: formatResult(result) };
        }
        if (total) {
          const value = parseFloat(total);
          const result = -value;
          return { ...state, total: formatResult(result) };
        }
        return state;

      case '%':
        if (next) {
          const value = parseFloat(next) / 100;
          return { ...state, next: formatResult(value) };
        }
        if (total) {
          const value = parseFloat(total) / 100;
          return { ...state, total: formatResult(value) };
        }
        return state;

      case '=':
        if (total && operation && next) {
          const result = operations[operation](parseFloat(total), parseFloat(next));
          const formattedResult = formatResult(result);
          
          return {
            total: formattedResult,
            next: null,
            operation: null,
          };
        }
        return state;

      case '+':
      case '−':
      case '×':
      case '÷':
        if (total && operation && next) {
          const result = operations[operation](parseFloat(total), parseFloat(next));
          const formattedResult = formatResult(result);
          
          return {
            total: formattedResult,
            next: null,
            operation: buttonName,
          };
        }

        if (!operation) {
          return {
            total: next || total,
            next: null,
            operation: buttonName,
          };
        }

        return { ...state, operation: buttonName };

      default:
        if (isNumber(buttonName)) {
          if (buttonName === '.' && next && next.includes('.')) {
            return state;
          }
          
          if (buttonName === '.' && !next) {
            return { ...state, next: '0.' };
          }

          if (operation) {
            if (next) {
              return { ...state, next: next === '0' ? buttonName : next + buttonName };
            }
            return { ...state, next: buttonName };
          }

          if (next) {
            const newNext = next === '0' ? buttonName : next + buttonName;
            return { ...state, next: newNext, total: null };
          }

          return { ...state, next: buttonName, total: null };
        }

        return state;
    }
  } catch (error) {
    if (error instanceof CalculatorError) {
      throw error;
    }
    throw new CalculatorError('Calculation error', 'CALCULATION_ERROR');
  }
}
