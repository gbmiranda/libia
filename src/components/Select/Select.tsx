import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../lib/utils';
import { type SpacingScale, type ComponentSize, type Align, type Variant, marginClasses, alignClasses, iconSizes } from '../../tokens';
import { type IconName, Icons, renderIcon } from '../../icons';

export interface SelectOption {
  value: string;
  label: string;
  icon?: IconName;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Selected value (single) or values (multiple)
   */
  value?: string | string[];

  /**
   * Available options
   */
  options: SelectOption[];

  /**
   * Change handler
   */
  onChange?: (value: string | string[], event?: React.MouseEvent | React.KeyboardEvent) => void;

  /**
   * Enable multiple selection
   */
  multiple?: boolean;

  /**
   * Enable search/filter functionality
   */
  searchable?: boolean;

  /**
   * Search input placeholder
   */
  searchPlaceholder?: string;

  /**
   * Semantic variant of the select (defines purpose)
   */
  variant?: Variant;

  /**
   * Size of the select
   */
  size?: ComponentSize;

  /**
   * Label text
   */
  label?: string;

  /**
   * Placeholder text when no selection
   */
  placeholder?: string;

  /**
   * Helper text displayed below the select
   */
  helperText?: string;

  /**
   * Error message (when present, select shows error state)
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
   * Full width select
   */
  fullWidth?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Required field indicator
   */
  required?: boolean;

  /**
   * Show clear button when has value
   */
  clearable?: boolean;

  /**
   * Maximum height of dropdown in pixels
   */
  maxHeight?: number;

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

// SelectDropdown internal component (not exported)
interface SelectDropdownProps {
  options: SelectOption[];
  value: string | string[];
  multiple: boolean;
  searchable: boolean;
  searchPlaceholder: string;
  maxHeight: number;
  size: ComponentSize;
  position: { top: number; left: number; width: number };
  onChange: (value: string | string[]) => void;
  onClose: () => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  value,
  multiple,
  searchable,
  searchPlaceholder,
  maxHeight,
  size,
  position,
  onChange,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsListRef = useRef<HTMLDivElement>(null);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchable]);

  // Filter options based on search query
  const filteredOptions = searchQuery
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Check if option is selected
  const isSelected = (optionValue: string): boolean => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  // Handle option click
  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
      // Don't close dropdown in multiple mode
    } else {
      onChange(optionValue);
      onClose();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && focusedIndex >= 0 && filteredOptions[focusedIndex]) {
      e.preventDefault();
      const option = filteredOptions[focusedIndex];
      if (!option.disabled) {
        handleOptionClick(option.value);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll focused option into view
  useEffect(() => {
    if (optionsListRef.current) {
      const focusedElement = optionsListRef.current.children[searchable ? focusedIndex + 1 : focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex, searchable]);

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const optionPadding = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5',
    xl: 'px-6 py-3',
  };

  return (
    <div
      data-select-dropdown
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        minWidth: `${position.width}px`,
        willChange: 'transform',
        transition: 'none',
      }}
      className={cn(
        'z-[9999]',
        'bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700',
        'p-2',
        'overflow-hidden',
        sizeClasses[size]
      )}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={handleKeyDown}
    >
      {/* Search input */}
      {searchable && (
        <div className="mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {renderIcon(Icons.Search, iconSizes[size])}
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className={cn(
                'w-full pl-10 pr-3 py-2 rounded-lg',
                'bg-white dark:bg-slate-900',
                'border border-gray-300 dark:border-gray-600',
                'text-gray-900 dark:text-gray-100',
                'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                'focus:outline-none focus:ring-2 focus:ring-ai-primary-500 focus:border-ai-primary-500',
                sizeClasses[size]
              )}
            />
          </div>
        </div>
      )}

      {/* Options list */}
      <div
        ref={optionsListRef}
        className="overflow-y-auto"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        {filteredOptions.length === 0 ? (
          <div className={cn('text-center text-gray-500 dark:text-gray-400', optionPadding[size])}>
            Nenhuma opção encontrada
          </div>
        ) : (
          filteredOptions.map((option, index) => {
            const selected = isSelected(option.value);
            const focused = index === focusedIndex;

            return (
              <div
                key={option.value}
                onClick={() => !option.disabled && handleOptionClick(option.value)}
                className={cn(
                  'flex items-center gap-3 cursor-pointer transition-colors duration-150',
                  'rounded-lg',
                  optionPadding[size],
                  option.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : cn(
                        focused && 'bg-gray-50 dark:bg-slate-700/50',
                        selected
                          ? 'bg-ai-primary-50 dark:bg-ai-primary-900/30 text-ai-primary-700 dark:text-ai-primary-300 font-medium'
                          : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 text-gray-900 dark:text-white'
                      )
                )}
              >
                {/* Checkbox for multiple mode */}
                {multiple && (
                  <div
                    className={cn(
                      'flex items-center justify-center w-4 h-4 rounded border-2 transition-all',
                      selected
                        ? 'bg-ai-primary-600 border-ai-primary-600'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700'
                    )}
                  >
                    {selected && (
                      <div className="text-white">
                        {renderIcon(Icons.Check, 12)}
                      </div>
                    )}
                  </div>
                )}

                {/* Option icon */}
                {option.icon && (
                  <div className="flex-shrink-0">
                    {renderIcon(option.icon, iconSizes[size])}
                  </div>
                )}

                {/* Option label */}
                <span className="flex-1">{option.label}</span>

                {/* Check icon for single mode when selected */}
                {!multiple && selected && (
                  <div className="flex-shrink-0 text-ai-primary-600 dark:text-ai-primary-400">
                    {renderIcon(Icons.Check, iconSizes[size])}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// Input container variants - border and focus colors
const selectVariants = {
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

// Select sizes
const selectSizes = {
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

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      options = [],
      onChange,
      multiple = false,
      searchable = false,
      searchPlaceholder = 'Pesquisar...',
      variant = 'primary',
      size = 'md',
      label,
      placeholder = 'Selecione...',
      helperText,
      error,
      success = false,
      leftIcon,
      fullWidth = false,
      disabled = false,
      required = false,
      clearable = false,
      maxHeight = 300,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      margin,
      marginVertical,
      marginHorizontal,
      align = 'left',
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = `${selectId}-helper`;
    const errorId = `${selectId}-error`;

    // Merge refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(selectRef.current);
        } else {
          ref.current = selectRef.current;
        }
      }
    }, [ref]);

    // Close dropdown when clicking outside
    useEffect(() => {
      if (showDropdown) {
        const handleClickOutside = (event: MouseEvent) => {
          const target = event.target as Node;
          if (
            selectRef.current &&
            !selectRef.current.contains(target) &&
            !document.querySelector('[data-select-dropdown]')?.contains(target)
          ) {
            setShowDropdown(false);
            setDropdownPosition(null);
          }
        };

        setTimeout(() => {
          document.addEventListener('mousedown', handleClickOutside);
        }, 0);

        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [showDropdown]);

    // Calculate dropdown position
    const calculateDropdownPosition = () => {
      if (selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 8,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    // Update dropdown position on scroll/resize with smooth performance
    useEffect(() => {
      if (showDropdown) {
        let rafId: number | null = null;

        const handleScroll = (e: Event) => {
          // Don't update if scrolling inside the dropdown itself
          const target = e.target as Node;
          const dropdownElement = document.querySelector('[data-select-dropdown]');
          if (dropdownElement && dropdownElement.contains(target)) {
            return;
          }

          // Use requestAnimationFrame for smooth updates
          if (rafId) {
            cancelAnimationFrame(rafId);
          }

          rafId = requestAnimationFrame(() => {
            calculateDropdownPosition();
            rafId = null;
          });
        };

        const handleResize = () => {
          if (rafId) {
            cancelAnimationFrame(rafId);
          }

          rafId = requestAnimationFrame(() => {
            calculateDropdownPosition();
            rafId = null;
          });
        };

        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleResize);

        return () => {
          if (rafId) {
            cancelAnimationFrame(rafId);
          }
          window.removeEventListener('scroll', handleScroll, true);
          window.removeEventListener('resize', handleResize);
        };
      }
    }, [showDropdown]);

    // Toggle dropdown and calculate position
    const handleToggleDropdown = () => {
      if (!disabled) {
        if (!showDropdown) {
          calculateDropdownPosition();
        }
        setShowDropdown(!showDropdown);
      }
    };

    // Handle clear button
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled) {
        onChange?.(multiple ? [] : '', e);
      }
    };

    // Get display text
    const getDisplayText = (): string => {
      if (multiple) {
        const selectedValues = Array.isArray(value) ? value : [];
        if (selectedValues.length === 0) return placeholder;
        if (selectedValues.length === 1) {
          const option = options.find(opt => opt.value === selectedValues[0]);
          return option?.label || placeholder;
        }
        return `${selectedValues.length} itens selecionados`;
      } else {
        if (!value) return placeholder;
        const option = options.find(opt => opt.value === value);
        return option?.label || placeholder;
      }
    };

    // Check if has value
    const hasValue = multiple
      ? Array.isArray(value) && value.length > 0
      : Boolean(value);

    // Determine state classes
    const hasError = Boolean(error);
    const stateClasses = hasError
      ? 'border-red-500 dark:border-red-500 focus-within:border-red-500 focus-within:ring-red-500/30'
      : success
      ? 'border-green-500 dark:border-green-500 focus-within:border-green-500 focus-within:ring-green-500/30'
      : selectVariants[variant];

    // Create select element structure
    const selectElement = (
      <div className={cn('flex flex-col text-left', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
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

        {/* Select container */}
        <div
          className={cn(
            'relative',
            fullWidth ? 'block w-full' : 'inline-block',
            // Margin classes when fullWidth=true
            fullWidth && margin && marginClasses.all[margin],
            fullWidth && !margin && marginVertical && marginClasses.vertical[marginVertical],
            fullWidth && !margin && marginHorizontal && marginClasses.horizontal[marginHorizontal],
            fullWidth && !margin && !marginVertical && marginTop && marginClasses.top[marginTop],
            fullWidth && !margin && !marginVertical && marginBottom && marginClasses.bottom[marginBottom],
            fullWidth && !margin && !marginHorizontal && marginLeft && marginClasses.left[marginLeft],
            fullWidth && !margin && !marginHorizontal && marginRight && marginClasses.right[marginRight]
          )}
        >
          {/* Select input visual */}
          <div
            ref={selectRef}
            id={selectId}
            role="combobox"
            aria-expanded={showDropdown}
            aria-haspopup="listbox"
            aria-describedby={error ? errorId : helperText ? helperTextId : undefined}
            aria-invalid={hasError}
            aria-required={required}
            tabIndex={disabled ? -1 : 0}
            onClick={handleToggleDropdown}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggleDropdown();
              }
            }}
            className={cn(
              !fullWidth && 'min-w-[250px]',
              fullWidth && 'w-full',
              'border-2 transition-all duration-200',
              'bg-white dark:bg-slate-800',
              'text-gray-900 dark:text-gray-100',
              'focus:outline-none focus:ring-4',
              'cursor-pointer select-none',
              'flex items-center',
              selectSizes[size],
              stateClasses,
              leftIcon && iconPadding[size].left,
              iconPadding[size].right, // Always has right padding for chevron/clear
              disabled && 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900',
              !hasValue && 'text-gray-400 dark:text-gray-500',
              className
            )}
            {...props}
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

            {/* Display text */}
            <span className="flex-1 truncate">{getDisplayText()}</span>

            {/* Right icons: Clear button or Error icon or Chevron */}
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 flex items-center gap-1',
                iconPosition[size].right,
                disabled ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'
              )}
            >
              {/* Clear button */}
              {clearable && hasValue && !disabled && !error && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors p-0.5 rounded hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  {renderIcon(Icons.X, iconSizes[size])}
                </button>
              )}

              {/* Error icon */}
              {error ? (
                <div className="text-red-500 dark:text-red-400 group/error cursor-help">
                  {renderIcon(Icons.AlertCircle, iconSizes[size])}

                  {/* Error tooltip */}
                  <div className="absolute bottom-full -right-2 mb-2 opacity-0 invisible group-hover/error:opacity-100 group-hover/error:visible transition-all duration-200 pointer-events-none z-50">
                    <div className="bg-red-600 dark:bg-red-700 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                      {error}
                      <div className="absolute top-full right-[calc(0.5rem+2px)] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-red-600 dark:border-t-red-700" />
                    </div>
                  </div>
                </div>
              ) : (
                /* Chevron icon */
                <div className={cn('transition-transform duration-200', showDropdown && 'rotate-180')}>
                  {renderIcon(Icons.ChevronDown, iconSizes[size])}
                </div>
              )}
            </div>
          </div>

          {/* Dropdown - rendered via Portal */}
          {showDropdown && !disabled && dropdownPosition &&
            ReactDOM.createPortal(
              <SelectDropdown
                options={options}
                value={value || (multiple ? [] : '')}
                multiple={multiple}
                searchable={searchable}
                searchPlaceholder={searchPlaceholder}
                maxHeight={maxHeight}
                size={size}
                position={dropdownPosition}
                onChange={(newValue) => {
                  onChange?.(newValue);
                }}
                onClose={() => {
                  setShowDropdown(false);
                  setDropdownPosition(null);
                }}
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
      </div>
    );

    // If fullWidth is true, return element directly without wrapper
    if (fullWidth) {
      return selectElement;
    }

    // Wrap select in a div with flex alignment
    return (
      <div
        className={cn(
          'flex items-start',
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
        {selectElement}
      </div>
    );
  }
);

Select.displayName = 'Select';
