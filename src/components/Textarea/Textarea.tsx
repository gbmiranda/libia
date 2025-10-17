import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { marginClasses } from '../../tokens';
import { type TextareaProps } from './Textarea.types';

// Textarea variants - border and focus colors
const textareaVariants = {
  primary:
    'border-ai-primary-300 dark:border-ai-primary-700 focus:border-ai-primary-500 focus:ring-ai-primary-500/30',
  secondary:
    'border-ai-accent-300 dark:border-ai-accent-700 focus:border-ai-accent-500 focus:ring-ai-accent-500/30',
  outline:
    'border-ai-primary-400 dark:border-ai-primary-600 focus:border-ai-primary-600 focus:ring-ai-primary-500/30',
  ghost:
    'border-ai-primary-200 dark:border-ai-primary-800 focus:border-ai-primary-400 focus:ring-ai-primary-500/20',
  danger:
    'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/30',
  neural:
    'border-ai-neural-300 dark:border-ai-neural-700 focus:border-ai-neural-500 focus:ring-ai-neural-500/30',
};

// Textarea sizes
const textareaSizes = {
  sm: 'px-3 py-2 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-base rounded-xl',
  lg: 'px-5 py-3 text-lg rounded-xl',
  xl: 'px-6 py-4 text-xl rounded-2xl',
};

// Label sizes
const labelSizes = {
  sm: 'text-sm mb-1',
  md: 'text-base mb-1.5',
  lg: 'text-lg mb-2',
  xl: 'text-xl mb-2.5',
};

// Helper text sizes
const helperTextSizes = {
  sm: 'text-xs mt-1',
  md: 'text-sm mt-1.5',
  lg: 'text-base mt-2',
  xl: 'text-lg mt-2.5',
};

// Resize classes
const resizeClasses = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      value,
      onChange,
      variant = 'primary',
      size = 'md',
      label,
      helperText,
      error,
      success = false,
      fullWidth = false,
      disabled = false,
      required = false,
      rows = 4,
      showCount = false,
      resize = 'vertical',
      autoResize = false,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      margin,
      marginVertical,
      marginHorizontal,
      className,
      id,
      maxLength,
      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled component
    const [internalValue, setInternalValue] = useState(value || '');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;

    // Determine if controlled or uncontrolled
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    // Character count
    const charCount = currentValue?.length || 0;
    const maxCount = maxLength || Infinity;

    // Determine state classes
    const hasError = Boolean(error);
    const stateClasses = hasError
      ? 'border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500/30'
      : success
      ? 'border-green-500 dark:border-green-500 focus:border-green-500 focus:ring-green-500/30'
      : textareaVariants[variant];

    // Merge refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(textareaRef.current);
        } else {
          ref.current = textareaRef.current;
        }
      }
    }, [ref]);

    // Auto-resize functionality
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        // Reset height to recalculate
        textarea.style.height = 'auto';
        // Set to scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [currentValue, autoResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textareaValue = e.target.value;

      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalValue(textareaValue);
      }

      onChange?.(textareaValue, e);
    };

    return (
      <div
        className={cn(
          fullWidth && 'w-full',
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
        <div className="text-left">
          {/* Label */}
          {label && (
            <label
              htmlFor={textareaId}
              className={cn(
                'block font-medium text-gray-700 dark:text-gray-300',
                labelSizes[size],
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            id={textareaId}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            rows={autoResize ? 1 : rows}
            maxLength={maxLength}
            aria-describedby={error ? errorId : helperText ? helperTextId : undefined}
            aria-invalid={hasError}
            className={cn(
              !fullWidth && 'min-w-[250px]',
              fullWidth && 'w-full',
              'border-2 transition-all duration-200',
              'bg-white dark:bg-slate-800',
              'text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'focus:outline-none focus:ring-4',
              textareaSizes[size],
              stateClasses,
              resizeClasses[autoResize ? 'none' : resize],
              autoResize && 'overflow-hidden',
              disabled && 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900',
              className
            )}
            {...props}
          />

          {/* Character count or Helper text */}
          <div className="flex items-center justify-between">
            {/* Helper text */}
            {helperText && !error && (
              <p
                id={helperTextId}
                className={cn(
                  'text-gray-500 dark:text-gray-400',
                  helperTextSizes[size],
                  disabled && 'opacity-50'
                )}
              >
                {helperText}
              </p>
            )}

            {/* Error message */}
            {error && (
              <p
                id={errorId}
                className={cn(
                  'text-red-500 dark:text-red-400',
                  helperTextSizes[size],
                  disabled && 'opacity-50'
                )}
              >
                {error}
              </p>
            )}

            {/* Character count */}
            {showCount && (
              <p
                className={cn(
                  'text-gray-500 dark:text-gray-400',
                  helperTextSizes[size],
                  disabled && 'opacity-50',
                  charCount > maxCount * 0.9 && 'text-orange-500 dark:text-orange-400',
                  charCount >= maxCount && 'text-red-500 dark:text-red-400'
                )}
              >
                {charCount}
                {maxLength && ` / ${maxLength}`}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
