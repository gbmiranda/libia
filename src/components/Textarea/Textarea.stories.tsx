import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';
import { useState } from 'react';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Textarea value',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the textarea',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the textarea',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    success: {
      control: 'boolean',
      description: 'Success state',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'neural'],
      description: 'Semantic variant of the textarea',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the textarea',
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of visible text lines',
    },
    showCount: {
      control: 'boolean',
      description: 'Show character count',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior',
    },
    autoResize: {
      control: 'boolean',
      description: 'Auto-resize based on content',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator',
    },
    maxLength: {
      control: { type: 'number' },
      description: 'Maximum character length',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Textarea
        {...args}
        value={value}
        onChange={(val) => setValue(val)}
      />
    );
  },
  args: {
    label: 'Description',
    placeholder: 'Enter your description...',
    variant: 'primary',
    size: 'md',
    rows: 4,
    showCount: true,
    maxLength: 500,
    helperText: 'Provide a detailed description',
  },
};
