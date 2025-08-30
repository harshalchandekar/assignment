import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DataTable } from '../components/DataTable/DataTable';

interface SampleUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
  salary: number;
}

const sampleData: SampleUser[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    joinDate: '2024-01-15',
    salary: 75000
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'Active',
    joinDate: '2024-02-20',
    salary: 65000
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Moderator',
    status: 'Inactive',
    joinDate: '2023-12-10',
    salary: 70000
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'User',
    status: 'Active',
    joinDate: '2024-03-05',
    salary: 62000
  },
];

const basicColumns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name' as keyof SampleUser,
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email' as keyof SampleUser,
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role' as keyof SampleUser,
    sortable: true,
  },
];

const advancedColumns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name' as keyof SampleUser,
    sortable: true,
    width: '200px',
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email' as keyof SampleUser,
    sortable: true,
    width: '250px',
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role' as keyof SampleUser,
    sortable: true,
    render: (value: string) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        value === 'Admin' ? 'bg-purple-100 text-purple-800' :
        value === 'Moderator' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {value}
      </span>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status' as keyof SampleUser,
    sortable: true,
    render: (value: string) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          value === 'Active' ? 'bg-green-600' : 'bg-red-600'
        }`}></span>
        {value}
      </span>
    ),
  },
  {
    key: 'salary',
    title: 'Salary',
    dataIndex: 'salary' as keyof SampleUser,
    sortable: true,
    render: (value: number) => `$${value.toLocaleString()}`,
  },
  {
    key: 'joinDate',
    title: 'Join Date',
    dataIndex: 'joinDate' as keyof SampleUser,
    sortable: true,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A feature-rich data table with sorting, selection, and custom rendering capabilities.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    selectable: {
      control: 'boolean',
      description: 'Enable row selection',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to show when no data',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum table height (CSS value)',
    },
  },
  args: { 
    onRowSelect: fn(),
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic data table with sortable columns.',
      },
    },
  },
};

export const WithSelection: Story = {
  name: 'With Row Selection',
  args: {
    data: sampleData,
    columns: basicColumns,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Data table with row selection capabilities. Users can select individual rows or use "select all".',
      },
    },
  },
};

export const WithCustomRendering: Story = {
  name: 'Custom Cell Rendering',
  args: {
    data: sampleData,
    columns: advancedColumns,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Data table with custom cell rendering for badges, formatted currency, and dates.',
      },
    },
  },
};

export const Loading: Story = {
  name: 'Loading State',
  args: {
    data: sampleData,
    columns: basicColumns,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state with spinner animation.',
      },
    },
  },
};

export const Empty: Story = {
  name: 'Empty State',
  args: {
    data: [],
    columns: basicColumns,
    emptyMessage: 'No users found. Try adjusting your search criteria.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with custom message when no data is available.',
      },
    },
  },
};

export const LargeDataset: Story = {
  name: 'Large Dataset',
  args: {
    data: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'User', 'Moderator'][i % 3],
      status: (i % 4 === 0 ? 'Inactive' : 'Active') as 'Active' | 'Inactive',
      joinDate: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
      salary: 50000 + (i * 1000),
    })),
    columns: advancedColumns,
    selectable: true,
    maxHeight: '400px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with large dataset demonstrating scroll behavior and performance.',
      },
    },
  },
};
