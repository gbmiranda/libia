import { useEffect, useState } from 'react';
import type { Theme } from '../tokens';

const STORAGE_KEY = 'libia-theme';

/**
 * Custom hook to manage theme state
 * Supports light, dark, and system preference
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Get saved theme from localStorage or default to 'system'
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return savedTheme || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;

    // Function to get the actual theme based on system preference
    const getResolvedTheme = (currentTheme: Theme): 'light' | 'dark' => {
      if (currentTheme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return currentTheme;
    };

    // Apply theme to HTML element
    const applyTheme = (currentTheme: Theme) => {
      const resolved = getResolvedTheme(currentTheme);
      setResolvedTheme(resolved);

      if (resolved === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    // Listen for system theme changes when theme is set to 'system'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setResolvedTheme(e.matches ? 'dark' : 'light');
        if (e.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    applyTheme(theme);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, [theme]);

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  // Toggle between light and dark (ignores system)
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
}
