import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../lib/utils';
import { type SpacingScale, type ComponentSize, type Align, type Variant, marginClasses, alignClasses, iconSizes } from '../../tokens';
import { type IconName, Icons, renderIcon } from '../../icons';
import { DatePicker } from './DatePicker';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  /**
   * Input value
   */
  value?: string;

  /**
   * Change handler
   */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Input type (includes custom types like 'currency')
   */
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'currency';

  /**
   * Locale for formatting (auto-detects from browser if not provided)
   * - For currency type: determines both format and currency symbol
   * - For date type: determines date format
   * - Examples: 'pt-BR' (R$), 'en-US' ($), 'de-DE' (€), 'en-GB' (£)
   */
  locale?: string;

  /**
   * Semantic variant of the input (defines purpose)
   */
  variant?: Variant;

  /**
   * Size of the input
   */
  size?: ComponentSize;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Error message (when present, input shows error state)
   */
  error?: string;

  /**
   * Success state
   */
  success?: boolean;

  /**
   * Icon to display on the left side
   */
  leftIcon?: IconName;

  /**
   * Icon to display on the right side
   */
  rightIcon?: IconName;

  /**
   * Full width input
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
   * Content alignment when not fullWidth
   */
  align?: Align;
}

// Locale to currency mapping
const getCurrencyFromLocale = (locale: string): string => {
  const currencyMap: Record<string, string> = {
    'pt-BR': 'BRL',
    'pt-PT': 'EUR',
    'en-US': 'USD',
    'en-GB': 'GBP',
    'en-CA': 'CAD',
    'en-AU': 'AUD',
    'de-DE': 'EUR',
    'de-AT': 'EUR',
    'de-CH': 'CHF',
    'fr-FR': 'EUR',
    'fr-BE': 'EUR',
    'fr-CH': 'CHF',
    'fr-CA': 'CAD',
    'es-ES': 'EUR',
    'es-MX': 'MXN',
    'es-AR': 'ARS',
    'it-IT': 'EUR',
    'nl-NL': 'EUR',
    'nl-BE': 'EUR',
    'ja-JP': 'JPY',
    'zh-CN': 'CNY',
    'zh-TW': 'TWD',
    'zh-HK': 'HKD',
    'ko-KR': 'KRW',
    'ru-RU': 'RUB',
    'sv-SE': 'SEK',
    'no-NO': 'NOK',
    'dk-DK': 'DKK',
    'pl-PL': 'PLN',
    'tr-TR': 'TRY',
    'in-ID': 'IDR',
    'th-TH': 'THB',
    'vi-VN': 'VND',
    'ar-SA': 'SAR',
    'he-IL': 'ILS',
  };

  return currencyMap[locale] || 'USD'; // Fallback to USD
};

// Auto-detect browser locale
const getDefaultLocale = (): string => {
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language;
  }
  return 'pt-BR'; // Fallback to Brazilian Portuguese
};

// Input container variants - border and focus colors
const inputVariants = {
  primary:
    'border-ai-primary-300 dark:border-ai-primary-700 focus-within:border-ai-primary-500 focus-within:ring-ai-primary-500/30',
  secondary:
    'border-ai-accent-300 dark:border-ai-accent-700 focus-within:border-ai-accent-500 focus-within:ring-ai-accent-500/30',
  outline:
    'border-ai-primary-400 dark:border-ai-primary-600 focus-within:border-ai-primary-600 focus-within:ring-ai-primary-500/30',
  ghost:
    'border-ai-primary-200 dark:border-ai-primary-800 focus-within:border-ai-primary-400 focus-within:ring-ai-primary-500/20',
  danger:
    'border-red-300 dark:border-red-700 focus-within:border-red-500 focus-within:ring-red-500/30',
  neural:
    'border-ai-neural-300 dark:border-ai-neural-700 focus-within:border-ai-neural-500 focus-within:ring-ai-neural-500/30',
};

// Input sizes
const inputSizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-base rounded-xl',
  lg: 'px-5 py-3 text-lg rounded-xl',
  xl: 'px-6 py-4 text-xl rounded-2xl',
};

const labelSizes = {
  sm: 'text-sm mb-1',
  md: 'text-base mb-1.5',
  lg: 'text-lg mb-2',
  xl: 'text-xl mb-2.5',
};

const helperTextSizes = {
  sm: 'text-xs mt-1',
  md: 'text-sm mt-1.5',
  lg: 'text-base mt-2',
  xl: 'text-lg mt-2.5',
};

const iconPadding = {
  sm: {
    left: 'pl-9',
    right: 'pr-9',
  },
  md: {
    left: 'pl-11',
    right: 'pr-11',
  },
  lg: {
    left: 'pl-12',
    right: 'pr-12',
  },
  xl: {
    left: 'pl-14',
    right: 'pr-14',
  },
};

const iconPosition = {
  sm: {
    left: 'left-3',
    right: 'right-3',
  },
  md: {
    left: 'left-4',
    right: 'right-4',
  },
  lg: {
    left: 'left-5',
    right: 'right-5',
  },
  xl: {
    left: 'left-6',
    right: 'right-6',
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      margin,
      marginVertical,
      marginHorizontal,
      align = 'center',
      className,
      id,
      type = 'text',
      locale,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value || '');
    const [displayValue, setDisplayValue] = useState(value || '');
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    // Auto-detect locale if not provided
    const effectiveLocale = locale || getDefaultLocale();

    // Derive currency from locale
    const currency = getCurrencyFromLocale(effectiveLocale);

    // Determine if controlled or uncontrolled
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    // Currency formatting functions
    const formatCurrency = (val: string): string => {
      // Remove all non-digit characters
      const numbersOnly = val.replace(/\D/g, '');

      if (!numbersOnly) return '';

      // Convert to number (cents)
      const numberValue = parseInt(numbersOnly, 10) / 100;

      // Format using Intl.NumberFormat
      return new Intl.NumberFormat(effectiveLocale, {
        style: 'currency',
        currency: currency,
      }).format(numberValue);
    };

    const unformatCurrency = (val: string): string => {
      // Extract only numbers
      const numbersOnly = val.replace(/\D/g, '');

      if (!numbersOnly) return '';

      // Convert back to decimal value
      const numberValue = parseInt(numbersOnly, 10) / 100;
      return numberValue.toString();
    };

    // Date formatting functions
    const formatDateMask = (val: string): string => {
      // Remove all non-digit characters
      const numbersOnly = val.replace(/\D/g, '');

      if (!numbersOnly) return '';

      // Apply DD/MM/YYYY mask
      if (numbersOnly.length <= 2) {
        return numbersOnly;
      } else if (numbersOnly.length <= 4) {
        return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2)}`;
      } else {
        return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2, 4)}/${numbersOnly.slice(4, 8)}`;
      }
    };

    const parseDate = (dateStr: string): string => {
      // Convert DD/MM/YYYY to YYYY-MM-DD (ISO format)
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        if (year.length === 4 && month.length === 2 && day.length === 2) {
          return `${year}-${month}-${day}`;
        }
      }
      return '';
    };

    const formatDateDisplay = (isoDate: string): string => {
      // Convert YYYY-MM-DD to DD/MM/YYYY
      if (!isoDate) return '';
      const parts = isoDate.split('-');
      if (parts.length === 3) {
        const [year, month, day] = parts;
        return `${day}/${month}/${year}`;
      }
      return '';
    };

    // Date state
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [pickerPosition, setPickerPosition] = useState<{ top: number; left: number; width: number } | null>(null);
    const datePickerRef = useRef<HTMLDivElement>(null);

    // Update display value when value prop changes (for currency and date)
    useEffect(() => {
      if (type === 'currency' && value !== undefined) {
        setDisplayValue(formatCurrency(value));
      } else if (type === 'date' && value !== undefined) {
        setDisplayValue(formatDateDisplay(value));
      }
    }, [value, type, effectiveLocale]);

    // Close date picker when clicking outside (with Portal)
    useEffect(() => {
      if (type === 'date' && showDatePicker) {
        const handleClickOutside = (event: MouseEvent) => {
          const target = event.target as Node;
          // Check if click is outside both the input and the picker
          if (
            inputRef.current &&
            !inputRef.current.contains(target) &&
            !document.querySelector('[data-datepicker]')?.contains(target)
          ) {
            setShowDatePicker(false);
            setPickerPosition(null);
          }
        };

        // Small delay to prevent immediate closing
        setTimeout(() => {
          document.addEventListener('mousedown', handleClickOutside);
        }, 0);

        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [type, showDatePicker]);

    // Determine state classes
    const hasError = Boolean(error);
    const stateClasses = hasError
      ? 'border-red-500 dark:border-red-500 focus-within:border-red-500 focus-within:ring-red-500/30'
      : success
      ? 'border-green-500 dark:border-green-500 focus-within:border-green-500 focus-within:ring-green-500/30'
      : inputVariants[variant];

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
      const inputValue = e.target.value;

      if (type === 'currency') {
        // Format the display value
        const formatted = formatCurrency(inputValue);
        setDisplayValue(formatted);

        // Get the raw numeric value
        const rawValue = unformatCurrency(inputValue);

        // Update internal state if uncontrolled
        if (!isControlled) {
          setInternalValue(rawValue);
        }

        // Call onChange with raw numeric value
        onChange?.(rawValue, e);
      } else if (type === 'date') {
        // Apply date mask
        const masked = formatDateMask(inputValue);
        setDisplayValue(masked);

        // Parse to ISO format if complete
        const isoDate = parseDate(masked);

        // Update internal state if uncontrolled
        if (!isControlled) {
          setInternalValue(isoDate);
        }

        // Call onChange with ISO format
        onChange?.(isoDate, e);
      } else {
        // Update internal state if uncontrolled
        if (!isControlled) {
          setInternalValue(inputValue);
        }

        onChange?.(inputValue, e);
      }
    };

    // Handle date selection from picker
    const handleDateSelect = (isoDate: string) => {
      const displayDate = formatDateDisplay(isoDate);
      setDisplayValue(displayDate);

      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalValue(isoDate);
      }

      // Call onChange with ISO format
      const syntheticEvent = {
        target: { value: isoDate },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(isoDate, syntheticEvent);
    };

    // Toggle date picker and calculate position
    const handleToggleDatePicker = () => {
      if (!showDatePicker && inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setPickerPosition({
          top: rect.bottom + window.scrollY + 8, // 8px gap
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
      setShowDatePicker(!showDatePicker);
    };

    // Create input element structure
    const inputElement = (
      <>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block font-medium text-gray-700 dark:text-gray-300',
              labelSizes[size],
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
          </label>
        )}

        {/* Input container */}
        <div
          className={cn(
            'relative',
            fullWidth ? 'block w-full' : 'inline-block',
            type === 'date' && 'overflow-visible',
            // Margin classes when fullWidth=true
            fullWidth && margin && marginClasses.all[margin],
            fullWidth && !margin && marginVertical && marginClasses.vertical[marginVertical],
            fullWidth && !margin && marginHorizontal && marginClasses.horizontal[marginHorizontal],
            fullWidth && !margin && !marginVertical && marginTop && marginClasses.top[marginTop],
            fullWidth && !margin && !marginVertical && marginBottom && marginClasses.bottom[marginBottom],
            fullWidth && !margin && !marginHorizontal && marginLeft && marginClasses.left[marginLeft],
            fullWidth && !margin && !marginHorizontal && marginRight && marginClasses.right[marginRight]
          )}
          ref={type === 'date' ? datePickerRef : undefined}
        >
          {/* Left icon */}
          {leftIcon && (
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 flex items-center pointer-events-none',
                iconPosition[size].left,
                disabled ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'
              )}
            >
              {renderIcon(leftIcon, iconSizes[size])}
            </div>
          )}

          {/* Input field */}
          <input
            ref={inputRef}
            id={inputId}
            type={type === 'currency' || type === 'date' ? 'text' : type}
            value={type === 'currency' || type === 'date' ? displayValue : currentValue}
            onChange={handleChange}
            disabled={disabled}
            placeholder={type === 'date' ? 'DD/MM/AAAA' : props.placeholder}
            maxLength={type === 'date' ? 10 : undefined}
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
              inputSizes[size],
              stateClasses,
              leftIcon && iconPadding[size].left,
              (error || rightIcon || type === 'date') && iconPadding[size].right,
              disabled && 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900',
              className
            )}
            {...props}
          />

          {/* Right icon - Error icon, Calendar icon for date type, or custom rightIcon */}
          {(error || rightIcon || type === 'date') && (
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 flex items-center',
                iconPosition[size].right,
                disabled ? 'text-gray-400' : error ? 'text-red-500 dark:text-red-400 group/error' : 'text-gray-500 dark:text-gray-400',
                // Make calendar icon clickable for date type
                type === 'date' && !disabled && !error && 'cursor-pointer hover:text-ai-primary-600 dark:hover:text-ai-primary-400 transition-colors',
                error ? 'pointer-events-auto cursor-help' : (type !== 'date' || error) && 'pointer-events-none'
              )}
              onClick={() => {
                if (type === 'date' && !disabled && !error) {
                  handleToggleDatePicker();
                }
              }}
            >
              {error
                ? renderIcon(Icons.AlertCircle, iconSizes[size])
                : type === 'date'
                  ? renderIcon(Icons.Calendar, iconSizes[size])
                  : renderIcon(rightIcon!, iconSizes[size])
              }

              {/* Error tooltip - shown on hover over error icon */}
              {error && (
                <div className="absolute bottom-full -right-2 mb-2 opacity-0 invisible group-hover/error:opacity-100 group-hover/error:visible transition-all duration-200 pointer-events-none z-50">
                  <div className="bg-red-600 dark:bg-red-700 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                    {error}
                    {/* Arrow pointing down - centered */}
                    <div className="absolute top-full right-[calc(0.5rem+2px)] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-red-600 dark:border-t-red-700" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* DatePicker dropdown - rendered via Portal */}
          {type === 'date' && showDatePicker && !disabled && pickerPosition &&
            ReactDOM.createPortal(
              <DatePicker
                value={currentValue}
                onChange={handleDateSelect}
                onClose={() => setShowDatePicker(false)}
                size={size}
                position={pickerPosition}
              />,
              document.body
            )}
        </div>

        {/* Error message for screen readers only */}
        {error && (
          <p id={errorId} className="sr-only">
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && (
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
      </>
    );

    // If fullWidth is true, return element directly without wrapper
    if (fullWidth) {
      return inputElement;
    }

    // Wrap input in a div with flex alignment
    return (
      <div
        className={cn(
          'flex',
          alignClasses[align],
          margin && marginClasses.all[margin],
          !margin && marginVertical && marginClasses.vertical[marginVertical],
          !margin && marginHorizontal && marginClasses.horizontal[marginHorizontal],
          !margin && !marginVertical && marginTop && marginClasses.top[marginTop],
          !margin && !marginVertical && marginBottom && marginClasses.bottom[marginBottom],
          !margin && !marginHorizontal && marginLeft && marginClasses.left[marginLeft],
          !margin && !marginHorizontal && marginRight && marginClasses.right[marginRight]
        )}
      >
        {inputElement}
      </div>
    );
  }
);

Input.displayName = 'Input';
