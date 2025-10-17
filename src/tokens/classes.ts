/**
 * Design Tokens - CSS Classes
 *
 * Utilities for generating Tailwind CSS classes based on design tokens.
 * These ensure consistent styling across all components.
 */

import { type SpacingScale, type Align, spacingValues } from './spacing';

/**
 * Factory function to create margin classes for a given prefix
 * @param prefix - CSS class prefix (e.g., 'mt', 'mb', 'm', 'mx', 'my')
 * @returns Object mapping spacing scale to Tailwind classes
 */
export const createMarginClasses = (prefix: string): Record<SpacingScale, string> => {
  return Object.entries(spacingValues).reduce((acc, [key, value]) => {
    acc[key as SpacingScale] = `${prefix}-${value}`;
    return acc;
  }, {} as Record<SpacingScale, string>);
};

/**
 * Factory function to create padding classes for a given prefix
 * @param prefix - CSS class prefix (e.g., 'pt', 'pb', 'p', 'px', 'py')
 * @returns Object mapping spacing scale to Tailwind classes
 */
export const createPaddingClasses = (prefix: string): Record<SpacingScale, string> => {
  return Object.entries(spacingValues).reduce((acc, [key, value]) => {
    acc[key as SpacingScale] = `${prefix}-${value}`;
    return acc;
  }, {} as Record<SpacingScale, string>);
};

/**
 * Pre-generated margin classes for all directions
 * Use these directly in components for type-safe class application
 */
export const marginClasses = {
  /** Margin top classes (mt-*) */
  top: createMarginClasses('mt'),
  /** Margin bottom classes (mb-*) */
  bottom: createMarginClasses('mb'),
  /** Margin left classes (ml-*) */
  left: createMarginClasses('ml'),
  /** Margin right classes (mr-*) */
  right: createMarginClasses('mr'),
  /** Margin all sides classes (m-*) */
  all: createMarginClasses('m'),
  /** Margin vertical classes (my-*) */
  vertical: createMarginClasses('my'),
  /** Margin horizontal classes (mx-*) */
  horizontal: createMarginClasses('mx'),
} as const;

/**
 * Pre-generated padding classes for all directions
 * Use these directly in components for type-safe class application
 */
export const paddingClasses = {
  /** Padding top classes (pt-*) */
  top: createPaddingClasses('pt'),
  /** Padding bottom classes (pb-*) */
  bottom: createPaddingClasses('pb'),
  /** Padding left classes (pl-*) */
  left: createPaddingClasses('pl'),
  /** Padding right classes (pr-*) */
  right: createPaddingClasses('pr'),
  /** Padding all sides classes (p-*) */
  all: createPaddingClasses('p'),
  /** Padding vertical classes (py-*) */
  vertical: createPaddingClasses('py'),
  /** Padding horizontal classes (px-*) */
  horizontal: createPaddingClasses('px'),
} as const;

/**
 * Alignment classes
 * Maps alignment values to Tailwind CSS classes
 * Controls only horizontal positioning (justify), not text alignment
 */
export const alignClasses: Record<Align, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
} as const;
