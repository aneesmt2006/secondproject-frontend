import React from 'react';

/**
 * Input Component
 *
 * Props:
 * - label: string - Input label text
 * - type: string - Input type (text, email, password, tel, date, etc.)
 * - placeholder: string - Placeholder text
 * - value: string - Input value
 * - onChange: (e: React.ChangeEvent<HTMLInputElement>) => void - Change handler
 * - error: string - Error message to display
 * - required: boolean - Whether field is required
 * - disabled: boolean - Disabled state
 * - className: string - Additional CSS classes
 * - icon: React.ReactNode - Optional icon to display
 */

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  icon,
  name,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-cocoa">
          {label}
          {required && <span className="text-wine ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-lavender">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-3 rounded-lg border-2
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-wine' : 'border-lilac'}
            bg-white text-cocoa placeholder-lavender
            focus:outline-none focus:ring-2 focus:ring-periwinkle focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-all duration-200
          `}
        />
      </div>
      {error && (
        <p className="text-sm text-wine flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
