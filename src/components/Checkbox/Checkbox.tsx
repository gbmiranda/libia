import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { type SpacingScale, type ComponentSize, type Variant, marginClasses } from '../../tokens';
import { Icons, renderIcon } from '../../icons';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * Checked state
   */
  checked?: boolean;

  /**
   * Change handler
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Semantic variant of the checkbox (defines purpose)
   */
  variant?: Variant;

  /**
   * Size of the checkbox
   */
  size?: ComponentSize;

  /**
   * Label text
   */
  label?: string;

  /**
   * Label position relative to checkbox
   */
  labelPosition?: 'left' | 'right';

  /**
   * Margin top spacing
   */
  marginTop?: SpacingScale;

  /**
   * Margin bottom spacing
   */
  marginBottom?: SpacingScale;

  /**
   * Margin left spacing
   */
  marginLeft?: SpacingScale;

  /**
   * Margin right spacing
   */
  marginRight?: SpacingScale;

  /**
   * Margin on all sides
   */
  margin?: SpacingScale;

  /**
   * Margin vertical (top and bottom)
   */
  marginVertical?: SpacingScale;

  /**
   * Margin horizontal (left and right)
   */
  marginHorizontal?: SpacingScale;
}

// Semantic variants - Unchecked border colors
const checkboxBorderVariants = {
  primary: 'border-ai-primary-300 dark:border-ai-primary-700 hover:border-ai-primary-400 dark:hover:border-ai-primary-600',
  secondary: 'border-ai-accent-300 dark:border-ai-accent-700 hover:border-ai-accent-400 dark:hover:border-ai-accent-600',
  outline: 'border-ai-primary-400 dark:border-ai-primary-600 hover:border-ai-primary-500 dark:hover:border-ai-primary-500',
  ghost: 'border-ai-primary-200 dark:border-ai-primary-800 hover:border-ai-primary-300 dark:hover:border-ai-primary-700',
  danger: 'border-red-300 dark:border-red-700 hover:border-red-400 dark:hover:border-red-600',
  neural: 'border-ai-neural-300 dark:border-ai-neural-700 hover:border-ai-neural-400 dark:hover:border-ai-neural-600',
};

// Semantic variants - Checked/indeterminate colors
const checkboxCheckedVariants = {
  primary: 'bg-ai-primary-600 border-ai-primary-600 dark:bg-ai-primary-600 dark:border-ai-primary-600',
  secondary: 'bg-ai-accent-600 border-ai-accent-600 dark:bg-ai-accent-600 dark:border-ai-accent-600',
  outline: 'bg-transparent border-ai-primary-600 dark:border-ai-primary-500',
  ghost: 'bg-ai-primary-100 border-ai-primary-400 dark:bg-ai-primary-900 dark:border-ai-primary-600',
  danger: 'bg-red-600 border-red-600 dark:bg-red-600 dark:border-red-600',
  neural: 'bg-ai-neural-600 border-ai-neural-600 dark:bg-ai-neural-600 dark:border-ai-neural-600',
};

const checkboxSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
};

const iconSizes = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
};

const labelSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const labelGaps = {
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2.5',
  xl: 'gap-3',
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      onChange,
      variant = 'primary',
      size = 'md',
      label,
      labelPosition = 'right',
      disabled = false,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      margin,
      marginVertical,
      marginHorizontal,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(checked);
    const inputRef = useRef<HTMLInputElement>(null);
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    // Determine if controlled or uncontrolled
    const isControlled = onChange !== undefined;
    const currentChecked = isControlled ? checked : internalChecked;

    // Merge refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(inputRef.current);
        } else {
          ref.current = inputRef.current;
        }
      }
    }, [ref]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;

      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      onChange?.(newChecked, e);
    };

    const checkboxElement = (
      <div className="relative inline-flex items-center justify-center">
        {/* Hidden native input */}
        <input
          ref={inputRef}
          type="checkbox"
          id={checkboxId}
          checked={currentChecked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />

        {/* Custom checkbox visual */}
        <div
          className={cn(
            'relative flex items-center justify-center rounded border-2 transition-all duration-200',
            'bg-white dark:bg-slate-700',
            checkboxSizes[size],
            !disabled && 'cursor-pointer',
            disabled && 'opacity-50 cursor-not-allowed',
            // Apply border variant colors
            currentChecked ? checkboxCheckedVariants[variant] : (!disabled && checkboxBorderVariants[variant]),
            className
          )}
        >
          {/* Check icon */}
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-all duration-200',
              currentChecked ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
              // Icon color: white for filled variants, primary color for outline/ghost
              variant === 'outline' ? 'text-ai-primary-600 dark:text-ai-primary-500' :
              variant === 'ghost' ? 'text-ai-primary-600 dark:text-ai-primary-400' :
              'text-white'
            )}
          >
            {renderIcon(Icons.Check, iconSizes[size])}
          </div>
        </div>
      </div>
    );

    const labelElement = label && (
      <span
        className={cn(
          'select-none transition-colors duration-200',
          labelSizes[size],
          disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 cursor-pointer'
        )}
      >
        {label}
      </span>
    );

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          'inline-flex items-center',
          labelGaps[size],
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          // Margin classes
          margin && marginClasses.all[margin],
          !margin && marginVertical && marginClasses.vertical[marginVertical],
          !margin && marginHorizontal && marginClasses.horizontal[marginHorizontal],
          !margin && !marginVertical && marginTop && marginClasses.top[marginTop],
          !margin && !marginVertical && marginBottom && marginClasses.bottom[marginBottom],
          !margin && !marginHorizontal && marginLeft && marginClasses.left[marginLeft],
          !margin && !marginHorizontal && marginRight && marginClasses.right[marginRight]
        )}
      >
        {labelPosition === 'left' ? (
          <>
            {labelElement}
            {checkboxElement}
          </>
        ) : (
          <>
            {checkboxElement}
            {labelElement}
          </>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
