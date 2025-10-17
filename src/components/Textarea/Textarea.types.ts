import { type SpacingScale, type ComponentSize, type Variant } from '../../tokens';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'onChange'> {
  /**
   * Textarea value
   */
  value?: string;

  /**
   * Change handler
   */
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Semantic variant of the textarea
   * @default 'primary'
   */
  variant?: Variant;

  /**
   * Size of the textarea
   * @default 'md'
   */
  size?: ComponentSize;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text displayed below the textarea
   */
  helperText?: string;

  /**
   * Error message (when present, textarea shows error state)
   */
  error?: string;

  /**
   * Success state
   */
  success?: boolean;

  /**
   * Full width textarea
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Required field indicator
   */
  required?: boolean;

  /**
   * Number of visible text lines
   * @default 4
   */
  rows?: number;

  /**
   * Show character count
   * @default false
   */
  showCount?: boolean;

  /**
   * Resize behavior
   * @default 'vertical'
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';

  /**
   * Auto-resize based on content
   * @default false
   */
  autoResize?: boolean;

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
