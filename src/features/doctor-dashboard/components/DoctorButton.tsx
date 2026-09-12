import React from 'react';

/**
 * Doctor Button Component
 * Reused from user-side Button component with doctor theme colors applied
 *
 * Color adaptations:
 * - Primary: Dark Sapphire Blue (#0A0F3C) instead of rose
 * - Secondary: Medium Sky Blue (#2C5DA9) instead of periwinkle
 * - Accent: Soft Ice Blue (#C8DAF9)
 */

interface DoctorButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const DoctorButton: React.FC<DoctorButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-[#0A0F3C] text-white hover:bg-opacity-90 focus:ring-[#0A0F3C] shadow-sm',
    secondary: 'bg-[#2C5DA9] text-white hover:bg-opacity-90 focus:ring-[#2C5DA9] shadow-sm',
    outline: 'bg-transparent border-2 border-[#0A0F3C] text-[#0A0F3C] hover:bg-[#0A0F3C] hover:text-white focus:ring-[#0A0F3C]',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default DoctorButton;
