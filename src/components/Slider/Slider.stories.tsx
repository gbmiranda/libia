import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { useState } from 'react';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current value (single) or [min, max] for range',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
    },
    step: {
      control: { type: 'number' },
      description: 'Step increment',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the slider',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the slider',
    },
    showValue: {
      control: 'boolean',
      description: 'Show current value',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltip on hover/drag',
    },
    marks: {
      control: 'boolean',
      description: 'Show marks on the slider',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'neural'],
      description: 'Semantic variant of the slider',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the slider',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width slider',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(50);
    return (
      <Slider
        {...args}
        value={value}
        onChange={(val) => setValue(val as number)}
      />
    );
  },
  args: {
    label: 'Volume',
    variant: 'primary',
    size: 'md',
    showValue: true,
    helperText: 'Adjust the volume level',
  },
};
