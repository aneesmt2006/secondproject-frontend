import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import usePasswordToggler from '@/hooks/usePasswordToggler';

/**
 * Doctor Input Component
 * Reused from user-side Input component with doctor theme colors applied
 *
 * Color adaptations:
 * - Focus ring: Medium Sky Blue (#2C5DA9) instead of periwinkle
 * - Border: Soft Ice Blue (#C8DAF9) instead of lilac
 * - Text: Dark Sapphire Blue (#0A0F3C) instead of cocoa
 * - Error: Red for medical urgency instead of wine
 */

interface DoctorInputProps {
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

const DoctorInput: React.FC<DoctorInputProps> = ({
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
  const { showPassword, visiblePassword } = usePasswordToggler();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-[#0A0F3C]">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C5DA9]">
            {icon}
          </div>
        )}
        <input
          type={showPassword ? 'text' : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-3 rounded-lg border-2
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500' : 'border-[#C8DAF9]'}
            bg-white text-[#0A0F3C] placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#2C5DA9] focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-all duration-200
          `}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={visiblePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2C5DA9] hover:text-[#0A0F3C]"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default DoctorInput;
