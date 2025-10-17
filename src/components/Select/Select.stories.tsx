import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { Icons } from '../../icons';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected value (single mode) or comma-separated values (multiple mode)',
    },
    options: {
      control: 'object',
      description: 'Available options array',
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multiple selection mode',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search/filter functionality',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Search input placeholder text',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'neural'],
      description: 'Semantic variant of the select (defines purpose)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the select',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no selection',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the select',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    success: {
      control: 'boolean',
      description: 'Success state',
    },
    leftIcon: {
      control: 'select',
      options: Object.keys(Icons),
      description: 'Icon to display on the left side',
      mapping: Icons,
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width select',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when has value',
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height of dropdown in pixels',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Content alignment when not fullWidth',
    },
    marginTop: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'Margin top spacing',
    },
    marginBottom: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'Margin bottom spacing',
    },
    margin: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'Margin on all sides',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select an option',
    placeholder: 'Choose...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' },
      { value: '5', label: 'Option 5' },
    ],
  },
};
