/**
 * Calculator Display Component
 */

import { memo, forwardRef } from 'react';
import { DisplayProps } from '../types';
import './Display.css';

export const Display = memo(forwardRef<HTMLDivElement, DisplayProps>(({ 
  value, 
  expression, 
  isError = false,
  id: elementId,
}, ref) => {
  const displayValue = value || '0';

  return (
    <div 
      ref={ref}
      className={`display ${isError ? 'error' : ''}`}
      id={elementId || 'calculator-display'}
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
          className="expression"
          id="calculator-expression"
          aria-label={`Expression: ${expression}`}
          title={`Current expression: ${expression}`}
        >
          {expression}
        </div>
      )}
      <div 
        className="value"
        id="calculator-value"
        title={displayValue}
      >
        {displayValue}
      </div>
    </div>
  );
}));

Display.displayName = 'Display';