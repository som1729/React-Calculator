/**
 * Button Helper Utilities
 */

import { ButtonType } from '../types';

/**
 * Get the button type based on its label
 */
export function getButtonType(label: string): ButtonType {
  if (/^[0-9.]$/.test(label)) {
    return 'number';
  }
  
  if (/^[+−×÷]$/.test(label)) {
    return 'operator';
  }
  
  if (label === '=') {
    return 'equals';
  }
  
  if (label === 'AC') {
    return 'clear';
  }
  
  return 'function'; // For ±, %
}

/**
 * Get tooltip text for button
 */
export function getButtonTooltip(label: string): string {
  const tooltips: Record<string, string> = {
    '×': 'Multiply',
    '÷': 'Divide',
    '−': 'Subtract',
    '+': 'Add',
    '=': 'Calculate result',
    'AC': 'Clear all',
    '±': 'Toggle positive/negative',
    '%': 'Convert to percentage',
    '.': 'Decimal point',
    '0': 'Zero',
    '1': 'One',
    '2': 'Two',
    '3': 'Three',
    '4': 'Four',
    '5': 'Five',
    '6': 'Six',
    '7': 'Seven',
    '8': 'Eight',
    '9': 'Nine',
  };
  
  return tooltips[label] || label;
}
