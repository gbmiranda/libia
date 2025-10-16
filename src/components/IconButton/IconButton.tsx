import React from 'react';
import { cn } from '../../lib/utils';
import { type SpacingScale, type ComponentSize, type Variant, type Shape, marginClasses, iconSizes } from '../../tokens';
import { type IconName, Icons, renderIcon } from '../../icons';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Icon to display (required)
   */
  icon: IconName;

  /**
   * Accessible label for screen readers (required)
   */
  ariaLabel: string;

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
   * Shape of the button
   */
  shape?: Shape;

  /**
   * Tooltip text (optional)
   */
  tooltip?: string;

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

// Semantic variants (reused from Button)
const iconButtonVariants = {
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

// Icon button sizes (square dimensions)
const iconButtonSizes = {
  sm: 'w-8 h-8 text-sm',   // 32px
  md: 'w-10 h-10 text-base', // 40px
  lg: 'w-12 h-12 text-lg',   // 48px
  xl: 'w-14 h-14 text-xl',   // 56px
};

// Shape styles
const shapeStyles = {
  circle: 'rounded-full',
  square: 'rounded-lg',
};

const disabledStyles =
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none disabled:hover:translate-y-0 disabled:hover:scale-100';

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      ariaLabel,
      variant = 'primary',
      size = 'md',
      loading = false,
      shape = 'circle',
      tooltip,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      margin,
      marginVertical,
      marginHorizontal,
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

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-label={ariaLabel}
        title={tooltip}
        className={cn(
          'relative inline-flex items-center justify-center font-semibold',
          'focus:outline-none focus:ring-4 focus:ring-ai-primary-500/30 focus:ring-offset-2',
          'transform transition-all duration-300 active:scale-[0.95] hover:-translate-y-0.5',
          'select-none',
          iconButtonVariants[variant],
          iconButtonSizes[size],
          shapeStyles[shape],
          disabledStyles,
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
        <span className="relative z-10 flex items-center justify-center">
          {loading ? (
            renderIcon(Icons.Loader2, iconSizes[size], 'animate-spin')
          ) : (
            <span className="inline-flex transition-transform hover:scale-110">
              {renderIcon(icon, iconSizes[size])}
            </span>
          )}
        </span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
