import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '../../context/ThemeContext';

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Theme toggle button that switches between light and dark modes. Uses IconButton with Sun/Moon icons and integrates with the theme context.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'neural'],
      description: 'Semantic variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the toggle button',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Shape of the button',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltip with theme name',
    },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Interactive Story
export const Default: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    shape: 'circle',
    showTooltip: true,
  },
};
