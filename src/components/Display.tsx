/**
 * Calculator Display Component
 */

import React, { memo, forwardRef } from 'react';
import { DisplayProps } from '../types';
import styles from './Display.module.css';

export const Display = memo(forwardRef<HTMLDivElement, DisplayProps>(({ 
  value, 
  expression, 
  isError = false,
  'data-testid': testId,
}, ref) => {
  const displayValue = value || '0';

  return (
    <div 
      ref={ref}
      className={`${styles.display} ${isError ? styles.error : ''}`}
      data-testid={testId || 'calculator-display'}
      role="textbox"
      aria-readonly="true"
      aria-label={`Calculator display showing ${displayValue}`}
      aria-live="polite"
      aria-atomic="true"
      title={`Current value: ${displayValue}${expression ? ` | Expression: ${expression}` : ''}`}
      tabIndex={0}
    >
      {expression && (
        <div 
          className={styles.expression}
          data-testid="calculator-expression"
          aria-label={`Expression: ${expression}`}
          title={`Current expression: ${expression}`}
        >
          {expression}
        </div>
      )}
      <div 
        className={styles.value}
        data-testid="calculator-value"
        title={displayValue}
      >
        {displayValue}
      </div>
    </div>
  );
}));

Display.displayName = 'Display';