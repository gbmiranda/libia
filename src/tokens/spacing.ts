/**
 * Design Tokens - Spacing
 *
 * Defines the spacing scale used throughout the design system.
 * These tokens ensure consistency across all components.
 */

/**
 * Spacing scale type
 * Used for margins, paddings, and other spacing properties
 */
export type SpacingScale = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Component size scale type
 * Used for component sizing (buttons, inputs, etc.)
 */
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Alignment type
 */
export type Align = 'left' | 'center' | 'right';

/**
 * Variant type (semantic purpose)
 * Used to define the semantic meaning/purpose of component actions
 */
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'neural';

/**
 * Shape type
 * Used to define the shape/form of components
 */
export type Shape = 'circle' | 'square';

/**
 * Theme type
 * Used to define the color theme mode
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Spacing values mapped to Tailwind CSS spacing scale
 *
 * @example
 * none: 0       // 0px
 * xs:   1       // 0.25rem = 4px
 * sm:   2       // 0.5rem = 8px
 * md:   4       // 1rem = 16px
 * lg:   6       // 1.5rem = 24px
 * xl:   8       // 2rem = 32px
 * 2xl:  12      // 3rem = 48px
 */
export const spacingValues = {
  none: '0',
  xs: '1',
  sm: '2',
  md: '4',
  lg: '6',
  xl: '8',
  '2xl': '12',
} as const;

/**
 * Human-readable spacing values in pixels (at default 16px base)
 */
export const spacingInPixels = {
  none: '0px',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const;

/**
 * Icon sizes mapped to component sizes (in pixels)
 * Used to determine icon dimensions based on component size
 */
export const iconSizes: Record<ComponentSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
} as const;
