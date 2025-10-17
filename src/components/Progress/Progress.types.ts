import { type SpacingScale, type ComponentSize, type Variant } from '../../tokens';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current progress value (0-100)
   */
  value?: number;

  /**
   * Maximum value for progress calculation
   * @default 100
   */
  max?: number;

  /**
   * Label text displayed above the progress bar
   */
  label?: string;

  /**
   * Helper text displayed below the progress bar
   */
  helperText?: string;

  /**
   * Show percentage value
   * @default false
   */
  showValue?: boolean;

  /**
   * Position of the percentage value
   * - 'top': Next to the label (above progress bar)
   * - 'inside': Inside the progress bar
   * @default 'top'
   */
  valuePosition?: 'top' | 'inside';

  /**
   * Semantic variant of the progress bar
   * @default 'primary'
   */
  variant?: Variant;

  /**
   * Size of the progress bar
   * @default 'md'
   */
  size?: ComponentSize;

  /**
   * Enable animated progress bar
   * @default true
   */
  animated?: boolean;

  /**
   * Enable striped pattern
   * @default false
   */
  striped?: boolean;

  /**
   * Indeterminate state (loading without specific progress)
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Full width progress bar
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

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
