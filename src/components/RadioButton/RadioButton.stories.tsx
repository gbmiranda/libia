import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';

const meta = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A professional radio button component with semantic variants. Each variant defines the purpose and meaning of the radio button in the application context. Radio buttons are used when only one option can be selected from a group.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'neural'],
      description: 'Semantic variant - defines the purpose/meaning of the radio button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the radio button',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state (controlled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the radio button',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label relative to radio button',
    },
    value: {
      control: 'text',
      description: 'Radio value (required)',
    },
    name: {
      control: 'text',
      description: 'Radio name (groups radios together)',
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Interactive Story
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Select this option',
    labelPosition: 'right',
    value: 'option1',
    name: 'demo',
  },
};
