import React from 'react';

/**
 * Doctor Card Component
 * Reused from user-side Card component with consistent styling
 * Maintains professional appearance for doctor portal
 */

interface DoctorCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  hover = false,
  onClick,
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  const hoverStyles = hover ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl transition-all duration-200
        ${paddingStyles[padding]}
        ${shadowStyles[shadow]}
        ${hoverStyles}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default DoctorCard;
