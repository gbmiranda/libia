import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Icons, IconName } from '../../icons';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A professional button component with semantic variants. Each variant defines the purpose and meaning of the button in the application context.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'neural'],
      description: 'Semantic variant - defines the purpose/meaning of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the button full width',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Content alignment within button',
    },
    leftIcon: {
      control: 'select',
      options: Object.values(IconName),
      description: 'Icon to display before the button text',
    },
    rightIcon: {
      control: 'select',
      options: Object.values(IconName),
      description: 'Icon to display after the button text',
    },
    ripple: {
      control: 'boolean',
      description: 'Enable ripple effect on click',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Interactive Story
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    leftIcon: Icons.Sparkles,
    label: 'Customize Me!',
    ripple: true,
  },
};
