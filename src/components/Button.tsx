/**
 * Calculator Button Component
 */

import React, { memo } from 'react';
import { ButtonProps } from '../types';
import { getButtonType, getButtonTooltip } from '../utils';
import styles from './Button.module.css';

export const Button = memo<ButtonProps>(({ 
  label, 
  onClick, 
  type, 
  className = '', 
  disabled = false,
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => {
  const buttonType = type || getButtonType(label);
  const typeClass = styles[buttonType] || '';
  const zeroClass = label === '0' ? styles.zeroButton : '';
  const buttonClass = `${styles.button} ${typeClass} ${zeroClass} ${className}`.trim();
  
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
      data-testid={testId || `button-${label}`}
      title={getButtonTooltip(label)} // Add tooltip here
    >
      {label}
    </button>
  );
});

Button.displayName = 'Button';
