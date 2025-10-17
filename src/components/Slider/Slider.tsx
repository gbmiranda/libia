import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '../../lib/utils';
import { marginClasses } from '../../tokens';
import { type SliderProps } from './Slider.types';

// Slider track variants - background and fill colors
const sliderVariants = {
  primary: {
    track: 'bg-ai-primary-200 dark:bg-ai-primary-800',
    fill: 'bg-ai-primary-600 dark:bg-ai-primary-500',
    thumb: 'bg-white dark:bg-slate-200 border-2 border-ai-primary-600 dark:border-ai-primary-500',
    tooltip: 'bg-ai-primary-600 dark:bg-ai-primary-500 text-white',
  },
  secondary: {
    track: 'bg-ai-accent-200 dark:bg-ai-accent-800',
    fill: 'bg-ai-accent-600 dark:bg-ai-accent-500',
    thumb: 'bg-white dark:bg-slate-200 border-2 border-ai-accent-600 dark:border-ai-accent-500',
    tooltip: 'bg-ai-accent-600 dark:bg-ai-accent-500 text-white',
  },
  outline: {
    track: 'bg-ai-primary-100 dark:bg-ai-primary-900 border-2 border-ai-primary-300 dark:border-ai-primary-700',
    fill: 'bg-ai-primary-600 dark:bg-ai-primary-500',
    thumb: 'bg-white dark:bg-slate-200 border-2 border-ai-primary-600 dark:border-ai-primary-500',
    tooltip: 'bg-ai-primary-600 dark:bg-ai-primary-500 text-white',
  },
  ghost: {
    track: 'bg-ai-primary-100 dark:bg-ai-primary-900/20',
    fill: 'bg-ai-primary-500 dark:bg-ai-primary-600',
    thumb: 'bg-white dark:bg-slate-200 border-2 border-ai-primary-500 dark:border-ai-primary-600',
    tooltip: 'bg-ai-primary-500 dark:bg-ai-primary-600 text-white',
  },
  danger: {
    track: 'bg-red-200 dark:bg-red-800',
    fill: 'bg-red-600 dark:bg-red-500',
    thumb: 'bg-white dark:bg-slate-200 border-2 border-red-600 dark:border-red-500',
    tooltip: 'bg-red-600 dark:bg-red-500 text-white',
  },
  neural: {
    track: 'bg-ai-neural-200 dark:bg-ai-neural-800',
    fill: 'bg-ai-neural-600 dark:bg-ai-neural-500',
    thumb: 'bg-white dark:bg-slate-200 border-2 border-ai-neural-600 dark:border-ai-neural-500',
    tooltip: 'bg-ai-neural-600 dark:bg-ai-neural-500 text-white',
  },
};

// Track sizes
const trackSizes = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2',
  xl: 'h-2.5',
};

// Thumb sizes
const thumbSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
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

// Value text sizes
const valueTextSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      label,
      helperText,
      showValue = false,
      showTooltip = true,
      marks,
      variant = 'primary',
      size = 'md',
      fullWidth = true,
      disabled = false,
      required = false,
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
    // Internal state for uncontrolled component
    const [internalValue, setInternalValue] = useState<number | [number, number]>(
      value !== undefined ? value : min
    );

    // Dragging state
    const [isDragging, setIsDragging] = useState<'single' | 'min' | 'max' | null>(null);
    const [hoveredThumb, setHoveredThumb] = useState<'single' | 'min' | 'max' | null>(null);

    // Refs
    const trackRef = useRef<HTMLDivElement>(null);
    const trackRectRef = useRef<DOMRect | null>(null);
    const rafIdRef = useRef<number | null>(null);
    const isDraggingRef = useRef<'single' | 'min' | 'max' | null>(null);

    // Get current value (controlled or uncontrolled)
    const currentValue = value !== undefined ? value : internalValue;

    // Determine if this is a range slider based on current value
    const isRange = Array.isArray(currentValue);

    // Get colors
    const colors = sliderVariants[variant];

    // Calculate percentage for single value
    const getPercentage = useCallback((val: number) => {
      return ((val - min) / (max - min)) * 100;
    }, [min, max]);

    // Get value from mouse/touch position
    const getValueFromPosition = useCallback((clientX: number) => {
      // Use cached rect if available (during drag), otherwise get fresh rect
      const rect = trackRectRef.current || trackRef.current?.getBoundingClientRect();
      if (!rect) return min;

      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = min + percentage * (max - min);

      // Snap to step
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.max(min, Math.min(max, steppedValue));
    }, [min, max, step]);

    // Handle value change
    const handleValueChange = useCallback((newValue: number | [number, number]) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }, [value, onChange]);

    // Mouse/Touch handlers for single slider
    const handleSinglePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.preventDefault();

      // Cache track position for better performance
      if (trackRef.current) {
        trackRectRef.current = trackRef.current.getBoundingClientRect();
      }

      isDraggingRef.current = 'single';
      setIsDragging('single');
    };

    // Mouse/Touch handlers for range slider
    const handleRangePointerDown = (thumb: 'min' | 'max') => (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();

      // Cache track position for better performance
      if (trackRef.current) {
        trackRectRef.current = trackRef.current.getBoundingClientRect();
      }

      isDraggingRef.current = thumb;
      setIsDragging(thumb);
    };

    // Handle track click
    const handleTrackClick = (e: React.MouseEvent) => {
      if (disabled || isDragging) return;

      const clientX = e.clientX;
      const newValue = getValueFromPosition(clientX);

      if (isRange && Array.isArray(currentValue)) {
        const [minVal, maxVal] = currentValue;
        const midPoint = (minVal + maxVal) / 2;

        // Determine which thumb to move (closer one)
        if (newValue < midPoint) {
          handleValueChange([newValue, maxVal]);
        } else {
          handleValueChange([minVal, newValue]);
        }
      } else {
        handleValueChange(newValue);
      }
    };

    // Global mouse/touch move and up handlers
    useEffect(() => {
      if (!isDragging) return;

      const handlePointerMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();

        // Use RAF for smooth 60fps updates
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }

        rafIdRef.current = requestAnimationFrame(() => {
          const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
          const newValue = getValueFromPosition(clientX);
          const currentDragging = isDraggingRef.current;

          // Get fresh current value
          const freshValue = value !== undefined ? value : internalValue;
          const freshIsRange = Array.isArray(freshValue);

          if (currentDragging === 'single') {
            handleValueChange(newValue);
          } else if (freshIsRange && Array.isArray(freshValue)) {
            const [minVal, maxVal] = freshValue;

            if (currentDragging === 'min') {
              handleValueChange([Math.min(newValue, maxVal), maxVal]);
            } else if (currentDragging === 'max') {
              handleValueChange([minVal, Math.max(newValue, minVal)]);
            }
          }

          rafIdRef.current = null;
        });
      };

      const handlePointerUp = () => {
        // Clear RAF and cached rect
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        trackRectRef.current = null;
        isDraggingRef.current = null;
        setIsDragging(null);
      };

      document.addEventListener('mousemove', handlePointerMove);
      document.addEventListener('mouseup', handlePointerUp);
      document.addEventListener('touchmove', handlePointerMove, { passive: false });
      document.addEventListener('touchend', handlePointerUp);

      return () => {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }
        document.removeEventListener('mousemove', handlePointerMove);
        document.removeEventListener('mouseup', handlePointerUp);
        document.removeEventListener('touchmove', handlePointerMove);
        document.removeEventListener('touchend', handlePointerUp);
      };
    }, [isDragging, getValueFromPosition, handleValueChange, value, internalValue]);

    // Keyboard support
    const handleKeyDown = (thumb: 'single' | 'min' | 'max') => (e: React.KeyboardEvent) => {
      if (disabled) return;

      let handled = false;
      let newValue: number;

      if (thumb === 'single' && typeof currentValue === 'number') {
        newValue = currentValue;

        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          newValue = Math.max(min, currentValue - step);
          handled = true;
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          newValue = Math.min(max, currentValue + step);
          handled = true;
        } else if (e.key === 'Home') {
          newValue = min;
          handled = true;
        } else if (e.key === 'End') {
          newValue = max;
          handled = true;
        }

        if (handled) {
          e.preventDefault();
          handleValueChange(newValue);
        }
      } else if (isRange && Array.isArray(currentValue)) {
        const [minVal, maxVal] = currentValue;

        if (thumb === 'min') {
          newValue = minVal;

          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            newValue = Math.max(min, minVal - step);
            handled = true;
          } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            newValue = Math.min(maxVal, minVal + step);
            handled = true;
          } else if (e.key === 'Home') {
            newValue = min;
            handled = true;
          } else if (e.key === 'End') {
            newValue = maxVal;
            handled = true;
          }

          if (handled) {
            e.preventDefault();
            handleValueChange([newValue, maxVal]);
          }
        } else if (thumb === 'max') {
          newValue = maxVal;

          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            newValue = Math.max(minVal, maxVal - step);
            handled = true;
          } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            newValue = Math.min(max, maxVal + step);
            handled = true;
          } else if (e.key === 'Home') {
            newValue = minVal;
            handled = true;
          } else if (e.key === 'End') {
            newValue = max;
            handled = true;
          }

          if (handled) {
            e.preventDefault();
            handleValueChange([minVal, newValue]);
          }
        }
      }
    };

    // Generate marks
    const getMarks = () => {
      if (!marks) return [];

      if (Array.isArray(marks)) {
        return marks.filter(mark => mark >= min && mark <= max);
      }

      // Auto-generate marks
      const numMarks = 5;
      const markStep = (max - min) / (numMarks - 1);
      return Array.from({ length: numMarks }, (_, i) => min + i * markStep);
    };

    const marksArray = getMarks();

    // Render slider
    const sliderElement = (
      <div
        className={cn(
          'flex flex-col text-left',
          fullWidth && 'w-full'
        )}
      >
        {/* Label and value */}
        {(label || showValue) && (
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
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            {showValue && (
              <span className={cn('font-medium text-gray-700 dark:text-gray-300', valueTextSizes[size], disabled && 'opacity-50')}>
                {isRange && Array.isArray(currentValue)
                  ? `${currentValue[0]} - ${currentValue[1]}`
                  : currentValue}
              </span>
            )}
          </div>
        )}

        {/* Slider track container */}
        <div
          ref={ref}
          className={cn(
            'relative flex items-center',
            fullWidth ? 'w-full' : 'w-64',
            'py-4', // Padding for thumb space
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className={cn(
              'relative w-full rounded-full cursor-pointer',
              colors.track,
              trackSizes[size],
              disabled && 'cursor-not-allowed'
            )}
            onClick={handleTrackClick}
          >
            {/* Fill (for single value or range) */}
            <div
              className={cn(
                'absolute h-full rounded-full',
                colors.fill,
                !isDragging && 'transition-all duration-200'
              )}
              style={{
                left: isRange && Array.isArray(currentValue) ? `${getPercentage(currentValue[0])}%` : '0%',
                width: isRange && Array.isArray(currentValue)
                  ? `${getPercentage(currentValue[1]) - getPercentage(currentValue[0])}%`
                  : `${getPercentage(typeof currentValue === 'number' ? currentValue : 0)}%`,
                ...(isDragging && { willChange: 'left, width' }),
              }}
            />

            {/* Marks */}
            {marksArray.length > 0 && (
              <div className="absolute inset-0">
                {marksArray.map((mark, index) => (
                  <div
                    key={index}
                    className="absolute top-1/2 -translate-y-1/2 w-0.5 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"
                    style={{ left: `${getPercentage(mark)}%` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbs */}
          {isRange && Array.isArray(currentValue) ? (
            <>
              {/* Min thumb */}
              <div
                role="slider"
                aria-valuenow={currentValue[0]}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-label={label ? `${label} (minimum)` : 'Minimum value'}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                className={cn(
                  'absolute rounded-full shadow-md',
                  colors.thumb,
                  thumbSizes[size],
                  !disabled && 'cursor-grab focus:ring-4 focus:ring-offset-2',
                  !disabled && 'focus:outline-none',
                  !disabled && isDragging !== 'min' && 'hover:scale-110 transition-transform',
                  isDragging === 'min' && !disabled && 'cursor-grabbing scale-110',
                  disabled && 'cursor-not-allowed'
                )}
                style={{
                  left: `${getPercentage(currentValue[0])}%`,
                  transform: 'translateX(-50%)',
                  ...(isDragging === 'min' && { willChange: 'left' }),
                }}
                onMouseDown={handleRangePointerDown('min')}
                onTouchStart={handleRangePointerDown('min')}
                onKeyDown={handleKeyDown('min')}
                onMouseEnter={() => !disabled && setHoveredThumb('min')}
                onMouseLeave={() => setHoveredThumb(null)}
              >
                {/* Tooltip */}
                {showTooltip && (isDragging === 'min' || hoveredThumb === 'min') && (
                  <div className={cn(
                    'absolute bottom-full mb-2 px-2 py-1 text-xs font-medium rounded shadow-lg whitespace-nowrap',
                    colors.tooltip,
                    'left-1/2 -translate-x-1/2'
                  )}>
                    {currentValue[0]}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-current" />
                  </div>
                )}
              </div>

              {/* Max thumb */}
              <div
                role="slider"
                aria-valuenow={currentValue[1]}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-label={label ? `${label} (maximum)` : 'Maximum value'}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                className={cn(
                  'absolute rounded-full shadow-md',
                  colors.thumb,
                  thumbSizes[size],
                  !disabled && 'cursor-grab focus:ring-4 focus:ring-offset-2',
                  !disabled && 'focus:outline-none',
                  !disabled && isDragging !== 'max' && 'hover:scale-110 transition-transform',
                  isDragging === 'max' && !disabled && 'cursor-grabbing scale-110',
                  disabled && 'cursor-not-allowed'
                )}
                style={{
                  left: `${getPercentage(currentValue[1])}%`,
                  transform: 'translateX(-50%)',
                  ...(isDragging === 'max' && { willChange: 'left' }),
                }}
                onMouseDown={handleRangePointerDown('max')}
                onTouchStart={handleRangePointerDown('max')}
                onKeyDown={handleKeyDown('max')}
                onMouseEnter={() => !disabled && setHoveredThumb('max')}
                onMouseLeave={() => setHoveredThumb(null)}
              >
                {/* Tooltip */}
                {showTooltip && (isDragging === 'max' || hoveredThumb === 'max') && (
                  <div className={cn(
                    'absolute bottom-full mb-2 px-2 py-1 text-xs font-medium rounded shadow-lg whitespace-nowrap',
                    colors.tooltip,
                    'left-1/2 -translate-x-1/2'
                  )}>
                    {currentValue[1]}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-current" />
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Single thumb */
            <div
              role="slider"
              aria-valuenow={typeof currentValue === 'number' ? currentValue : min}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-label={label || 'Slider value'}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              className={cn(
                'absolute rounded-full shadow-md',
                colors.thumb,
                thumbSizes[size],
                !disabled && 'cursor-grab focus:ring-4 focus:ring-offset-2',
                !disabled && 'focus:outline-none',
                !disabled && isDragging !== 'single' && 'hover:scale-110 transition-transform',
                isDragging === 'single' && !disabled && 'cursor-grabbing scale-110',
                disabled && 'cursor-not-allowed'
              )}
              style={{
                left: `${getPercentage(typeof currentValue === 'number' ? currentValue : min)}%`,
                transform: 'translateX(-50%)',
                ...(isDragging === 'single' && { willChange: 'left' }),
              }}
              onMouseDown={handleSinglePointerDown}
              onTouchStart={handleSinglePointerDown}
              onKeyDown={handleKeyDown('single')}
              onMouseEnter={() => !disabled && setHoveredThumb('single')}
              onMouseLeave={() => setHoveredThumb(null)}
            >
              {/* Tooltip */}
              {showTooltip && (isDragging === 'single' || hoveredThumb === 'single') && (
                <div className={cn(
                  'absolute bottom-full mb-2 px-2 py-1 text-xs font-medium rounded shadow-lg whitespace-nowrap',
                  colors.tooltip,
                  'left-1/2 -translate-x-1/2'
                )}>
                  {typeof currentValue === 'number' ? currentValue : min}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-current" />
                </div>
              )}
            </div>
          )}
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
        {sliderElement}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
