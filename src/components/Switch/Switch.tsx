import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { type SpacingScale, type ComponentSize, type Variant, marginClasses } from '../../tokens';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * Checked state
   */
  checked?: boolean;

  /**
   * Change handler
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Semantic variant of the switch (defines purpose)
   */
  variant?: Variant;

  /**
   * Size of the switch
   */
  size?: ComponentSize;

  /**
   * Label text
   */
  label?: string;

  /**
   * Label position relative to switch
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

// Semantic variants - Unchecked background colors
const switchBgVariants = {
  primary: 'bg-gray-300 dark:bg-gray-600',
  secondary: 'bg-gray-300 dark:bg-gray-600',
  outline: 'bg-gray-300 dark:bg-gray-600',
  ghost: 'bg-gray-300 dark:bg-gray-600',
  danger: 'bg-gray-300 dark:bg-gray-600',
  neural: 'bg-gray-300 dark:bg-gray-600',
};

// Semantic variants - Checked background colors
const switchCheckedVariants = {
  primary: 'bg-ai-primary-600 dark:bg-ai-primary-600',
  secondary: 'bg-ai-accent-600 dark:bg-ai-accent-600',
  outline: 'bg-ai-primary-600 dark:bg-ai-primary-500',
  ghost: 'bg-ai-primary-500 dark:bg-ai-primary-600',
  danger: 'bg-red-600 dark:bg-red-600',
  neural: 'bg-ai-neural-600 dark:bg-ai-neural-600',
};

const switchSizes = {
  sm: 'w-8 h-4',
  md: 'w-11 h-6',
  lg: 'w-14 h-7',
  xl: 'w-16 h-8',
};

const thumbSizes = {
  sm: 'w-3 h-3',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
};

const thumbTranslate = {
  sm: 'translate-x-4',
  md: 'translate-x-5',
  lg: 'translate-x-7',
  xl: 'translate-x-8',
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

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
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
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

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

    const switchElement = (
      <div className="relative inline-flex items-center">
        {/* Hidden native input */}
        <input
          ref={inputRef}
          type="checkbox"
          role="switch"
          id={switchId}
          checked={currentChecked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />

        {/* Custom switch visual */}
        <div
          className={cn(
            'relative inline-flex items-center rounded-full transition-all duration-200',
            switchSizes[size],
            !disabled && 'cursor-pointer',
            disabled && 'opacity-50 cursor-not-allowed',
            // Apply background variant colors
            currentChecked ? switchCheckedVariants[variant] : switchBgVariants[variant],
            className
          )}
        >
          {/* Thumb/Toggle */}
          <div
            className={cn(
              'absolute left-0.5 rounded-full bg-white shadow-md transition-all duration-200',
              thumbSizes[size],
              currentChecked && thumbTranslate[size]
            )}
          />
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
        htmlFor={switchId}
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
            {switchElement}
          </>
        ) : (
          <>
            {switchElement}
            {labelElement}
          </>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
