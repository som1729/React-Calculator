/**
 * Calculator Keypad Component
 */

import React, { memo } from 'react';
import { Button } from './Button';
import { KeypadProps } from '../types';
import styles from './Keypad.module.css';

// Button layout for the calculator keypad
const BUTTON_LAYOUT = [
  ['AC', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
] as const;

export const Keypad = memo<KeypadProps>(({ 
  onButtonClick, 
  disabled = false,
  'data-testid': testId,
}) => {
  return (
    <div 
      className={styles.keypad}
      role="group"
      aria-label="Calculator keypad"
      data-testid={testId || 'calculator-keypad'}
    >
      <div 
        className={styles.grid}
        role="grid"
        aria-label="Calculator buttons"
      >
        {BUTTON_LAYOUT.map((row, rowIndex) => 
          row.map((label, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              role="gridcell"
              className={label === '0' ? styles.zeroButton : undefined}
            >
              <Button 
                label={label} 
                onClick={onButtonClick}
                disabled={disabled}
                data-testid={`keypad-button-${label}`}
              />
            </div>
          ))
        )}
      </div>
      
      <div className={styles.srOnly}>
        Use arrow keys to navigate between buttons, Enter or Space to activate
      </div>
    </div>
  );
});

Keypad.displayName = 'Keypad';
