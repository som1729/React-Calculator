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
          return { ...state, next: String(-value) };
        }
        if (total) {
          return { ...state, total: String(-parseFloat(total)) };
        }
        return state;

      case '%':
        if (next) {
          const value = parseFloat(next) / 100;
          return { ...state, next: String(value) };
        }
        if (total) {
          const value = parseFloat(total) / 100;
          return { ...state, total: String(value) };
        }
        return state;

      case '=':
        if (total && operation && next) {
          const result = operations[operation](parseFloat(total), parseFloat(next));
          
          return {
            total: String(result),
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
          
          return {
            total: String(result),
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
