import type { Meta, StoryObj } from '@storybook/react';
import action from '@storybook/addon-actions';
import { InputField } from '../components/InputField/InputField';

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email'],
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text...',
    helperText: 'This is helper text',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email...',
    errorMessage: 'Please enter a valid email address',
    invalid: true,
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit this',
    disabled: true,
    value: 'Disabled value',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="Small" size="sm" placeholder="Small input" />
      <InputField label="Medium" size="md" placeholder="Medium input" />
      <InputField label="Large" size="lg" placeholder="Large input" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="Outlined" variant="outlined" placeholder="Outlined variant" />
      <InputField label="Filled" variant="filled" placeholder="Filled variant" />
      <InputField label="Ghost" variant="ghost" placeholder="Ghost variant" />
    </div>
  ),
};