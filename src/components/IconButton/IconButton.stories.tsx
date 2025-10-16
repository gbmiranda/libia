import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Icons, IconName } from '../../icons';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon-only button component, perfect for toolbars, FABs, and compact actions. Maintains the same semantic variants as the Button component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'neural'],
      description: 'Semantic variant (defines purpose)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the icon button',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Shape of the button',
    },
    icon: {
      control: 'select',
      options: Object.values(IconName),
      description: 'Icon to display',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    ripple: {
      control: 'boolean',
      description: 'Enable ripple effect on click',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Interactive Story
export const Default: Story = {
  args: {
    icon: Icons.Heart,
    ariaLabel: 'Like',
    variant: 'primary',
    size: 'md',
    shape: 'circle',
    loading: false,
    disabled: false,
    ripple: true,
    tooltip: 'Click to like',
  },
};
