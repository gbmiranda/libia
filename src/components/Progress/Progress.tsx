import React from 'react';
import { cn } from '../../lib/utils';
import { marginClasses } from '../../tokens';
import { type ProgressProps } from './Progress.types';

// Progress bar variants - background and bar colors
const progressVariants = {
  primary: {
    background: 'bg-ai-primary-100 dark:bg-ai-primary-900/30',
    bar: 'bg-ai-primary-600 dark:bg-ai-primary-500',
    text: 'text-ai-primary-700 dark:text-ai-primary-300',
  },
  secondary: {
    background: 'bg-ai-accent-100 dark:bg-ai-accent-900/30',
    bar: 'bg-ai-accent-600 dark:bg-ai-accent-500',
    text: 'text-ai-accent-700 dark:text-ai-accent-300',
  },
  outline: {
    background: 'bg-ai-primary-50 dark:bg-ai-primary-900/20 border-2 border-ai-primary-200 dark:border-ai-primary-800',
    bar: 'bg-ai-primary-600 dark:bg-ai-primary-500',
    text: 'text-ai-primary-700 dark:text-ai-primary-300',
  },
  ghost: {
    background: 'bg-ai-primary-50 dark:bg-ai-primary-900/10',
    bar: 'bg-ai-primary-400 dark:bg-ai-primary-600',
    text: 'text-ai-primary-600 dark:text-ai-primary-400',
  },
  danger: {
    background: 'bg-red-100 dark:bg-red-900/30',
    bar: 'bg-red-600 dark:bg-red-500',
    text: 'text-red-700 dark:text-red-300',
  },
  neural: {
    background: 'bg-ai-neural-100 dark:bg-ai-neural-900/30',
    bar: 'bg-ai-neural-600 dark:bg-ai-neural-500',
    text: 'text-ai-neural-700 dark:text-ai-neural-300',
  },
};

// Progress bar sizes
const progressSizes = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
  xl: 'h-6',
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

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      label,
      helperText,
      showValue = false,
      valuePosition = 'top',
      variant = 'primary',
      size = 'md',
      animated = true,
      striped = false,
      indeterminate = false,
      fullWidth = true,
      disabled = false,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      margin,
      marginVertical,
      marginHorizontal,
      className,
      ...props
    },
    ref
  ) => {
    // Calculate percentage
    const percentage = indeterminate ? 100 : Math.min(Math.max((value / max) * 100, 0), 100);

    // Get variant colors
    const colors = progressVariants[variant];

    // Value text sizes for inside position
    const valueTextSize = {
      sm: 'text-[10px]',
      md: 'text-xs',
      lg: 'text-sm',
      xl: 'text-base',
    };

    // Progress element
    const progressElement = (
      <div
        className={cn(
          'flex flex-col text-left',
          fullWidth && 'w-full'
        )}
      >
        {/* Label and value (when valuePosition is 'top') */}
        {(label || (showValue && valuePosition === 'top')) && (
          <div className="flex items-center justify-between">
            {label && (
              <label
                className={cn(
                  'block font-medium text-gray-700 dark:text-gray-300',
                  labelSizes[size],
                  disabled && 'opacity-50'
                )}
              >
                {label}
              </label>
            )}
            {showValue && valuePosition === 'top' && !indeterminate && (
              <span className={cn('font-medium', colors.text, labelSizes[size], disabled && 'opacity-50')}>
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        {/* Progress bar */}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || (indeterminate ? 'Loading' : `${Math.round(percentage)}% complete`)}
          className={cn(
            'relative overflow-hidden rounded-full',
            colors.background,
            progressSizes[size],
            fullWidth ? 'w-full' : 'w-64',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        >
          {/* Progress bar fill */}
          <div
            className={cn(
              'h-full rounded-full transition-all relative',
              colors.bar,
              animated && 'duration-500 ease-out',
              indeterminate && 'animate-[indeterminate_1.5s_ease-in-out_infinite]'
            )}
            style={{
              width: indeterminate ? '50%' : `${percentage}%`,
              ...(indeterminate && {
                position: 'absolute',
                left: '-50%',
              }),
              ...(striped && {
                backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)',
                backgroundSize: '1rem 1rem',
              }),
            }}
          >
            {/* Value inside the bar */}
            {showValue && valuePosition === 'inside' && !indeterminate && percentage > 10 && (
              <div className="absolute inset-0 flex items-center justify-end pr-2">
                <span className={cn('font-semibold text-white drop-shadow-sm', valueTextSize[size])}>
                  {Math.round(percentage)}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Helper text */}
        {helperText && (
          <p
            className={cn(
              'text-gray-500 dark:text-gray-400',
              helperTextSizes[size],
              disabled && 'opacity-50'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );

    // Return with margins
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
        {progressElement}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
