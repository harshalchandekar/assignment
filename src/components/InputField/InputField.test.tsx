import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputField from './InputField';

describe('InputField', () => {
  test('renders with label', () => {
    render(<InputField label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('handles input changes', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    
    render(<InputField onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'test');
    expect(handleChange).toHaveBeenCalled();
  });

  test('shows error message', () => {
    render(<InputField errorMessage="Error occurred" />);
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  test('disables input when disabled prop is true', () => {
    render(<InputField disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});