import React from 'react';
import { Icons } from '../../icons';
import { IconButton, type IconButtonProps } from '../IconButton';
import { useThemeContext } from '../../context/ThemeContext';

export interface ThemeToggleProps extends Omit<IconButtonProps, 'icon' | 'ariaLabel' | 'onClick'> {
  /**
   * Show tooltip with theme name
   */
  showTooltip?: boolean;
}

/**
 * ThemeToggle component
 * Button to toggle between light and dark themes
 */
export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  (
    {
      showTooltip = true,
      variant = 'ghost',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const { resolvedTheme, toggleTheme } = useThemeContext();

    const isDark = resolvedTheme === 'dark';
    const icon = isDark ? Icons.Sun : Icons.Moon;
    const ariaLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    const tooltip = showTooltip ? ariaLabel : undefined;

    return (
      <IconButton
        ref={ref}
        icon={icon}
        ariaLabel={ariaLabel}
        tooltip={tooltip}
        variant={variant}
        size={size}
        onClick={toggleTheme}
        {...props}
      />
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';
