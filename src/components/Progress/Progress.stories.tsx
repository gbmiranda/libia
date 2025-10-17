import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0-100)',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value for progress calculation',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the progress bar',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the progress bar',
    },
    showValue: {
      control: 'boolean',
      description: 'Show percentage value',
    },
    valuePosition: {
      control: 'select',
      options: ['top', 'inside'],
      description: 'Position of the percentage value',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'neural'],
      description: 'Semantic variant of the progress bar',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the progress bar',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animated progress bar',
    },
    striped: {
      control: 'boolean',
      description: 'Enable striped pattern',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (loading without specific progress)',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width progress bar',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Progress',
    value: 60,
    variant: 'primary',
    size: 'md',
    showValue: true,
    helperText: 'Loading...',
  },
};
