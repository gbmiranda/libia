import { type SpacingScale, type ComponentSize, type Variant } from '../../tokens';

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Current value (single value) or values (range with [min, max])
   */
  value?: number | [number, number];

  /**
   * Change handler - receives single number or tuple [min, max] for range
   */
  onChange?: (value: number | [number, number]) => void;

  /**
   * Minimum value
   * @default 0
   */
  min?: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Step increment
   * @default 1
   */
  step?: number;

  /**
   * Label text displayed above the slider
   */
  label?: string;

  /**
   * Helper text displayed below the slider
   */
  helperText?: string;

  /**
   * Show current value(s)
   * @default false
   */
  showValue?: boolean;

  /**
   * Show tooltip on hover/drag
   * @default true
   */
  showTooltip?: boolean;

  /**
   * Marks to display on the slider (values to show as ticks)
   */
  marks?: number[] | boolean;

  /**
   * Semantic variant of the slider
   * @default 'primary'
   */
  variant?: Variant;

  /**
   * Size of the slider (track height)
   * @default 'md'
   */
  size?: ComponentSize;

  /**
   * Full width slider
   * @default true
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
