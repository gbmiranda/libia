import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Input value',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'neural'],
      description: 'Semantic variant of the input (defines purpose)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the input',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    success: {
      control: 'boolean',
      description: 'Success state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width input',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url', 'date', 'currency'],
      description: 'Input type',
    },
    locale: {
      control: 'select',
      options: ['pt-BR', 'en-US', 'en-GB', 'de-DE', 'es-ES', 'fr-FR', 'ja-JP'],
      description: 'Locale for formatting (auto-detects from browser if not provided). Determines currency symbol for currency type.',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Content alignment when not fullWidth',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};
