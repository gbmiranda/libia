import React from 'react';
import { cn } from '../../lib/utils';
import { type SpacingScale, type ComponentSize, type Align, type Variant, marginClasses, alignClasses, iconSizes } from '../../tokens';
import { type IconName, Icons, renderIcon } from '../../icons';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button text label
   */
  label: string;

  /**
   * Semantic variant of the button (defines purpose)
   */
  variant?: Variant;

  /**
   * Size of the button
   */
  size?: ComponentSize;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Icon to display before the button text
   */
  leftIcon?: IconName;

  /**
   * Icon to display after the button text
   */
  rightIcon?: IconName;

  /**
   * Full width button
   */
  fullWidth?: boolean;

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

  /**
   * Content alignment within button
   */
  align?: Align;
}

// Semantic variants (define purpose/meaning)
const buttonVariants = {
  primary:
    'bg-ai-primary-600 text-white hover:bg-ai-primary-700 active:bg-ai-primary-800 shadow-lg hover:shadow-xl hover:shadow-ai-primary-500/50',
  secondary:
    'bg-ai-accent-600 text-white hover:bg-ai-accent-700 active:bg-ai-accent-800 shadow-lg hover:shadow-xl hover:shadow-ai-accent-500/50',
  outline:
    'border-2 border-ai-primary-600 text-ai-primary-600 hover:bg-ai-primary-600 hover:text-white active:bg-ai-primary-700 hover:shadow-lg hover:shadow-ai-primary-500/30',
  ghost: 'text-ai-primary-600 hover:bg-ai-primary-100 active:bg-ai-primary-200 hover:shadow-md',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-lg hover:shadow-xl hover:shadow-red-500/50',
  neural:
    'bg-ai-neural-600 text-white hover:bg-ai-neural-700 active:bg-ai-neural-800 shadow-lg hover:shadow-xl hover:shadow-ai-neural-500/50',
};

const buttonSizes = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-2.5 text-base rounded-xl gap-2',
  lg: 'px-8 py-3 text-lg rounded-xl gap-2.5',
  xl: 'px-10 py-4 text-xl rounded-2xl gap-3',
};

const disabledStyles =
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none disabled:hover:translate-y-0 disabled:hover:scale-100';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      margin,
      marginVertical,
      marginHorizontal,
      align = 'center',
      className,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
    };

    const buttonElement = (
      <button
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        className={cn(
          'relative inline-flex items-center justify-center font-semibold',
          'focus:outline-none focus:ring-4 focus:ring-ai-primary-500/30 focus:ring-offset-2',
          'transform transition-all duration-300 active:scale-[0.98] hover:-translate-y-0.5',
          'select-none',
          buttonVariants[variant],
          buttonSizes[size],
          disabledStyles,
          fullWidth && 'w-full',
          // Margin classes (priority: margin > marginVertical/marginHorizontal > individual)
          margin && marginClasses.all[margin],
          !margin && marginVertical && marginClasses.vertical[marginVertical],
          !margin && marginHorizontal && marginClasses.horizontal[marginHorizontal],
          !margin && !marginVertical && marginTop && marginClasses.top[marginTop],
          !margin && !marginVertical && marginBottom && marginClasses.bottom[marginBottom],
          !margin && !marginHorizontal && marginLeft && marginClasses.left[marginLeft],
          !margin && !marginHorizontal && marginRight && marginClasses.right[marginRight],
          className
        )}
        {...props}
      >
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <>
              {renderIcon(Icons.Loader2, iconSizes[size], 'animate-spin')}
              <span>Loading...</span>
            </>
          ) : (
            <>
              {leftIcon && (
                <span className="inline-flex transition-transform group-hover:scale-110">
                  {renderIcon(leftIcon, iconSizes[size])}
                </span>
              )}
              {label}
              {rightIcon && (
                <span className="inline-flex transition-transform group-hover:scale-110">
                  {renderIcon(rightIcon, iconSizes[size])}
                </span>
              )}
            </>
          )}
        </span>
      </button>
    );

    // If fullWidth is true, no wrapper needed
    if (fullWidth) {
      return buttonElement;
    }

    // Wrap button in a div with flex alignment
    return (
      <div className={cn('flex', alignClasses[align])}>
        {buttonElement}
      </div>
    );
  }
);

Button.displayName = 'Button';
