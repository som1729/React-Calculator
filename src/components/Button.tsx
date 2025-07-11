/**
 * Calculator Button Component
 */

import React, { memo } from 'react';
import { ButtonProps } from '../types';
import { getButtonType, getButtonTooltip } from '../utils';
import './Button.css';

export const Button = memo<ButtonProps>(({ 
  label, 
  onClick, 
  type, 
  className = '', 
  disabled = false,
  'aria-label': ariaLabel,
  id: elementId,
}) => {
  const buttonType = type || getButtonType(label);
  const typeClass = buttonType || '';
  const zeroClass = label === '0' ? 'zeroButton' : '';
  const buttonClass = `button ${typeClass} ${zeroClass} ${className}`.trim();
  
  const handleClick = () => {
    if (!disabled) {
      onClick(label);
    }
  };

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      id={elementId || `button-${label}`}
      title={getButtonTooltip(label)} // Add tooltip here
    >
      {label}
    </button>
  );
});

Button.displayName = 'Button';
