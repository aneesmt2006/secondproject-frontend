import React from 'react';

/**
 * Button Component
 *
 * Props:
 * - children: React.ReactNode - Button content
 * - variant: 'primary' | 'secondary' | 'outline' - Button style variant
 * - size: 'sm' | 'md' | 'lg' - Button size
 * - fullWidth: boolean - Whether button should take full width
 * - onClick: () => void - Click handler
 * - disabled: boolean - Disabled state
 * - type: 'button' | 'submit' | 'reset' - Button type
 * - className: string - Additional CSS classes
 */

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) => {
  // Base styles - consistent across all buttons
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variantStyles = {
    primary: 'bg-rose text-white hover:bg-opacity-90 focus:ring-rose shadow-sm',
    secondary: 'bg-periwinkle text-white hover:bg-opacity-90 focus:ring-periwinkle shadow-sm',
    outline: 'bg-transparent border-2 border-rose text-rose hover:bg-rose hover:text-white focus:ring-rose',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Width styles
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

export default Button;
