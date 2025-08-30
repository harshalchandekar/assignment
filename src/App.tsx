import React, { useState } from 'react';
import './App.css';
import { InputField } from './components/InputField/InputField';
import { DataTable } from './components/DataTable/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
  salary: number;
}

function App() {
  // Input field states
  const [searchValue, setSearchValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  
  // DataTable states
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for DataTable
  const users: User[] = [
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
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie.wilson@example.com',
      role: 'Admin',
      status: 'Active',
      joinDate: '2023-11-22',
      salary: 78000
    }
  ];

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.role.toLowerCase().includes(searchValue.toLowerCase())
  );

  // DataTable columns configuration
  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name' as keyof User,
      sortable: true,
      width: '200px'
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email' as keyof User,
      sortable: true,
      width: '250px'
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role' as keyof User,
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
      dataIndex: 'status' as keyof User,
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
      dataIndex: 'salary' as keyof User,
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      key: 'joinDate',
      title: 'Join Date',
      dataIndex: 'joinDate' as keyof User,
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailValid = emailValue === '' || validateEmail(emailValue);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React Components Assignment 
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with React,TypeScript, Tailwind CSS, and StoryBook.
          </p>
        </div>

        {/* InputField Showcase */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">InputField Component</h2>
          
          {/* Form Demo */}
          <div className="mb-8 px-18">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Interactive Form Demo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl ">
              <InputField
                label="Search Users"
                placeholder="Search by name, email, or role..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                showClearButton
                helperText={`${filteredUsers.length} user(s) found`}
              />
              
              <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                errorMessage={!isEmailValid ? 'Please enter a valid email address' : undefined}
                invalid={!isEmailValid}
                showClearButton
              />
              
              <InputField
                label="Password"
                type="password"
                placeholder="Enter password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                helperText="Password should be at least 8 characters"
              />
              
              <InputField
                label="Disabled Field"
                placeholder="This field is disabled"
                disabled
                value="Cannot edit this field"
                helperText="This field cannot be modified"
              />
            </div>
          </div>

          {/* Variant Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Variants */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Variants</h3>
              <div className="space-y-4">
                <InputField
                  label="Outlined"
                  placeholder="Outlined style"
                  variant="outlined"
                />
                <InputField
                  label="Filled"
                  placeholder="Filled style"
                  variant="filled"
                />
                <InputField
                  label="Ghost"
                  placeholder="Ghost style"
                  variant="ghost"
                />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Sizes</h3>
              <div className="space-y-4">
                <InputField
                  label="Small"
                  placeholder="Small input"
                  size="sm"
                />
                <InputField
                  label="Medium"
                  placeholder="Medium input"
                  size="md"
                />
                <InputField
                  label="Large"
                  placeholder="Large input"
                  size="lg"
                />
              </div>
            </div>

            {/* Special States */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">States</h3>
              <div className="space-y-4">
                <InputField
                  label="Normal State"
                  placeholder="Normal input"
                  helperText="Everything looks good"
                />
                <InputField
                  label="Error State"
                  placeholder="Invalid input"
                  errorMessage="This field has an error"
                  invalid
                />
                <InputField
                  label="Loading State"
                  placeholder="Processing..."
                  disabled
                  helperText="Processing your request..."
                />
              </div>
            </div>
          </div>
        </section>

        {/* DataTable Showcase */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">DataTable Component</h2>
            <p>Click on the columns for ascending and descending it.</p>
            <button
              onClick={handleLoadingDemo}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Loading...' : 'Demo Loading State'}
            </button>
          </div>

          <DataTable
            data={filteredUsers}
            columns={columns}
            loading={isLoading}
            selectable
            onRowSelect={setSelectedUsers}
            emptyMessage={searchValue ? `No users found for "${searchValue}"` : 'No users available'}
            maxHeight="400px"
          />

          {/* Selected Users Display */}
          {selectedUsers.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-3">
                Selected Users ({selectedUsers.length}):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedUsers.map(user => (
                  <div key={user.id} className="bg-white p-3 rounded-md border border-blue-200">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                    <div className="text-xs text-blue-600 mt-1">{user.role}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Component Stats */}
        <section className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Component Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">{users.length}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-green-600">{filteredUsers.length}</div>
              <div className="text-sm text-gray-600">Filtered Results</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-purple-600">{selectedUsers.length}</div>
              <div className="text-sm text-gray-600">Selected Users</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-orange-600">
                {searchValue.length > 0 ? searchValue.length : 0}
              </div>
              <div className="text-sm text-gray-600">Search Characters</div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
       

       
      </div>
    </div>
  );
}

export default App;