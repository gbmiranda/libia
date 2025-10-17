/**
 * Icon System
 *
 * Enum-based icon management with automatic sizing based on component context.
 * Icons are accessed via the `Icons` enum (e.g., Icons.Heart, Icons.Sparkles).
 *
 * The icon size is automatically determined by the parent component (Button, IconButton, etc.)
 * through React Context, ensuring consistency across the design system.
 *
 * @example
 * ```tsx
 * import { Icons } from './icons';
 *
 * <Button leftIcon={Icons.Sparkles} label="Click me" />
 * ```
 */

import React, { createContext, useContext } from 'react';
import * as LucideIcons from 'lucide-react';

// Context for icon size (in pixels)
const IconSizeContext = createContext<number>(20); // default 20px (md)

/**
 * Provider for icon size context
 * Used internally by components to control icon sizes
 */
export const IconSizeProvider = IconSizeContext.Provider;

/**
 * Hook to access the current icon size from context
 */
export const useIconSize = () => useContext(IconSizeContext);

/**
 * Icon Names - All available icons in the system
 * Use this to specify which icon to display in components
 */
export const IconName = {
  // Common action icons
  Heart: 'Heart',
  Star: 'Star',
  Plus: 'Plus',
  X: 'X',
  Check: 'Check',
  Minus: 'Minus',
  Send: 'Send',
  Download: 'Download',
  Settings: 'Settings',

  // Arrow icons
  ArrowRight: 'ArrowRight',
  ArrowLeft: 'ArrowLeft',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ChevronDown: 'ChevronDown',
  ChevronUp: 'ChevronUp',

  // Navigation icons
  Play: 'Play',
  Pause: 'Pause',

  // AI/Tech icons
  Sparkles: 'Sparkles',
  Brain: 'Brain',
  Cpu: 'Cpu',
  Zap: 'Zap',
  Rocket: 'Rocket',

  // Destructive actions
  Trash2: 'Trash2',
  Trash: 'Trash',

  // Theme icons
  Sun: 'Sun',
  Moon: 'Moon',

  // Loading
  Loader2: 'Loader2',
  Loader: 'Loader',

  // Input-specific icons
  Eye: 'Eye',
  EyeOff: 'EyeOff',
  Search: 'Search',
  Mail: 'Mail',
  Lock: 'Lock',
  User: 'User',
  AlertCircle: 'AlertCircle',
  DollarSign: 'DollarSign',
  Calendar: 'Calendar',
} as const;

/**
 * IconName type - Union of all icon name values
 */
export type IconName = (typeof IconName)[keyof typeof IconName];

/**
 * Icons namespace - Alias for IconName constant
 * Provides cleaner API: Icons.Heart instead of IconName.Heart
 */
export const Icons = IconName;

/**
 * Internal mapping: IconName → Lucide React component
 */
const iconComponentMap: Record<IconName, React.ComponentType<any>> = {
  // Common action icons
  Heart: LucideIcons.Heart,
  Star: LucideIcons.Star,
  Plus: LucideIcons.Plus,
  X: LucideIcons.X,
  Check: LucideIcons.Check,
  Minus: LucideIcons.Minus,
  Send: LucideIcons.Send,
  Download: LucideIcons.Download,
  Settings: LucideIcons.Settings,

  // Arrow icons
  ArrowRight: LucideIcons.ArrowRight,
  ArrowLeft: LucideIcons.ArrowLeft,
  ArrowUp: LucideIcons.ArrowUp,
  ArrowDown: LucideIcons.ArrowDown,
  ChevronDown: LucideIcons.ChevronDown,
  ChevronUp: LucideIcons.ChevronUp,

  // Navigation icons
  Play: LucideIcons.Play,
  Pause: LucideIcons.Pause,

  // AI/Tech icons
  Sparkles: LucideIcons.Sparkles,
  Brain: LucideIcons.Brain,
  Cpu: LucideIcons.Cpu,
  Zap: LucideIcons.Zap,
  Rocket: LucideIcons.Rocket,

  // Destructive actions
  Trash2: LucideIcons.Trash2,
  Trash: LucideIcons.Trash,

  // Theme icons
  Sun: LucideIcons.Sun,
  Moon: LucideIcons.Moon,

  // Loading
  Loader2: LucideIcons.Loader2,
  Loader: LucideIcons.Loader,

  // Input-specific icons
  Eye: LucideIcons.Eye,
  EyeOff: LucideIcons.EyeOff,
  Search: LucideIcons.Search,
  Mail: LucideIcons.Mail,
  Lock: LucideIcons.Lock,
  User: LucideIcons.User,
  AlertCircle: LucideIcons.AlertCircle,
  DollarSign: LucideIcons.DollarSign,
  Calendar: LucideIcons.Calendar,
};

/**
 * Render an icon with specified size
 * Used internally by components to convert IconName enum to React component
 *
 * @param iconName - The icon to render (from Icons enum)
 * @param size - The size of the icon in pixels
 * @param className - Optional CSS classes to apply to the icon
 * @returns React element with the icon
 */
export function renderIcon(iconName: IconName, size: number, className?: string): React.ReactElement {
  const IconComponent = iconComponentMap[iconName];
  return <IconComponent size={size} className={className} />;
}
