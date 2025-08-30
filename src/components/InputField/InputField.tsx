import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email';
  showClearButton?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const hasError = invalid || !!errorMessage;

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Variant classes
  const getVariantClasses = () => {
    const baseClasses = 'w-full rounded-md transition-all duration-200 focus:outline-none focus:ring-2';
    
    if (disabled) {
      return `${baseClasses} bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200`;
    }

    if (hasError) {
      switch (variant) {
        case 'filled':
          return `${baseClasses} bg-red-50 border border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500`;
        case 'ghost':
          return `${baseClasses} bg-transparent border-b-2 border-red-300 focus:ring-red-500 focus:border-red-500 rounded-none`;
        default:
          return `${baseClasses} bg-white border border-red-300 focus:ring-red-500 focus:border-red-500`;
      }
    }

    switch (variant) {
      case 'filled':
        return `${baseClasses} bg-gray-50 border border-gray-200 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100`;
      case 'ghost':
        return `${baseClasses} bg-transparent border-b-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-none hover:border-gray-400`;
      default:
        return `${baseClasses} bg-white border border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400`;
    }
  };

  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          className={`font-medium text-gray-700 ${labelSizeClasses[size]} ${
            disabled ? 'text-gray-400' : hasError ? 'text-red-600' : ''
          }`}
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${getVariantClasses()} ${sizeClasses[size]} ${
            (isPassword || showClearButton) ? 'pr-12' : ''
          } ${(isPassword && showClearButton) ? 'pr-20' : ''}`}
          aria-invalid={hasError}
          aria-describedby={
            helperText || errorMessage 
              ? `${label?.replace(/\s+/g, '-').toLowerCase()}-description`
              : undefined
          }
        />

        {/* Right side icons */}
        {(showClearButton || isPassword) && (
          <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-3">
            {/* Clear button */}
            {showClearButton && value && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear input"
              >
                <X size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />
              </button>
            )}

            {/* Password toggle */}
            {isPassword && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={disabled}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />
                ) : (
                  <Eye size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />
                )}
              </button>
            )}
          </div>
        )}

        {/* Loading indicator */}
        {disabled && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
          </div>
        )}
      </div>

      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <p
          id={`${label?.replace(/\s+/g, '-').toLowerCase()}-description`}
          className={`text-xs ${
            hasError ? 'text-red-600' : 'text-gray-500'
          } ${disabled ? 'text-gray-400' : ''}`}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;