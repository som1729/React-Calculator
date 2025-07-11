/**
 * Calculator Keypad Component
 */

import React, { memo } from 'react';
import { Button } from './Button';
import { KeypadProps } from '../types';
import './Keypad.css';

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
  id: elementId,
}) => {
  return (
    <div 
      className="keypad"
      role="group"
      aria-label="Calculator keypad"
      id={elementId || 'calculator-keypad'}
    >
      <div 
        className="grid"
        role="grid"
        aria-label="Calculator buttons"
      >
        {BUTTON_LAYOUT.map((row, rowIndex) => 
          row.map((label, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              role="gridcell"
              className={label === '0' ? 'zeroButton' : undefined}
            >
              <Button 
                label={label} 
                onClick={onButtonClick}
                disabled={disabled}
                id={`keypad-button-${label}`}
              />
            </div>
          ))
        )}
      </div>
      
      <div className="srOnly">
        Use arrow keys to navigate between buttons, Enter or Space to activate
      </div>
    </div>
  );
});

Keypad.displayName = 'Keypad';
